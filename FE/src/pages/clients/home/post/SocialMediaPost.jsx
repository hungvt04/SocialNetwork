import { Avatar, Typography, Button, Space, Flex, Row, Col, Divider } from 'antd';
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
        <Row
          style={{
            borderRadius: '10px 10px 0px 0px ',
            marginTop: '0px',
          }}
        >
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
        </Row>

        <img
          style={{
            cover: 'cover',
            width: '100%',
            height: '100%',
          }}
          alt="post"
          src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/495104089_664252183245844_3878587684754354222_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=71_6qyjuxKEQ7kNvwFN2e_V&_nc_oc=Adm_irHOb8e6LkDbfFWbVjXxMNP30tAGxQG34SKg1cu6MBr_OAtET3rDgACh4ONTaU4&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=rci0w0Kd6Qn_7IQz7lhN-A&oh=00_AfI837ALiAKKMTn-ervwch11hDh7MK4C0gvOS5H2EHldLg&oe=6820B646"
        />
        <Row>
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
