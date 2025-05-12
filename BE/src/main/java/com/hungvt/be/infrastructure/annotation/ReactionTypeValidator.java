package com.hungvt.be.infrastructure.annotation;

import com.hungvt.be.infrastructure.constant.ReactionType;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ReactionTypeValidator implements ConstraintValidator<ValidReactionType, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && ReactionType.contains(value);
    }
}
