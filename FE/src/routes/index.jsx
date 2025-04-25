import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { LoginComponent } from '../pages/auth/login';
import { OAuth2Callback } from '../pages/auth/oauth2';
import { Dashboard } from '../pages/clients/dashboard';
import { ROUTE_EXCEPTION } from './RouteException';
import { ExceptionComponent } from '../pages/exceptions';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
        <Route
          path="/"
          element={
            <PrivateRoute role="USER">
              <Dashboard />
            </PrivateRoute>
          }
        />

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
