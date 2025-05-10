import { Avatar, Button, Col, Divider, Flex, Row, Typography } from 'antd';
import React, { useState } from 'react';
import {
  UserOutlined,
  SmileOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
  VideoCameraFilled,
  PictureFilled,
  PictureOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import ModalCreateSocialMediaPost from './ModalCreateSocialMediaPost';

const { Text, Paragraph } = Typography;

const CreateSocialMediaPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    alert('Tạo bài viết thành công!');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '20px auto',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(56, 56, 56, 0.23)',
      }}
    >
      <Row>
        <Col span={24}>
          <Flex justify="space-between" align="center" style={{ padding: '8px 15px' }}>
            <Flex>
              <Avatar
                size={45}
                icon={<UserOutlined />}
                style={{
                  marginRight: '10px',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              />
            </Flex>
            <Button
              color="default"
              variant="filled"
              style={{
                borderRadius: '20px',
                color: 'rgba(97, 97, 97, 0.23)',
                flex: '1',
                height: '45px',
              }}
              onClick={showModal}
            >
              Hùng ơi, bạn đang nghĩ gì thế?
            </Button>
          </Flex>
        </Col>
        <Divider style={{ padding: '0px', margin: '0px' }} />
        <Col span={24}>
          <Flex justify="space-around" align="center" style={{ padding: '8px 15px' }}>
            <Button type="text" icon={<VideoCameraOutlined />}>
              Video trực tiếp
            </Button>
            <Button type="text" icon={<PictureOutlined />} onClick={showModal}>
              Ảnh/video
            </Button>
            <Button type="text" icon={<SmileOutlined />}>
              Cảm xúc/hoạt động
            </Button>
          </Flex>
        </Col>
      </Row>

      <ModalCreateSocialMediaPost
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default CreateSocialMediaPost;
