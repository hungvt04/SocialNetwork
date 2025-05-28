import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';
import {
  deleteFriend,
  postFriend,
  putAcceptFriend,
  putRejectFriend,
} from '@/service/client/friends';
import { parseJwt } from '@/utils/Helper';
import { Button, Col, Flex, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ItemUser = ({ user, isSuggest, mutualFriendsCount }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  const payload = parseJwt(token);

  const handleAddFriendOrConfirm = async (userId) => {
    if (isSuggest) {
      await postFriend(userId);
    } else {
      await putAcceptFriend(userId);
    }
  };

  const handleRejectOrDeleteSuggest = async (userId) => {
    if (isSuggest) {
      await deleteFriend(userId);
    } else {
      await putRejectFriend(userId);
    }
  };

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
            // <img src={user?.avatar} alt="Avatar user" height={'100%'} width={'100%'} />
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Avatar user"
              height={'100%'}
              width={'100%'}
            />
          )}

          <Text
            style={{
              padding: '8px 10px',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            {user?.fullName || 'Tên người dùng'}
          </Text>
        </div>

        <Row>
          <Col span={24}>
            {!isSuggest && (
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
                  color: isSuggest ? 'rgb(255, 255, 255)' : 'rgb(0, 100, 209)',
                  backgroundColor: isSuggest ? 'rgb(8, 102, 255)' : 'rgb(235, 245, 255)',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '0px 10px',
                  width: '100%',
                  marginTop: '10px',
                }}
                onClick={() => handleAddFriendOrConfirm(user.id)}
              >
                {isSuggest ? 'Thêm bạn bè' : 'Xác nhận'}
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
                onClick={() => handleRejectOrDeleteSuggest(user.id)}
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
