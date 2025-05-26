import { Avatar, Typography, Button, Space, Flex, Row, Col, Divider, Popover, Image } from 'antd';
import {
  EllipsisOutlined,
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';
import { API_MANAGEMENT_ARTICLE } from '@/constants/BaseApi';
import axiosInstance from '@/api/axiosInstance';

const { Text } = Typography;

const Article = ({
  articleId,
  authorName,
  createdAt,
  content,
  urls,
  totalReact,
  totalComment,
  totalShare,
  react,
}) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const showPopover = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const hidePopover = () => {
    timerRef.current = setTimeout(() => setOpen(false), 300);
  };

  const reactions = [
    { emoji: '👍', label: 'Like' },
    { emoji: '❤️', label: 'Love' },
    { emoji: '😂', label: 'Haha' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
  ];

  const contentLike = (
    <div style={{ display: 'flex', gap: 8 }} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {reactions.map((reaction, index) => (
        <span
          key={index}
          style={{ fontSize: 24, cursor: 'pointer' }}
          onMouseEnter={() => setOpen(true)}
          onClick={() => {
            handleReaction(reaction.label);
            setOpen(false);
          }}
        >
          {reaction.emoji}
        </span>
      ))}
    </div>
  );

  const deleteReaction = async () => {
    try {
      const response = await axiosInstance.delete(API_MANAGEMENT_ARTICLE + `/delete/${articleId}`);

      if (response.status === 200) {
        console.log('Delete reaction successfully:', response.data);
      }
    } catch (error) {
      console.error('Error data:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const reactArticle = async (reaction) => {
    try {
      const response = await axiosInstance.post(API_MANAGEMENT_ARTICLE + `/react/${articleId}`, {
        type: reaction.toUpperCase(),
      });

      if (response.status === 200) {
        console.log('Reaction sent successfully:', response.data);
      }
    } catch (error) {
      console.error('Error data:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleReaction = async (reaction) => {
    console.log(`You reacted with: ${articleId}`);
    console.log(`You reacted with: ${reaction}`);
    console.log(`You reacted with: ${react}`);
    if (reaction.toUpperCase() === 'Like'.toUpperCase() && react) {
      deleteReaction();
    } else {
      reactArticle(reaction);
    }
  };

  return (
    <>
      <div
        style={{
          margin: '0px auto',
          borderRadius: '10px',
          overflow: 'hidden',
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
              <Flex style={{ cursor: 'pointer' }}>
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
                  <Text strong type="link">
                    {authorName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {createdAt} · 🌐
                  </Text>
                </Space>
              </Flex>
              <EllipsisOutlined style={{ fontSize: 20, color: '#555', cursor: 'pointer' }} />
            </Flex>
          </Col>
          {urls.length > 0 ? (
            <Col span={24} style={{ padding: '0 15px 8px' }}>
              {content}
            </Col>
          ) : (
            <Col
              span={24}
              style={{
                padding: '0 15px 8px',
                minHeight: '200px',
                maxHeight: '400px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>{content}</Text>
            </Col>
          )}
          <Divider style={{ padding: '0px', margin: '0px' }} />
        </Row>

        {urls.length > 0 && <Image src={urls[0]} alt="Image post" height={'100%'} width={'100%'} />}

        <Row>
          <Col span={24}>
            <Flex justify="space-around" align="center" style={{ padding: '8px 10px' }}>
              <Popover
                content={contentLike}
                trigger="hover"
                open={open}
                onOpenChange={(visible) => setOpen(visible)}
                placement="top"
              >
                <Button
                  type="text"
                  icon={react ? <LikeFilled /> : <LikeOutlined />}
                  style={{
                    color: react ? '#1677ff' : '#555',
                    fontSize: '16px',
                    padding: '0px 10px',
                  }}
                  onMouseEnter={showPopover}
                  onMouseLeave={hidePopover}
                  onClick={() => {
                    handleReaction('Like');
                    setOpen(false);
                  }}
                >
                  {totalReact} Thích
                </Button>
              </Popover>
              <Button
                type="text"
                icon={<MessageOutlined />}
                style={{
                  fontSize: '16px',
                  padding: '0px 10px',
                }}
              >
                {totalComment} Bình luận
              </Button>
              <Button
                type="text"
                icon={<ShareAltOutlined />}
                style={{
                  fontSize: '16px',
                  padding: '0px 10px',
                }}
              >
                {totalShare} Chia sẻ
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Article;
