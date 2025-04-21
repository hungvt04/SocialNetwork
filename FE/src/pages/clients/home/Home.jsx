import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h2>Trang chủ</h2>
        <Link to="/login">Đăng nhập</Link>
    </div>
  )
}

export default Home
