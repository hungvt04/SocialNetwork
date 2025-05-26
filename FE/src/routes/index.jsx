import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_EXCEPTION } from '@/constants/RouteException';
import LoginComponent from '@/pages/auth/login/LoginComponent';
import ExceptionComponent from '@/pages/exceptions/ExceptionComponent';
import PrivateRoute from './PrivateRoute';
import OAuth2Callback from '@/pages/auth/oauth2/OAuth2Callback';
import ClientLayout from '@/layout/ClientLayout';
import { ROUTE_CLIENT_FRIENDS, ROUTE_CLIENT_PROFILE } from '@/constants/RoutesPath';
import Friends from '@/pages/clients/friends/Friends';
import Profile from '@/pages/clients/friends/components/Profile';

const AppRoutes = () => {
  const ClientRoute = [
    { path: ROUTE_CLIENT_FRIENDS, component: <Friends /> },
    { path: ROUTE_CLIENT_PROFILE, component: <Profile /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
        <Route
          path="/"
          element={
            <PrivateRoute role="USER">
              <ClientLayout />
            </PrivateRoute>
          }
        />

        {ClientRoute.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute role="USER">{route.component}</PrivateRoute>}
          />
        ))}

        {/* Route xử lý exception */}
        {ROUTE_EXCEPTION &&
          ROUTE_EXCEPTION.map((item) => (
            <Route
              key={item.key}
              path={item.route}
              element={
                <ExceptionComponent
                  title={item.props.title}
                  subTitle={item.props.subTitle}
                  route={item.props.route}
                  titleButton={item.props.titleButton}
                />
              }
            />
          ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
