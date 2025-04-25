import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../../../constants/BaseApi';

const OAuth2Callback = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
      setTimeout(() => {
        navigate('/');
      }, 1000)
    }
  }, [token, navigate]);

  return <p style={{textAlign: 'center', margin: '0 auto'}}>Đang xử lý đăng nhập...</p>;
};

export default OAuth2Callback;
