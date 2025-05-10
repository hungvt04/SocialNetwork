import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import {
  GlobalOutlined,
  LockOutlined,
  UserOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { API_COMMON_IMAGE, API_MANAGEMENT_ARTICLE } from '../../../constants/BaseApi';
import axiosInstance from '../../../api/axiosInstance';
import ModalTagUser from './ModalTagUser';
import Loading from '../common/loading/Loading';

const { Dragger } = Upload;
const { TextArea } = Input;
const { Text } = Typography;

const ModalCreateSocialMediaPost = ({ isModalOpen, handleOk, handleCancel }) => {
  const [api, contextHolder] = notification.useNotification();

  const [fileList, setFileList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalTagUser, setIsOpenModalTagUser] = useState(false);
  const [tagUsers, setTagUsers] = useState([]);
  const [article, setArticle] = useState({
    status: 'PRIVATE',
    content: '',
    images: [],
    members: [],
    hashtags: [],
  });

  const props = {
    multiple: true,
    showUploadList: false,
    beforeUpload: (file) => {
      const preview = {
        uid: file.uid,
        name: file.name,
        url: URL.createObjectURL(file),
      };

      setPreviewImages((prev) => [...prev, preview]);
      setFileList((prev) => [...prev, file]);

      return false;
    },
    onRemove: (file) => {
      handleRemoveImage(file.uid);
    },
    fileList: fileList,
  };

  const handleRemoveImage = (uid) => {
    setFileList((prev) => prev.filter((file) => file.uid !== uid));
    setPreviewImages((prev) => prev.filter((image) => image.uid !== uid));
  };

  const handlePostImage = async () => {
    const formData = new FormData();

    if (fileList && fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append('files', file);
      });
      const uploadRes = await axiosInstance.post(API_COMMON_IMAGE + '/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log({ uploadRes });

      const uploadedUrls = uploadRes?.data?.data?.urls;
      setFileList([]);
      setPreviewImages([]);
      return uploadedUrls;
    }
  };

  const handlePostArticle = async () => {
    setIsLoading(true);
    const imageUrls = await handlePostImage();

    const articlePost = {
      ...article,
      images: imageUrls,
    };

    try {
      const postRes = await axiosInstance.post(API_MANAGEMENT_ARTICLE, articlePost);
      console.log('Post article success:', postRes.data);

      setArticle({
        status: 'PRIVATE',
        content: '',
        images: [],
        members: [],
        hashtags: [],
      });
    } catch (error) {
      console.error('Error:', error);
      console.error('Error response:', error.response);

      if (error?.response?.data) {
        const moreInformation = error.response.data.moreInformation;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModalTagUser = () => {
    setTagUsers([]);
    setIsOpenModalTagUser(false);
  };

  const handleAddTagUser = (user) => {
    setTagUsers((prev) => [...prev, user]);
  };

  return (
    <div>
      {contextHolder}
      {<Loading isLoading={isLoading} />}
      <Modal
        title="Tạo bài viết"
        open={isModalOpen}
        onOk={handlePostArticle}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handlePostArticle} style={{ width: '100%' }}>
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
                  defaultValue="PRIVATE"
                  style={{ width: 'fit-content', minWidth: 120 }}
                  size="small"
                  onChange={(value) => {
                    setArticle((prev) => ({
                      ...prev,
                      status: value,
                    }));
                  }}
                  options={[
                    {
                      value: 'PUBLIC',
                      label: (
                        <>
                          <GlobalOutlined /> Công khai
                        </>
                      ),
                    },
                    {
                      value: 'PRIVATE',
                      label: (
                        <>
                          <LockOutlined /> Chỉ mình tôi
                        </>
                      ),
                    },
                  ]}
                />
              </Space>
              <Space style={{ textAlign: 'right', marginLeft: 'auto' }}>
                <UserAddOutlined
                  style={{ fontSize: '25px', cursor: 'pointer' }}
                  onClick={() => {
                    setIsOpenModalTagUser(true);
                  }}
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
          onChange={(e) => {
            setArticle((prev) => ({
              ...prev,
              content: e.target.value,
            }));
          }}
        />

        <Dragger {...props} style={{ padding: '0px', borderRadius: 10 }}>
          {previewImages.length === 0 ? (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Kéo thả ảnh vào đây hoặc bấm để chọn</p>
              <p className="ant-upload-hint">Chỉ chấp nhận định dạng ảnh.</p>
            </>
          ) : (
            <Row gutter={[8, 8]}>
              {previewImages.map((image) => (
                <Col key={image.uid} xs={12} sm={12} style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'relative',
                      height: '150px',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(image.uid);
                      }}
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
          )}
        </Dragger>
      </Modal>
      <ModalTagUser
        isOpenModalTagUser={isOpenModalTagUser}
        handleCloseModalTagUser={handleCloseModalTagUser}
        handleAddTagUser={handleAddTagUser}
      />
    </div>
  );
};

export default ModalCreateSocialMediaPost;
