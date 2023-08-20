import React from 'react'
import hero from './../../assets/img/hero.png'
import logo from './../../assets/logo/logo.png'

const Header = () => {
  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
            <a href="" class="navbar-brand p-0">
                <div className="header-container__logo"></div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto py-0 pe-4">
                    <a href="/" class="nav-item nav-link active">Trang chủ</a>
                    <a href="/menu" class="nav-item nav-link">Thực đơn</a>
                    <a href="/customer" class="nav-item nav-link">Khách hàng</a>
                    <a href="/bill" class="nav-item nav-link">Hóa đơn</a>
                    {/* <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                        <div class="dropdown-menu m-0">
                            <a href="booking.html" class="dropdown-item">Booking</a>
                            <a href="team.html" class="dropdown-item">Our Team</a>
                            <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                        </div>
                    </div> */}
                    <a href="contact.html" class="nav-item nav-link">Liên lạc</a>
                </div>
                {/* <a href="" class="btn btn-primary py-2 px-4">Book A Table</a> */}
            </div>
        </nav>
    </>
  )
}

export default Header