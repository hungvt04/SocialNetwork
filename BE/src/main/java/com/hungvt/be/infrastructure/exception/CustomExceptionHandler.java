package com.hungvt.be.infrastructure.exception;

import com.hungvt.be.infrastructure.common.model.response.ResponseError;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Log4j2
@RequiredArgsConstructor
public class CustomExceptionHandler {

    private static final Logger logger = LogManager.getLogger(CustomExceptionHandler.class);
    private final MessageSource messageSource;

    private String getMessage(String key) {
        return messageSource.getMessage(
                key,
                null,
                "Defaul message",
                LocaleContextHolder.getLocale());
    }

    // Xử lý lỗi không tìm thấy url,...
    @ExceptionHandler({NoHandlerFoundException.class})
    public ResponseObject handleNoHandlerFoundException(NoHandlerFoundException ex) {

        String message = getMessage("NoHandleFoundException.message") + ex.getHttpMethod() + " " + ex.getRequestURL();
        String detailMessage = ex.getLocalizedMessage();
        int code = 404;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ NoHandlerFoundException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.NOT_FOUND);
    }

    private String getMessageFromHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException exception) {

        StringBuilder message = new StringBuilder();
        message.append(exception.getMessage()).append(" ").append(getMessage("HttpRequestMethodNotSupportedException.message"));

        for (HttpMethod method : Objects.requireNonNull(exception.getSupportedHttpMethods())) {
            message.append(" '").append(method).append("'");
        }
        return message.toString();
    }

    // Xử lý lỗi sử dụng sai phương thức khi call api
    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    public ResponseObject handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex) {

        String message = getMessageFromHttpRequestMethodNotSupportedException(ex);
        String detailMessage = ex.getLocalizedMessage();
        int code = 405;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ HttpRequestMethodNotSupportedException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    private String getMessageFromHttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException exception) {

        StringBuffer message = new StringBuffer();
        message.append(exception.getMessage()).append(" ").append(getMessage("HttpRequestMethodNotSupportedException.message"));

        for (MediaType type : exception.getSupportedMediaTypes()) {
            message.append(type).append(", ");
        }
        return message.substring(0, message.toString().length() - 2);
    }

    // Xử lý khi truyền sai định dạng request
    @ExceptionHandler({HttpMediaTypeNotSupportedException.class})
    public ResponseObject handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex) {

        String message = getMessageFromHttpMediaTypeNotSupportedException(ex);
        String detailMessage = ex.getLocalizedMessage();
        int code = 415;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ HttpMediaTypeNotSupportedException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    // Xử lý trả về lỗi khi kết hợp với @Valid và các annotation validate
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseObject handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

        String message = getMessage("MethodArgumentNotValidException.exception");
        String detailMessage = ex.getLocalizedMessage();
        Map<String, String> errors = new HashMap<String, String>();
        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            String fildName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fildName, errorMessage);
        }
        int code = 400;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ MethodArgumentNotValidException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, errors, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = RestException.class)
    public ResponseObject handleRestException(RestException exception) {
        String message = exception.getError();
        String detailMessage = exception.getError();
        int code = 500;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ RestException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseObject handleRuntimeException(RuntimeException exception) {

        String message = getMessage("RuntimeException.message");
        String detailMessage = exception.getLocalizedMessage();
        int code = 500;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ RuntimeException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseObject handleAccessDeniedException(AccessDeniedException exception) {

        String message = "Bạn không có quyền truy cập!!!";
        String detailMessage = exception.getLocalizedMessage();
        int code = 403;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        logger.error("❌ AccessDeniedException: {}", detailMessage);
        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
        return ResponseObject.ofException(response, HttpStatus.FORBIDDEN);
    }

//    @ExceptionHandler({Exception.class})
//    public ResponseObject handleAll(Exception exception) {
//
//        String message = getMessage("Exception.message");
//        String detailMessage = exception.getLocalizedMessage();
//        int code = 500;
//        String moreInformation = MappingUrl.URL_EXCEPTION + code;
//
//        logger.error("❌ Exception: {}", detailMessage);
//        ResponseError response = new ResponseError(message, detailMessage, null, code, moreInformation);
//        return ResponseObject.ofException(response, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

}