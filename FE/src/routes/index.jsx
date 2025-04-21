import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginComponent } from '../pages/auth/login'
import { Home } from '../pages/clients/home'
import { ROUTE_EXCEPTION } from './RouteException'
import { ExceptionComponent } from '../pages/exceptions'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginComponent />} />

        {/* Route xử lý exception */}
        {ROUTE_EXCEPTION && ROUTE_EXCEPTION.map(item => (
          <Route key={item.key} path={item.route} element={         
            <ExceptionComponent
              title={item.props.title}
              subTitle={item.props.subTitle}
              route={item.props.route}
              titleButton={item.props.titleButton}
            />
          }/>
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
