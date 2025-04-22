import React from 'react'
import { Avatar, Badge, Button, Col, Flex, Input, Row, Space, Tooltip } from 'antd'
import { BellOutlined, HomeOutlined, MessageOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
  
const styleAvatar = {
    marginLeft: '15px',
    flexShrink: 0,
    alignSelf: 'center',
    cursor: 'pointer'
}

const HeaderClient = () => {
  return (
    <div>
        <Row style={{ width: '100vw', padding: '10px 20px', backgroundColor: 'gray'}}>
            <Col span={6}>
                <Flex
                    align="center"
                    justify='space-between'
                    align-items="center" 
                >
                    <Space>
                        <Avatar size={44} icon={<UserOutlined />} style={{ 
                            marginRight: '10px',
                            flexShrink: 0,
                            alignSelf: 'center'
                        }} />
                    </Space>
                    <Input
                        size="large"
                        placeholder="Tìm kiếm trên Social Network"
                    />
                </Flex> 
            </Col>
            <Col span={12}>
                <Flex 
                    justify='space-around'
                    align="center"
                >
                    <Button color='default' variant="link" icon={<HomeOutlined />} size='large'></Button>
                    <Button color='default' variant="link" icon={<UsergroupAddOutlined />} size='large'></Button>
                    <Button color='default' variant="link" icon={<VideoCameraOutlined />} size='large'></Button>
                </Flex>
            </Col>

            <Col span={6}>
                <Flex 
                    justify='flex-end'
                    align="center"
                >
                    <Tooltip placement="bottom" title="Tin nhắn">
                        <Badge count='9+'>
                            <Avatar size={44} icon={<MessageOutlined />} style={styleAvatar}/>
                        </Badge>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Thông báo">
                        <Badge count='9+'>
                            <Avatar size={44} icon={<BellOutlined />} style={styleAvatar}/>
                        </Badge>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Tài khoản">
                        <Avatar size={44} icon={<UserOutlined />}  style={styleAvatar}/>
                    </Tooltip>
                </Flex>
            </Col>
        </Row>
    </div>
  )
}

export default HeaderClient
