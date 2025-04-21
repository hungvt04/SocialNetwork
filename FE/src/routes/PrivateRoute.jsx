import React from 'react'
import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../constants/BaseApi';
import { parseJwt } from '../utils/Helper';

const PrivateRoute = ({role, children}) => {

    const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    const result = parseJwt(token);

    console.log({result});
    
    
    const isRole = result?.role.includes(role);

    return !token ? <Navigate to="/exception/401" /> : isRole ? children : <Navigate to="/exception/403" />;
}

export default PrivateRoute
