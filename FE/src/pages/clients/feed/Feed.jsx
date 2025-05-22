import Article from './Article';
import axiosInstance from '@/api/axiosInstance';
import { API_MANAGEMENT_ARTICLE, LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/pages/clients/common/loading/Loading';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Button } from 'antd';

const Feed = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  const connectWs = () => {
    const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    console.log('🔑 Token:', token ? 'Found' : 'Not found');

    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
      debug: (str) => console.log('[stompjs]', str),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        subscriptionRef.current = stompClient.subscribe('/topic/notification', (message) => {
          console.log('📩 Received message:', message);
          // try {
          //   const body = JSON.parse(message.body);
          //   console.log('📩 Received:', body);
          //   setMessages((prev) => [...prev, body]);
          // } catch (e) {
          //   console.error('❌ Failed to parse message:', message.body);
          // }
        });
      },
      // onStompError: (frame) => {
      //   console.error('❌ STOMP error:', frame);
      // },
      // onWebSocketError: (error) => {
      //   console.error('❌ WebSocket error:', error);
      // },
      // onWebSocketClose: (event) => {
      //   console.error('❌ WebSocket closed:', event);
      //   console.error('❌: ', event.reason);
      // },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
  };

  // useEffect(() => {
  //   connectWs();
  // }, []);

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
        onClick={connectWs}
        style={{ textAlign: 'center', margin: '0 auto', display: 'block' }}
      >
        CONNECT
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
