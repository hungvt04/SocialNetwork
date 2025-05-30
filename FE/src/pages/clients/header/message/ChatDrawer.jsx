import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Drawer, Flex, List, Typography, Input } from 'antd';
import { CloseOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getMessageFriends, postMessage } from '@/service/client/message';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { parseJwt } from '@/utils/Helper';

const { Text } = Typography;
const { TextArea } = Input;
dayjs.extend(relativeTime);

const ChatDrawer = ({ open, onClose, friendSelected, chat, message, setMessage, onSend }) => {
  const messageListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const userIdFromToken = parseJwt(sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN))?.userId;

  const connectWs = (friendsId) => {
    const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    const stomp = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => console.log('[stompjs]', str),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('✅ Connected to WebSocket');

        stomp.subscribe('/topic/chat-private/' + friendsId, (message) => {
          // Xử lý nhận tin nhắn render ra giao diện
          const newMessage = JSON.parse(message.body);
          console.log('📩 Received message:', newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },
    });
    stomp.onWebSocketError = function (event) {
      console.error('WebSocket Error', event);
    };

    stomp.activate();
  };

  const fetchMessages = async () => {
    console.log({ friendSelected });
    console.log(friendSelected.friendsId);
    const param = {
      friendsId: friendSelected?.friendsId,
    };

    await getMessageFriends(param)
      .then((response) => {
        console.log('Fetched messages:', response);

        if (response.status === 'OK') {
          setMessages(response?.data?.data);
        } else {
          console.error('Failed to fetch messages:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  const sendMessage = async (messageContent) => {
    await postMessage({
      friendsId: friendSelected?.friendsId,
      content: messageContent,
    })
      .then((response) => {
        console.log('Fetched message: ', response);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching message: ', error);
      });
  };

  useEffect(() => {
    if (friendSelected?.friendsId) {
      fetchMessages();
      connectWs(friendSelected.friendsId);
    }
  }, [friendSelected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      setTimeout(() => {
        messageListRef.current.scrollTop =
          messageListRef.current.scrollHeight + messageListRef.current.clientHeight;
      }, 0);
    }
  };

  const handleSendMessage = () => {
    // onSend();
    sendMessage(message);
    scrollToBottom();
  };

  // const groupMessages = (messages) => {
  //   if (!messages || messages.length === 0) return [];

  //   const grouped = [];
  //   let currentGroup = [messages[0]];

  //   for (let i = 1; i < messages.length; i++) {
  //     const prevMessage = currentGroup[currentGroup.length - 1];
  //     const currentMessage = messages[i];

  //     // Tính khoảng cách thời gian (phút)
  //     const timeDiff = dayjs(currentMessage.datetime).diff(dayjs(prevMessage.datetime), 'minute');

  //     // Kiểm tra cùng người gửi và thời gian < 2 phút
  //     if (prevMessage.type === currentMessage.type && timeDiff < 2) {
  //       currentGroup.push(currentMessage);
  //     } else {
  //       grouped.push(currentGroup);
  //       currentGroup = [currentMessage];
  //     }
  //   }

  //   grouped.push(currentGroup);
  //   return grouped;
  // };

  const renderChatMessages = () => {
    if (!messages) return null;

    // const groupedMessages = groupMessages(messages);

    // {
    //   "content": "s",
    //   "fullName": "HUNG Vu Trong (VTI.D2)",
    //   "updatedAt": 1748599584531,
    //   "isDeleted": false,
    //   "createdAt": 1748599584531,
    //   "isRead": false,
    //   "senderId": "939d22c0-0661-4f8f-b1a3-b91663fa8d00",
    //   "senderAvatar": "https://lh3.googleusercontent.com/a/ACg8ocJPIWnwDhKMyLJBa6xCp-GkXdknax7y_Xj7-93BwJwai4jqVAVL=s96-c",
    //   "messageId": "5ffbef6c-e960-4352-bcdd-bc66c1d8d59d"
    // }

    return (
      <List
        ref={messageListRef}
        style={{
          height: '100vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          scrollbarWidth: 'none',
        }}
        className="chat-message-list"
        itemLayout="horizontal"
        // dataSource={groupedMessages}
        dataSource={messages}
        renderItem={(messageGroup) => {
          console.log(messageGroup);
          // const isSent = messageGroup[0].senderId === userIdFromToken;
          const isSent = true;
          const lastMessage = messageGroup[messageGroup.length - 1];

          return (
            <List.Item
              style={{
                padding: '8px 16px',
                display: 'flex',
                justifyContent: isSent ? 'flex-end' : 'flex-start',
                borderBottom: 'none',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isSent ? 'flex-end' : 'flex-start',
                }}
              >
                {messageGroup.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: isSent ? '#1890ff' : '#f0f0f0',
                      color: isSent ? 'white' : 'rgba(0, 0, 0, 0.85)',
                      padding: '8px 12px',
                      borderRadius: '18px',
                      marginBottom: index < messageGroup.length - 1 ? '4px' : 0,
                    }}
                  >
                    {message.content}
                  </div>
                ))}
                <Text type="secondary" style={{ fontSize: '12px', marginTop: 4 }}>
                  {dayjs(lastMessage.datetime).fromNow()}
                </Text>
              </div>
            </List.Item>
          );
        }}
      />
    );
  };

  return (
    <Drawer
      title={
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Avatar
              size={36}
              src={friendSelected?.avatar}
              icon={<UserOutlined />}
              style={{
                marginRight: '12px',
                backgroundColor: '#f0f0f0',
                color: '#666',
              }}
            />
            <div>
              <div style={{ fontWeight: 'bold' }}>{friendSelected?.fullName}</div>
            </div>
          </Flex>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </Flex>
      }
      placement="right"
      width={380}
      onClose={onClose}
      open={open}
      bodyStyle={{ padding: '12px 0', display: 'flex', flexDirection: 'column', height: '100%' }}
      headerStyle={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}
      footer={
        <Flex style={{ padding: '8px' }} vertical gap={8}>
          <Flex gap={8}>
            <TextArea
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoSize={{ minRows: 1, maxRows: 4 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              // style={{ resize: 'none !important', overflow: 'hidden !important' }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={message.trim() === ''}
            />
          </Flex>
        </Flex>
      }
    >
      {renderChatMessages()}
    </Drawer>
  );
};

export default ChatDrawer;
