import React, { useEffect } from 'react'
import hero from './../../assets/img/hero.png'
import './Home.css'
import { useNavigate, useNavigation } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        function doc_keyUp(e) {
    
            // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
            if (e.altKey && e.which == 49) {
                // call your function to do the thing
                navigate("/")
            }
            if (e.altKey && e.which == 50) {
            // call your function to do the thing
            navigate("/menu")
            }
            if (e.altKey && e.which == 51) {
            // call your function to do the thing
            navigate("/customer")
            }
            if (e.altKey && e.which == 52) {
            // call your function to do the thing
            navigate("/bill")
            }
        }
    
        document.addEventListener('keyup', doc_keyUp)
    }, [])

    return (
        <>
            <div class="container-xxl py-5 mb-5 home-container">
                <div class="container my-5 py-5">
                    <div class="row align-items-center g-5">
                        <div class="col-lg-6 text-center text-lg-start">
                            <h1 class="display-3 text-white animated slideInLeft">Cơm Nguyên<br/>Xin chào</h1>
                            <p class="text-white animated slideInLeft mb-4 pb-2">148 Khuất Duy Tiến, Nhân Chính, Thanh Xuân, Hà Nội</p>
                            {/* <a href="" class="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">Book A Table</a> */}
                        </div>
                        <div class="col-lg-6 text-center text-lg-end overflow-hidden">
                            <img class="img-fluid" src={hero} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home