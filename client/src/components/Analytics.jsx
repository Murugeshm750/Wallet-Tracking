import React from 'react'
import Footer from './Footer'
import { useLocation } from 'react-router-dom';


const Analytics = () => {
    const location = useLocation();
    // const buslist = location.state ? location.state.shareBusList : [];
    const { footerDashboard } = location.state ? location.state.shareUserName : {};
  return (
    <div>
    <div className='analytics'>
    Analytics
    </div>
<Footer footerDashboard ={footerDashboard}/>
</div> 
  )
}

export default Analytics