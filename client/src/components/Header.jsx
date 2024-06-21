import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/header.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';




const Header = () => {
    const navigate = useNavigate();


async function back() {
    navigate('/')
}
  return (
        <header>
        <ArrowCircleLeftIcon className='arrowLeft' sx={{ fontSize: 32 }} onClick={() => back()}/>
        </header>
    )
}

export default Header