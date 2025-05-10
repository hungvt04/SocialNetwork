import { Avatar, Typography, Button, Space, Flex, Row, Col, Divider, Popover } from 'antd';
import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';

const { Text } = Typography;

const Article = ({
  authorName,
  createdAt,
  content,
  urls,
  totalReact,
  totalComment,
  totalShare,
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

  const handleReaction = (reaction) => {
    console.log(`You reacted with: ${reaction}`);
  };

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

          <Col span={24} style={{ padding: '0 15px 8px' }}>
            {content}
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
          src={urls[0]}
        />
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
                  icon={<LikeOutlined />}
                  onMouseEnter={showPopover}
                  onMouseLeave={hidePopover}
                >
                  {totalReact} Thích
                </Button>
              </Popover>
              <Button type="text" icon={<MessageOutlined />}>
                {totalComment} Bình luận
              </Button>
              <Button type="text" icon={<ShareAltOutlined />}>
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
