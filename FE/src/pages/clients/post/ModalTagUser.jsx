import { Avatar, Button, Flex, Input, Modal, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const data = [
  'Vũ Trọng Hùng',
  'Nguyễn Văn A',
  'Nguyễn Văn B',
  'Nguyễn Văn C',
  'Nguyễn Văn D',
  'Nguyễn Văn E',
  'Nguyễn Văn F',
  'Nguyễn Văn G',
  'Nguyễn Văn H',
  'Nguyễn Văn I',
  'Nguyễn Văn J',
  'Nguyễn Văn K',
  'Nguyễn Văn L',
  'Nguyễn Văn M',
  'Nguyễn Văn N',
  'Nguyễn Văn O',
  'Nguyễn Văn P',
  'Nguyễn Văn Q',
  'Nguyễn Văn R',
  'Nguyễn Văn S',
  'Nguyễn Văn T',
  'Nguyễn Văn U',
  'Nguyễn Văn V',
  'Nguyễn Văn W',
];

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
  const [friendList, setFriendList] = useState(data);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleRemoveUser = (value) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== value));
    setFriendList((prev) => [...prev, value]);
    setFriendList((prev) => [...prev].sort((a, b) => a.localeCompare(b)));
  };

  const handleClickTagUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setFriendList((prev) => prev.filter((friend) => friend !== user));
  };

  useEffect(() => {
    setFriendList((prev) => [...prev].sort((a, b) => a.localeCompare(b)));
  }, []);

  return (
    <>
      <Modal
        title="Gắn thẻ người khác"
        open={isOpenModalTagUser}
        footer={null}
        onCancel={handleCloseModalTagUser}
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
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {friendList &&
            friendList?.map((item, index) => (
              <HoverableSpace key={index} onClick={() => handleClickTagUser(item)}>
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
        </div>
      </Modal>
    </>
  );
};

export default ModalTagUser;
