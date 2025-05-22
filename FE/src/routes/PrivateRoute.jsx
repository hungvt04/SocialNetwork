import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/BaseApi';
import { parseJwt } from '@/utils/Helper';

const PrivateRoute = ({ role, children }) => {
  // const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  const token = sessionStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  const result = parseJwt(token);

  const isRole = result?.role.includes(role);

  // return !token ? (
  //   <Navigate to="/exception/401" />
  // ) : isRole ? (
  //   children
  // ) : (
  //   <Navigate to="/exception/403" />
  // );
  return children;
};

export default PrivateRoute;
