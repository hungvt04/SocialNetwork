import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import React from 'react';
import {
  EllipsisOutlined,
  GlobalOutlined,
  LockOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  //   action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  customRequest: ({ file, onSuccess }) => {
    // Bạn có thể xử lý upload ở đây, ví dụ gửi file lên server
    console.log('Custom upload:', file);

    setTimeout(() => {
      onSuccess('ok');
    }, 1000);
  },
};

const { TextArea } = Input;
const { Text, Paragraph } = Typography;
const ModalCreateSocialMediaPost = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <div>
      <Modal title="Tạo bài viết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Divider style={{ margin: '0' }} />
        <Row style={{}}>
          <Col span={24}>
            <Flex align="center" style={{ padding: '10px 0px' }}>
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
                <Text strong>Hùng Vũ</Text>
                <Select
                  defaultValue="onlyMe"
                  style={{ width: 'fit-content', minWidth: 120 }}
                  size="small"
                  //   onChange={handleChange}
                  options={[
                    {
                      value: 'public',
                      label: (
                        <>
                          <GlobalOutlined /> Công khai
                        </>
                      ),
                    },
                    {
                      value: 'onlyMe',
                      label: (
                        <>
                          <LockOutlined /> Chỉ mình tôi
                        </>
                      ),
                    },
                    // {
                    //   value: 'exception',
                    //   label: (
                    //     <>
                    //       <UserDeleteOutlined /> Ngoại trừ
                    //     </>
                    //   ),
                    // },
                  ]}
                />
              </Space>
            </Flex>
          </Col>
        </Row>

        <TextArea
          placeholder="Hùng ơi, bạn đang nghĩ gì thế?"
          autoSize={{ minRows: 4 }}
          style={{
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            resize: 'none',
          }}
        />

        <Dragger {...props} style={{ padding: 20, borderRadius: 10 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Kéo thả ảnh vào đây hoặc bấm để chọn</p>
          <p className="ant-upload-hint">Chỉ chấp nhận định dạng ảnh.</p>
        </Dragger>

        <Row>
          <Col span={24}>
            <Flex align="center" style={{ padding: '8px 10px' }}>
              <Text strong style={{ fontSize: '16px' }}>
                Thêm vào bài viết của bạn
              </Text>
              <Button type="text" icon={<GlobalOutlined style={{ fontSize: '22px' }} />}></Button>
              <Button
                type="text"
                icon={<UserDeleteOutlined style={{ fontSize: '22px' }} />}
              ></Button>
              <Button type="text" icon={<LockOutlined style={{ fontSize: '22px' }} />}></Button>
            </Flex>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalCreateSocialMediaPost;
