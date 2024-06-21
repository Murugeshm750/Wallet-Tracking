import React from 'react'
import { useLocation } from 'react-router-dom';
import Footer from './Footer'
import Header from './Header';


const Category = () => {
    const location = useLocation();
    // const buslist = location.state ? location.state.shareBusList : [];
    const { footerDashboard } = location.state ? location.state.shareUserName : {};
  return (
    <div>
      <Header/>
    <div className='category'>
    Category
    </div>
<Footer footerDashboard ={footerDashboard}/>
</div> 
  )
}

export default Category