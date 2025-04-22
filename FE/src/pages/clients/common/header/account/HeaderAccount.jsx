import { Avatar, Badge, Dropdown, Flex, Space, Tooltip } from 'antd';
import React from 'react';
import {
  BellOutlined,
  HomeOutlined,
  MessageOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

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
];

const parseItemToLabel = (item) => {
  return (
    <Flex align="center" align-items="center" style={{ width: '300px', marginRight: '10px' }}>
      <Space>
        <Avatar
          size={40}
          icon={item.icon}
          style={{
            marginRight: '10px',
            flexShrink: 0,
            alignSelf: 'center',
          }}
        />
      </Space>
      <div style={{ textAlign: 'left' }}>
        <p style={{ margin: 0 }}>{item.name}</p>
        <p style={{ margin: 0 }}>{item.message}</p>
      </div>
    </Flex>
  );
};

const items = itemsMessage.map((item) => {
  return {
    label: parseItemToLabel(item),
    key: item.key,
  };
});

const HeaderAccount = () => {
  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottom">
      <a onClick={(e) => e.preventDefault()}>
        <Tooltip placement="bottom" title="Tài khoản">
          <Badge count="9+">
            <Avatar size={40} icon={<UserOutlined />} style={styleAvatar} />
          </Badge>
        </Tooltip>
      </a>
    </Dropdown>
  );
};

export default HeaderAccount;
