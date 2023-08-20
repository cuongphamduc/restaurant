import React from 'react'
import hero from './../../assets/img/hero.png'
import { Route, Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Menu from '../../pages/menu/Menu'
import './Main.css'
import Customer from '../../pages/customer/Customer'
import Bill from '../../pages/bill/Bill'

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
    ]);

    return (
        <div className="main-container">
            <RouterProvider router={router} />
        </div>
    )
}

export default Main