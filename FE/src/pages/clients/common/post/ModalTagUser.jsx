import { Avatar, Button, Flex, Input, Modal, Select, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const data = ['Vũ Trọng Hùng', 'Nguyễn Văn A', 'Nguyễn Văn B', 'Nguyễn Văn C'];

const HoverableSpace = styled(Space)`
  margin-top: 3px;
  width: 100%;
  cursor: pointer;
  background-color: white;
  border-radius: 25px;

  &:hover {
    background-color: rgba(97, 97, 97, 0.23);
  }
`;

const { Text } = Typography;

const ModalTagUser = ({ isOpenModalTagUser, handleAddTagUser, handleCloseModalTagUser }) => {
  const [selectedUsers, setSelectedUsers] = useState(['Hùng', 'Hà']);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleRemoveUser = (value) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== value));
  };

  return (
    <>
      <Modal
        title="Gắn thẻ người khác"
        open={isOpenModalTagUser}
        footer={null}
        onCancel={handleCloseModalTagUser}
        style={{ height: '500px' }}
      >
        <Flex align="center" gap={10} style={{ marginBottom: '10px' }}>
          <Input
            size="large"
            placeholder="Nhập tên người dùng"
            style={{ borderRadius: '20px' }}
            prefix={<UserOutlined />}
          />
          <Button style={{ border: 'none' }} onClick={handleOk}>
            Xong
          </Button>
        </Flex>

        {selectedUsers && selectedUsers.length > 0 && (
          <>
            <Text style={{ fontSize: '12px', fontWeight: '500' }}>ĐÃ GẮN THẺ</Text>
            <Select
              mode="multiple"
              style={{ width: '100%', marginBottom: 10, borderRadius: '20px' }}
              size="large"
              value={selectedUsers.map((u) => u)}
              onDeselect={handleRemoveUser}
              open={false}
              suffixIcon={null}
            />
          </>
        )}
        <Text style={{ fontSize: '12px', fontWeight: '500' }}>GỢI Ý</Text>
        {data &&
          data?.map((item, index) => (
            <HoverableSpace key={index}>
              <Flex justify="space-between" align="center" style={{ padding: '4px' }}>
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  style={{
                    marginRight: '10px',
                    flexShrink: 0,
                    alignSelf: 'center',
                  }}
                />
                {item}
              </Flex>
            </HoverableSpace>
          ))}
      </Modal>
    </>
  );
};

export default ModalTagUser;
