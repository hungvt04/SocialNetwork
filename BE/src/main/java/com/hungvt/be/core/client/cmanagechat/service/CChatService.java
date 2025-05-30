package com.hungvt.be.core.client.cmanagechat.service;

import com.hungvt.be.core.client.cmanagechat.model.request.CDeleteMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CGetMessageFriendsRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CPostMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CPutMessageRequest;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;

public interface CChatService {

    ResponseObject getMessageFriends(CGetMessageFriendsRequest request);

    ResponseObject postMessage(CPostMessageRequest request);

    ResponseObject putMessage(String messageId, CPutMessageRequest request);

    ResponseObject deleteMessage(String messageId, CDeleteMessageRequest request);

}
