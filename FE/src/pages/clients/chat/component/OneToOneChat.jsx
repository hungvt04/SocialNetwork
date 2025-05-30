import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar, Typography, Card } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const OneToOneChat = ({ currentUser, recipientUser, initialMessages = [], onSendMessage }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser,
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    onSendMessage?.(newMessage);
    setInputValue('');
  };

  return (
    <Card
      title={`Chat with ${recipientUser.name}`}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              key={message.id}
              style={{
                justifyContent: message.sender.id === currentUser.id ? 'flex-end' : 'flex-start',
              }}
            >
              <Card
                style={{
                  background: message.sender.id === currentUser.id ? '#e6f7ff' : '#f5f5f5',
                  maxWidth: '70%',
                }}
              >
                <List.Item.Meta
                  avatar={
                    message.sender.id !== currentUser.id && (
                      <Avatar>{message.sender.name[0]}</Avatar>
                    )
                  }
                  title={<Text strong>{message.sender.name}</Text>}
                  description={
                    <>
                      <Text>{message.content}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Text>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: 'auto' }}>
        <TextArea
          rows={2}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
        />
        <Button type="primary" onClick={handleSend} block style={{ marginTop: 8 }}>
          Send
        </Button>
      </div>
    </Card>
  );
};

export default OneToOneChat;
