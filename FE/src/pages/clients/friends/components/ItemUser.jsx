import { Button, Col, Flex, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ItemUser = ({ user, friendStatus, mutualFriendsCount }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          width: 200,
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(56, 56, 56, 0.23)',
        }}
      >
        <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/friends/profile/${user.id}`)}>
          {user?.avatar && (
            <img src={user?.avatar} alt="Avatar user" height={'100%'} width={'100%'} />
          )}

          <Text
            style={{
              padding: '8px 10px',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            {user?.name || 'Tên người dùng'}
          </Text>
        </div>

        <Row>
          <Col span={24}>
            {!friendStatus && (
              <span
                align="center"
                style={{
                  padding: '8px 10px',
                }}
              >
                {mutualFriendsCount} bạn chung
              </span>
            )}
            <Flex align="center" vertical style={{ padding: '8px 10px' }}>
              <Button
                type="text"
                style={{
                  color: friendStatus ? 'rgb(255, 255, 255)' : 'rgb(0, 100, 209)',
                  backgroundColor: friendStatus ? 'rgb(8, 102, 255)' : 'rgb(235, 245, 255)',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '0px 10px',
                  width: '100%',
                  marginTop: '10px',
                }}
              >
                Xác nhận
              </Button>
              <Button
                type="text"
                style={{
                  color: 'rgb(28, 30, 33)',
                  backgroundColor: 'rgb(226, 229, 233)',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '0px 10px',
                  width: '100%',
                  marginTop: '10px',
                }}
              >
                Xóa
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ItemUser;
