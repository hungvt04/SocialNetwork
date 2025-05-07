import { Flex, Spin } from 'antd';
import React from 'react';

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Flex align="center" justify="center" style={{ height: '100vh' }}>
          <Spin size="large" />
        </Flex>
      )}
    </>
  );
};

export default Loading;
