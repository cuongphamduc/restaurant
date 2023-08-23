import React from 'react'
import hero from './../../assets/img/hero.png'
import { Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Menu from '../../pages/menu/Menu'
import './Main.css'
import Customer from '../../pages/customer/Customer'
import Bill from '../../pages/bill/Bill'
import Login from '../../pages/login/Login'

const Main = () => {
    const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/menu",
        element: <Menu></Menu>,
    },
    {
        path: "/customer",
        element: <Customer></Customer>,
    },
    {
        path: "/bill",
        element: <Bill></Bill>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    ]);

    return (
        <div className="main-container">
            <Routes>
                <Route path="/" element={<Home></Home>}/> {/* 👈 Renders at /app/ */}
                <Route path="/menu" element={<Menu></Menu>}/> {/* 👈 Renders at /app/ */}
                <Route path="/customer" element={<Customer></Customer>}/> {/* 👈 Renders at /app/ */}
                <Route path="/bill" element={<Bill></Bill>}/> {/* 👈 Renders at /app/ */}
                <Route path="/login" element={<Login></Login>}/> {/* 👈 Renders at /app/ */}
            </Routes>
        </div>
    )
}

export default Main