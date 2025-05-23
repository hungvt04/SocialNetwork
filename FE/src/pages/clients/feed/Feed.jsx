import Article from './Article';
import axiosInstance from '@/api/axiosInstance';
import { API_MANAGEMENT_ARTICLE, LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/pages/clients/common/loading/Loading';
import { Button } from 'antd';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Feed = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  const connectWs = () => {
    const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    console.log('🔑 Token:', token ? 'Found' : 'Not found');
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => console.log('[stompjs]', str),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        // subscriptionRef.current = stompClient.subscribe('/topic/notification', (message) => {
        //   console.log('📩 Received message:', message?.body);
        //   setMessage(message?.body);
        // });

        subscriptionRef.current = stompClient.subscribe('/topic/messages', (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('Nhận tin nhắn 1-1:', receivedMessage);
          // Xử lý tin nhắn ở đây
        });
      },
    });
    stompClient.activate();
    stompClientRef.current = stompClient;
  };

  useEffect(() => {
    connectWs();
  }, []);

  useEffect(() => {
    if (message && message.length > 0) {
      console.log('📩 Received message:', message);
      alert(message);
      setMessage('');
    }
  }, [message]);

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
    const client = stompClientRef.current;

    if (client && client.connected) {
      client.publish({
        destination: '/app/chat/private/939d22c0-0661-4f8f-b1a3-b91663fa8d00',
        body: JSON.stringify({
          receiverId: '939d22c0-0661-4f8f-b1a3-b91663fa8d00',
          content: 'Hello from client',
          timestamp: new Date().getTime(),
        }),
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

  useEffect(() => {
    fetchData();
  }, []);

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
