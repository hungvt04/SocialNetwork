import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Button,
  Input,
  List,
  Typography,
  Tooltip,
  Drawer,
} from 'antd';
import {
  CloseOutlined,
  MessageOutlined,
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
  UserOutlined,
  PictureOutlined,
  MessageFilled,
} from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

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
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: 'Xin chào! Bạn khỏe không?',
        datetime: 'Hôm qua, 10:30',
        type: 'received',
      },
      {
        author: 'Bạn',
        content: 'Tôi khỏe, cảm ơn bạn!',
        datetime: 'Hôm qua, 10:35',
        type: 'sent',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: message,
        datetime: 'Vừa xong',
        type: 'received',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: 'Xin chào! Bạn khỏe không?',
        datetime: 'Hôm qua, 10:30',
        type: 'received',
      },
      {
        author: 'Bạn',
        content: 'Tôi khỏe, cảm ơn bạn!',
        datetime: 'Hôm qua, 10:35',
        type: 'sent',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: message,
        datetime: 'Vừa xong',
        type: 'received',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: 'Xin chào! Bạn khỏe không?',
        datetime: 'Hôm qua, 10:30',
        type: 'received',
      },
      {
        author: 'Bạn',
        content: 'Tôi khỏe, cảm ơn bạn!',
        datetime: 'Hôm qua, 10:35',
        type: 'sent',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: message,
        datetime: 'Vừa xong',
        type: 'received',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: 'Xin chào! Bạn khỏe không?',
        datetime: 'Hôm qua, 10:30',
        type: 'received',
      },
      {
        author: 'Bạn',
        content: 'Tôi khỏe, cảm ơn bạn!',
        datetime: 'Hôm qua, 10:35',
        type: 'sent',
      },
      {
        author: name,
        avatar: (
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
        ),
        content: message,
        datetime: 'Vừa xong',
        type: 'received',
      },
    ],
  };
};

const itemsMessage = [
  getItemMessage('0', <UserOutlined />, 'Nguyễn Văn A', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('1', <UserOutlined />, 'Nguyễn Văn B', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('2', <UserOutlined />, 'Nguyễn Văn C', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('3', <UserOutlined />, 'Nguyễn Văn D', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('4', <UserOutlined />, 'Nguyễn Văn E', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('5', <UserOutlined />, 'Nguyễn Văn F', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('6', <UserOutlined />, 'Nguyễn Văn A', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('7', <UserOutlined />, 'Nguyễn Văn B', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('8', <UserOutlined />, 'Nguyễn Văn C', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('9', <UserOutlined />, 'Nguyễn Văn D', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('10', <UserOutlined />, 'Nguyễn Văn E', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('11', <UserOutlined />, 'Nguyễn Văn F', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('12', <UserOutlined />, 'Nguyễn Văn A', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('13', <UserOutlined />, 'Nguyễn Văn B', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('14', <UserOutlined />, 'Nguyễn Văn C', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('15', <UserOutlined />, 'Nguyễn Văn D', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('16', <UserOutlined />, 'Nguyễn Văn E', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('17', <UserOutlined />, 'Nguyễn Văn F', 'Đã gửi cho bạn một tin nhắn'),
];

const HeaderMessage = () => {
  const [open, setOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);

  const handleItemClick = (item) => {
    setOpen(false);
    setCurrentChat(item);
    setChatDrawerOpen(true);
    console.log('Clicked on notification:', item);
  };

  const renderItem = (item) => (
    <Flex
      key={item.key}
      align="center"
      style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}
    >
      <Avatar
        size={40}
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
          {item.name}
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
        {itemsMessage.map((item) => renderItem(item))}
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

    // Adding new message to chat history
    if (currentChat) {
      currentChat.chatHistory.push({
        author: 'Bạn',
        content: message,
        datetime: 'Vừa xong',
        type: 'sent',
      });

      // Reset input
      setMessage('');
    }
  };

  // Render chat messages
  const renderChatMessages = () => {
    if (!currentChat) return null;

    return (
      <List
        className="chat-message-list"
        itemLayout="horizontal"
        dataSource={currentChat.chatHistory}
        renderItem={(chatItem) => {
          const isSent = chatItem.type === 'sent';

          return (
            <List.Item
              style={{
                padding: '8px 16px',
                display: 'flex',
                justifyContent: isSent ? 'flex-end' : 'flex-start',
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
                {!isSent && (
                  <Flex align="center" gap={8} style={{ marginBottom: '4px' }}>
                    {chatItem.avatar}
                    <Text strong>{chatItem.author}</Text>
                  </Flex>
                )}
                <div
                  style={{
                    backgroundColor: isSent ? '#1890ff' : '#f0f0f0',
                    color: isSent ? 'white' : 'rgba(0, 0, 0, 0.85)',
                    padding: '8px 12px',
                    borderRadius: '18px',
                    marginBottom: '4px',
                  }}
                >
                  {chatItem.content}
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {chatItem.datetime}
                </Text>
              </div>
            </List.Item>
          );
        }}
        style={{
          height: '320px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      />
    );
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
      <Drawer
        title={
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Avatar
                size={36}
                icon={<UserOutlined />}
                style={{
                  marginRight: '12px',
                  backgroundColor: '#f0f0f0',
                  color: '#666',
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>{currentChat?.name}</div>
                <div style={{ fontSize: '12px', color: '#52c41a' }}>● Đang hoạt động</div>
              </div>
            </Flex>
            <Button type="text" icon={<CloseOutlined />} onClick={() => setChatDrawerOpen(false)} />
          </Flex>
        }
        placement="right"
        width={380}
        onClose={() => setChatDrawerOpen(false)}
        open={chatDrawerOpen}
        bodyStyle={{ padding: '12px 0', display: 'flex', flexDirection: 'column', height: '100%' }}
        headerStyle={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}
        footer={
          <Flex style={{ padding: '8px', borderTop: '1px solid #f0f0f0' }} vertical gap={8}>
            <Flex justify="space-between">
              <Flex gap={12}>
                <Button type="text" icon={<PictureOutlined />} />
                <Button type="text" icon={<PaperClipOutlined />} />
                <Button type="text" icon={<SmileOutlined />} />
              </Flex>
            </Flex>
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
                style={{ resize: 'none' }}
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
    </>
  );
};

export default HeaderMessage;
