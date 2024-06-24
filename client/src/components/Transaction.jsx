import React from 'react'
import Footer from './Footer'
import { useLocation } from 'react-router-dom';
import Header from './Header';


const Transaction = () => {
    const location = useLocation();
    // const buslist = location.state ? location.state.shareBusList : [];
    const { footerDashboard } = location.state ? location.state.shareUserName : {};
  return (
    <div>
    <div className='transaction'>
    <Header title = "Transaction"/>
    Transaction
    </div>
<Footer footerDashboard ={footerDashboard}/>
</div> 
  )
}

export default Transaction