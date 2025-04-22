import React, { use, useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Dropdown,
  Flex,
  Input,
  Row,
  Space,
  Tooltip,
} from 'antd';
import {
  BellOutlined,
  HomeOutlined,
  MessageOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HeaderMessage from './message/HeaderMessage';
import HeaderNotification from './notification/HeaderNotification';
import HeaderAccount from './account/HeaderAccount';

const styleAvatar = {
  marginLeft: '15px',
  flexShrink: 0,
  alignSelf: 'center',
  cursor: 'pointer',
};

const getItem = (key, icon, tooltip) => {
  return {
    key,
    icon,
    tooltip,
  };
};

const getItemMessage = (key, icon, name, message) => {
  return {
    key,
    icon,
    name,
    message,
  };
};

const itemsCenter = [
  getItem('', <HomeOutlined />, 'Trang chủ'),
  getItem('friends', <UsergroupAddOutlined />, 'Bạn bè'),
  getItem('video', <VideoCameraOutlined />, 'Video'),
  getItem('marketplace', <ShopOutlined />, 'Marketplace'),
];

const itemsRight = [
  getItem('message', <MessageOutlined />, 'Tin nhắn'),
  getItem('notification', <BellOutlined />, 'Thông báo'),
  getItem('account', <UserOutlined />, 'Tài khoản'),
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

const itemsMessage = [
  getItemMessage('0', <UserOutlined />, 'Nguyễn Văn A', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('1', <UserOutlined />, 'Nguyễn Văn B', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('2', <UserOutlined />, 'Nguyễn Văn C', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('3', <UserOutlined />, 'Nguyễn Văn D', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('4', <UserOutlined />, 'Nguyễn Văn E', 'Đã gửi cho bạn một tin nhắn'),
  getItemMessage('5', <UserOutlined />, 'Nguyễn Văn F', 'Đã gửi cho bạn một tin nhắn'),
];

const items = itemsMessage.map((item) => {
  return {
    label: parseItemToLabel(item),
    key: item.key,
  };
});

const HeaderClient = () => {
  const navigate = useNavigate();

  const handleRedirect = (key) => {
    navigate('/' + key);
  };

  return (
    <div>
      <Row
        style={{
          width: '100vw',
          padding: '10px 20px',
          marginRight: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Col span={6}>
          <Flex align="center" align-items="center">
            <Space>
              <Avatar
                size={40}
                icon={<UserOutlined />}
                style={{
                  marginRight: '10px',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              />
            </Space>
            <Input
              size="large"
              placeholder="Tìm kiếm trên Social Network"
              style={{ borderRadius: '20px', maxWidth: '300px' }}
            />
          </Flex>
        </Col>
        <Col span={8}>
          <Flex justify="space-around" align="center">
            {itemsCenter &&
              itemsCenter.map((item) => (
                <Tooltip key={item.key} placement="bottom" title={item.tooltip}>
                  <Button
                    color="default"
                    variant="link"
                    icon={item.icon}
                    size="large"
                    onClick={() => handleRedirect(item.key)}
                  ></Button>
                </Tooltip>
              ))}
          </Flex>
        </Col>
        <Col span={6}>
          <Flex justify="flex-end" align="center">
            <HeaderMessage />
            <HeaderNotification />
            <HeaderAccount />
          </Flex>
        </Col>
      </Row>
      <Divider style={{ padding: '0px', margin: '0px' }} />
    </div>
  );
};

export default HeaderClient;
