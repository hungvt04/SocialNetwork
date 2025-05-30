import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Dropdown, Flex, Tooltip } from 'antd';
import { UserOutlined, MessageFilled } from '@ant-design/icons';
import ChatDrawer from './ChatDrawer';
import { getFriends } from '@/service/client/friends';

const styleAvatar = {
  marginLeft: '15px',
  flexShrink: 0,
  alignSelf: 'center',
  cursor: 'pointer',
};

const getItemMessage = (key, icon, name, message) => {
  return {
    key,
    icon,
    name,
    message,
    chatHistory: [
      {
        author: name,
        content: 'Xin chào! Bạn khỏe không?',
        datetime: 1747117796390,
        type: 'received',
      },
      {
        author: 'Bạn',
        content: 'Tôi khỏe, cảm ơn bạn!',
        datetime: 1747117796390,
        type: 'sent',
      },
      {
        author: name,
        content: message,
        datetime: 1747117796390,
        type: 'received',
      },
      {
        author: name,
        content: message,
        datetime: 1747117796399,
        type: 'received',
      },
    ],
  };
};

const HeaderMessage = () => {
  const [open, setOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendSelected, setFriendSelected] = useState({});

  const fetchFriends = async () => {
    await getFriends({})
      .then((response) => {
        console.log('Fetched friends:', response);

        if (response.status === 'OK') {
          setFriends(response?.data?.data);
        } else {
          console.error('Failed to fetch friends:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching friends:', error);
      });
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleItemClick = (item) => {
    setOpen(false);
    setFriendSelected(item);
    // setCurrentChat(item);
    setChatDrawerOpen(true);
  };

  const renderItem = (item) => (
    <Flex
      key={item.userId}
      align="center"
      style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}
    >
      <Avatar
        size={40}
        src={item.avatar || 'https://joeschmoe.io/api/v1/random'}
        icon={<UserOutlined />}
        style={{
          marginRight: '10px',
          flexShrink: 0,
          backgroundColor: '#f0f0f0',
          color: '#666',
          cursor: 'pointer',
        }}
        onClick={() => handleItemClick(item)}
      />
      <div style={{ textAlign: 'left', overflow: 'hidden', width: '100%' }}>
        <p
          style={{ margin: 0, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => handleItemClick(item)}
        >
          {item.fullName || 'Người dùng'}
        </p>
        <p
          style={{
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          }}
          onClick={() => handleItemClick(item)}
        >
          {item.message}
        </p>
      </div>
    </Flex>
  );

  // Custom dropdown content instead of using menu
  const dropdownContent = (
    <div
      style={{
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        width: '320px',
        marginRight: '10px',
      }}
    >
      <div
        style={{
          padding: '10px 0',
          borderBottom: '1px solid #f0f0f0',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Tin nhắn của bạn
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {friends.map((item) => renderItem(item))}
      </div>
      <div style={{ padding: '10px 0', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
        <a href="#" style={{ color: '#1890ff' }}>
          Xem tất cả tin nhắn
        </a>
      </div>
    </div>
  );

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim() === '') return;

    if (currentChat) {
      currentChat.chatHistory.push({
        author: 'Bạn',
        content: message,
        datetime: new Date().getTime(),
        type: 'sent',
      });

      // Reset input
      setMessage('');
    }
  };

  return (
    <>
      <Dropdown
        overlay={dropdownContent}
        trigger={['click']}
        placement="bottom"
        open={open}
        onOpenChange={setOpen}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Tooltip placement="bottom" title="Tin nhắn">
            <Badge count="9+">
              <Avatar
                size={40}
                icon={<MessageFilled style={{ color: 'black' }} />}
                style={styleAvatar}
              />
            </Badge>
          </Tooltip>
        </a>
      </Dropdown>

      <ChatDrawer
        open={chatDrawerOpen}
        onClose={() => setChatDrawerOpen(false)}
        friendSelected={friendSelected}
        chat={currentChat}
        message={message}
        setMessage={setMessage}
        onSend={handleSendMessage}
      />
    </>
  );
};

export default HeaderMessage;
