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
  Image,
} from 'antd';
import React, { useState } from 'react';
import {
  EllipsisOutlined,
  GlobalOutlined,
  LockOutlined,
  UserDeleteOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;
const { TextArea } = Input;
const { Text, Paragraph } = Typography;

const ModalCreateSocialMediaPost = ({ isModalOpen, handleOk, handleCancel }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [showUploader, setShowUploader] = useState(true);

  const props = {
    name: 'file',
    multiple: true,
    fileList: fileList,
    beforeUpload: (file) => {
      // Kiểm tra định dạng file
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ chấp nhận định dạng ảnh!');
        return Upload.LIST_IGNORE;
      }

      // Đọc file để hiển thị preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImages(prev => [...prev, {
          uid: file.uid,
          url: reader.result,
          name: file.name
        }]);
      };
      
      return false; // Ngăn chặn upload tự động
    },
    onChange(info) {
      // Cập nhật danh sách file
      setFileList(info.fileList);
      
      // Ẩn uploader nếu có ảnh
      if (info.fileList.length > 0) {
        setShowUploader(false);
      } else {
        setShowUploader(true);
        setPreviewImages([]);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    customRequest: ({ file, onSuccess }) => {
      // Xử lý upload (giả lập thành công sau 1 giây)
      setTimeout(() => {
        onSuccess('ok');
      }, 1000);
    },
    onRemove: (file) => {
      // Xóa ảnh khỏi preview khi xóa file
      setPreviewImages(prev => prev.filter(item => item.uid !== file.uid));
      
      // Hiện lại uploader nếu không còn ảnh nào
      if (fileList.length <= 1) {
        setShowUploader(true);
      }
    }
  };

  // Xử lý xóa một ảnh cụ thể
  const handleRemoveImage = (uid) => {
    setFileList(prev => prev.filter(file => file.uid !== uid));
    setPreviewImages(prev => prev.filter(image => image.uid !== uid));
    
    // Hiện lại uploader nếu không còn ảnh nào
    if (fileList.length <= 1) {
      setShowUploader(true);
    }
  };

  return (
    <div>
      <Modal 
        title="Tạo bài viết" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Đăng bài
          </Button>,
        ]}
      >
        <Divider style={{ margin: '0' }} />
        <Row>
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

        {/* Hiển thị ảnh đã tải lên */}
        {previewImages.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <Row gutter={[8, 8]}>
              {previewImages.map((image) => (
                <Col key={image.uid} xs={24} sm={12} style={{ position: 'relative' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img
                      src={image.url}
                      alt={image.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={() => handleRemoveImage(image.uid)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Hiển thị uploader khi không có ảnh hoặc khi muốn thêm ảnh */}
        {showUploader && (
          <Dragger {...props} style={{ padding: 20, borderRadius: 10 }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Kéo thả ảnh vào đây hoặc bấm để chọn</p>
            <p className="ant-upload-hint">Chỉ chấp nhận định dạng ảnh.</p>
          </Dragger>
        )}

        {/* Nút thêm ảnh khi đã có ảnh và uploader đã ẩn */}
        {!showUploader && (
          <Button 
            onClick={() => setShowUploader(true)}
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            Thêm ảnh
          </Button>
        )}

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