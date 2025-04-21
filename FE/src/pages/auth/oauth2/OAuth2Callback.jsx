// import React, { useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_USERNAME } from '../../../constants/BaseApi';
// import { parseJwt } from '../../../utils/Helper';

// const OAuth2Callback = () => {
    
//     const [searchParams] = useSearchParams();
//     const token = searchParams.get("token");
//     const username = parseJwt(token);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       if (username) {
//         localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
//         localStorage.setItem(LOCAL_STORAGE_USERNAME, username);
//         navigate("/dashboard");
//       }
//     }, [token, navigate]);
  
//     return <p>Đang xử lý đăng nhập...</p>;
// }

// export default OAuth2Callback
