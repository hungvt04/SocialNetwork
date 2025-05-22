import React, { useEffect } from 'react';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';

const LoginComponent = () => {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
    gap: '10px', // Tạo khoảng cách giữa ảnh và chữ
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const imgStyle = {
    width: '20px', // Điều chỉnh kích thước ảnh
    height: '20px',
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh', // Chiếm toàn bộ chiều cao màn hình
        display: 'flex',
        justifyContent: 'center', // Căn giữa ngang
        alignItems: 'center', // Căn giữa dọc
        padding: '2rem',
        textAlign: 'center',
        flexDirection: 'column', // Xếp nội dung theo chiều dọc
      }}
    >
      <h2>Đăng nhập</h2>
      <button onClick={handleLogin} style={buttonStyle}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
          alt="Google Logo"
          style={imgStyle}
        />
        Login with Google
      </button>
    </div>
  );
};

export default LoginComponent;
