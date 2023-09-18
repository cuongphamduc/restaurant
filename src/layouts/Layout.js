import React, { useState } from 'react'
import Header from './header/Header'
import Main from './main/Main'
import './Layout.css'
import Toasts from '../components/toasts/Toasts'
import Login from '../pages/login/Login'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, useNavigate } from "react-router-dom";

const Layout = () => {
  const isLogin = useSelector((state) => state.login.isLogin)

  if (!isLogin){
    return <Login></Login>
  }
  

  

  return (
    <div className="layout-container">
      <BrowserRouter basename="/">
        <Header></Header>
        <Main></Main>
      </BrowserRouter>
      {/* <Toasts></Toasts> */}
    </div>
  )
}

export default Layout