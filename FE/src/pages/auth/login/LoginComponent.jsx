import React, { useEffect } from 'react';
import './LoginComponent.css'; // import CSS riêng
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_USERNAME } from '../../../constants/BaseApi';

const LoginComponent = () => {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_USERNAME);
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Đăng nhập</h2>
      <button onClick={handleLogin} className="google-login-button">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" 
          alt="Google Logo"
          className="google-logo"
        />
        Đăng nhập với Google
      </button>
    </div>
  );
};

export default LoginComponent;
