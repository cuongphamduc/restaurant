import React from 'react'
import Header from './header/Header'
import Main from './main/Main'
import './Layout.css'
import Toasts from '../components/toasts/Toasts'

const Layout = () => {
  return (
    <div className="layout-container">
      <Header></Header>
      <Main></Main>
      {/* <Toasts></Toasts> */}
    </div>
  )
}

export default Layout