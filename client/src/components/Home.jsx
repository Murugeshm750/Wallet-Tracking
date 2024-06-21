import React from 'react'
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import '../styles/home.css'



const Home = () => {
    const location = useLocation();
    // const buslist = location.state ? location.state.shareBusList : [];
    const { footerDashboard } = location.state ? location.state.shareUserName : {};
  return (
    <div>
        <div className='home'>
            Home
        </div>
    <Footer footerDashboard ={footerDashboard}/>
    </div>
  )
}

export default Home