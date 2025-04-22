import { Avatar, Badge, Dropdown, Flex, Space, Tooltip } from 'antd';
import React from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

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
  };
};

const itemsMessage = [
  getItemMessage('0', <UserOutlined />, 'Nguyễn Văn A', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('1', <UserOutlined />, 'Nguyễn Văn B', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('2', <UserOutlined />, 'Nguyễn Văn C', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('3', <UserOutlined />, 'Nguyễn Văn D', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('4', <UserOutlined />, 'Nguyễn Văn E', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('5', <UserOutlined />, 'Nguyễn Văn F', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('0', <UserOutlined />, 'Nguyễn Văn A', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('1', <UserOutlined />, 'Nguyễn Văn B', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('2', <UserOutlined />, 'Nguyễn Văn C', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('3', <UserOutlined />, 'Nguyễn Văn D', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('4', <UserOutlined />, 'Nguyễn Văn E', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('5', <UserOutlined />, 'Nguyễn Văn F', 'Đã gửi cho bạn một tin nhắn'),
];

const HeaderNotification = () => {
  // Custom notification item render function
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
      />
      <div style={{ textAlign: 'left', overflow: 'hidden', width: '100%' }}>
        <p style={{ margin: 0, fontWeight: 'bold', cursor: 'pointer' }}>{item.name}</p>
        <p
          style={{
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          }}
        >
          {item.message}
        </p>
      </div>
    </Flex>
  );

  // Custom dropdown content
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
        Thông báo của bạn
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {itemsMessage.map((item) => renderItem(item))}
      </div>
      <div style={{ padding: '10px 0', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
        <a href="#" style={{ color: '#1890ff' }}>
          Xem tất cả thông báo
        </a>
      </div>
    </div>
  );

  return (
    <Dropdown overlay={dropdownContent} trigger={['click']} placement="bottom">
      <a onClick={(e) => e.preventDefault()}>
        <Tooltip placement="bottom" title="Thông báo">
          <Badge count="9+">
            <Avatar size={40} icon={<BellOutlined />} style={styleAvatar} />
          </Badge>
        </Tooltip>
      </a>
    </Dropdown>
  );
};

export default HeaderNotification;
