import React from 'react';
import { Card, Avatar, Typography, Button, Space, Flex, Row, Col, Divider } from 'antd';
import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const SocialMediaPost = () => {
  return (
    <>
      <div
        style={{
          maxWidth: 600,
          margin: '20px auto',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(56, 56, 56, 0.23)',
        }}
      >
        <img
          style={{ cover: 'cover', width: '100%', height: '100%' }}
          alt="post"
          src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/492348579_653854957618900_7311016210018614643_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeElHqXJswtS1Urw09Alpk-nHtzqzRt_vrAe3OrNG3--sEqUpDvMemz-LCzaynp18aUCKq6m9oxPUSZW9md5ix7i&_nc_ohc=epMBo1sKfWcQ7kNvwH8ptmU&_nc_oc=Adn8Fa5P9oiFa5QXYixYIsmlykFSYlYi_yEnMaGT7DPOYdfJM4gssIkVslP5o3xwI6I&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=ay-AgqwsHX4b4VFZD9iiow&oh=00_AfEZlJ6F1OuN65f6y2ISL0kwc9sJ1BtvzjUUOxuLYMl-AQ&oe=680D223E" // Thay bằng đường dẫn ảnh thật hoặc import
        />

        <Row style={{}}>
          <Col span={24}>
            <Flex justify="space-between" align="center" style={{ padding: '8px 15px' }}>
              <Flex>
                <Avatar
                  size={35}
                  icon={<UserOutlined />}
                  style={{
                    marginRight: '10px',
                    flexShrink: 0,
                    alignSelf: 'center',
                  }}
                />
                <Space direction="vertical" size={0}>
                  <Text strong>
                    Đặng Thu Hà <Text type="link">• Theo dõi</Text>
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    21 giờ · 🌐
                  </Text>
                </Space>
              </Flex>
              <EllipsisOutlined style={{ fontSize: 20, color: '#555', cursor: 'pointer' }} />
            </Flex>
          </Col>

          <Col span={24} style={{ padding: '0 15px 8px' }}>
            Lên đồ make up 7749 bước xong trời mưa kiểu: <br />
            Cíu toi 🥹🥹 <br />
            #dangthuhaf #dangthuha #schannel
          </Col>
          <Divider style={{ padding: '0px', margin: '0px' }} />
          <Col span={24}>
            <Flex justify="space-around" align="center" style={{ padding: '8px 10px' }}>
              <Button type="text" icon={<LikeOutlined />}>
                Thích
              </Button>
              <Button type="text" icon={<MessageOutlined />}>
                Bình luận
              </Button>
              <Button type="text" icon={<ShareAltOutlined />}>
                Chia sẻ
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SocialMediaPost;
