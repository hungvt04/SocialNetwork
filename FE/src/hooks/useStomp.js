// // useStomp.ts (React version)
// import { useEffect, useRef, useState } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import dayjs from 'dayjs';
// import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';

// const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// export function useStomp({ url, topic }) {
//   const clientRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const subscriptionsRef = useRef([]);
//   const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

//   const isJsonString = (str) => {
//     try {
//       JSON.parse(str);
//     } catch (e) {
//       return false;
//     }
//     return true;
//   };

//   const connect = () => {
//     return new Promise((resolve, reject) => {
//       const client = new Client({
//         connectHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//         webSocketFactory: () => new SockJS(url),
//         debug: (str) => {
//           console.log(dayjs().format(DATE_FORMAT), str);
//         },
//         onWebSocketError: (event) => {
//           console.error('WebSocket error:', event);
//           reject(event);
//         },
//         onConnect: () => {
//           setIsConnected(true);
//           resolve();
//         },
//         onDisconnect: () => {
//           setIsConnected(false);
//         },
//         onStompError: (frame) => {
//           console.error('STOMP error:', frame);
//           reject(frame);
//         },
//       });

//       client.activate();
//       clientRef.current = client;
//     });
//   };

//   const subscribe = (destination, callback) => {
//     const client = clientRef.current;
//     if (!client || !isConnected) {
//       console.warn('Client is not connected or not initialized');
//       return;
//     }

//     const subscription = client.subscribe(destination, (message) => {
//       const parsed = isJsonString(message.body) ? JSON.parse(message.body) : message.body;

//       setMessages((prev) => [...prev, parsed]);
//       callback(parsed);
//     });

//     subscriptionsRef.current.push(subscription);
//   };

//   const sendMessage = (destination, body) => {
//     const client = clientRef.current;
//     if (client && isConnected) {
//       client.publish({
//         destination,
//         body: JSON.stringify(body),
//       });
//     } else {
//       console.warn('Client is not connected or not initialized');
//     }
//   };

//   const disconnect = () => {
//     const client = clientRef.current;
//     if (!client) return;

//     subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
//     subscriptionsRef.current = [];
//     client.deactivate();
//   };

//   useEffect(() => {
//     connect()
//       .then(() => {
//         subscribe(topic, (message) => {
//           // Bạn có thể xử lý message tại đây nếu cần
//         });
//       })
//       .catch((error) => {
//         console.error('Failed to connect:', error);
//       });

//     return () => {
//       disconnect();
//     };
//   }, [topic]);

//   return {
//     isConnected,
//     messages,
//     subscribe,
//     sendMessage,
//     disconnect,
//   };
// }
