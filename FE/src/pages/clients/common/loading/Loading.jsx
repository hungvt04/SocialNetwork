import { Flex, Spin } from 'antd';

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        </div>
      )}
    </>
  );
};

export default Loading;
