import Article from './Article';
import axiosInstance from '@/service/api/axiosInstance';
import { API_MANAGEMENT_ARTICLE, LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/pages/clients/common/loading/Loading';
import { Button } from 'antd';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { parseJwt } from '@/utils/Helper';

const Feed = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  const connectWs = () => {
    const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => console.log('[stompjs]', str),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        const payload = parseJwt(token);
        console.log('📜 Payload:', payload);

        subscriptionRef.current = stompClient.subscribe(
          '/topic/notification/' + payload?.id,
          (message) => {
            console.log('📩 Received message:', message?.body);
            alert(message?.body);
          },
        );
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);

        // Lấy thông tin lỗi chi tiết
        const errorCode = frame.headers['error-code'] || 'UNKNOWN_ERROR';
        const errorMessage = frame.headers?.message || frame.body || 'Unknown error';

        // Hiển thị thông báo phù hợp
        if (errorCode === 'USER_NOT_PERMISSION') {
          alert(`Bạn không có quyền truy cập: ${errorMessage}`);
          // Hủy subscription tương ứng
          const destination = frame.headers.destination;
          if (destination && this.subscriptions[destination]) {
            this.subscriptions[destination].unsubscribe();
            delete this.subscriptions[destination];
          }
        } else {
          alert(`Lỗi kết nối: ${errorMessage}`);
        }

        // Log đầy đủ thông tin lỗi
        console.error('Error details:', {
          code: errorCode,
          message: errorMessage,
          headers: frame.headers,
          body: frame.body,
        });
      },
    });
    stompClient.onWebSocketError = function (event) {
      console.error('WebSocket Error', event);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;
  };

  useEffect(() => {
    connectWs();

    fetchData();
  }, []);

  const sendNotification = () => {
    const client = stompClientRef.current;

    if (client && client.connected) {
      client.publish({
        destination: '/app/notification',
        body: JSON.stringify({ content: 'Hello from client' }),
      });
      console.log('📤 Sent message to /app/notification');
    } else {
      console.warn('⚠️ STOMP client is not connected yet!');
    }
  };

  const sendMessage = () => {
    const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    const client = stompClientRef.current;

    if (client && client.connected) {
      client.publish({
        destination:
          '/app/chat-private/7d1d71ee-16b6-438b-825d-680c1d0fd7d6/7503409c-81c5-4d33-8d0d-6bcae6bfff24',
        body: JSON.stringify({
          receiverId: '7503409c-81c5-4d33-8d0d-6bcae6bfff24',
          content: 'Hello from client',
          timestamp: new Date().getTime(),
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('📤 Sent message to /app/chat/private ');
    } else {
      console.warn('⚠️ STOMP client is not connected yet!');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_MANAGEMENT_ARTICLE);

      setData([
        ...data,
        ...response?.data.map((item) => ({
          ...item,
          totalReact: 100,
          totalComment: 30,
          totalShare: 9,
        })),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={sendNotification}
        style={{ textAlign: 'center', margin: '0 auto', display: 'block' }}
      >
        SEND NOTIFICATION
      </Button>
      <Button
        onClick={sendMessage}
        style={{ textAlign: 'center', margin: '0 auto', display: 'block' }}
      >
        SEND MESSAGE
      </Button>
      {<Loading isLoading={isLoading} />}
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <Article
            key={item.articleId}
            articleId={item.articleId}
            authorName={item.authorName}
            createdAt={item.createdAt}
            content={item.content}
            urls={item?.urls?.split(/\s*,\s*/) || []}
            totalReact={item.totalReact}
            totalComment={item.totalComment}
            totalShare={item.totalShare}
            react={item.react}
          />
        ))}
    </>
  );
};

export default Feed;
