import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Category from './components/Category';
import Analytics from './components/Analytics';
import Transaction from './components/Transaction';
import AddAccount from './components/AddAccount';
import AccountList from './components/AccountList';
import AmountFilterCard from './components/AmountFilterCard';





function App() {

  return (
<Router>
  <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/category' element={<Category/>}/>
  <Route path='/analytics' element={<Analytics/>}/>
  <Route path='/transaction' element={<Transaction/>}/>
  <Route path='/addaccount' element={<AddAccount/>}/>
  <Route path='/accountList' element={<AccountList/>}/>
  <Route path='/amountFilterCard' element={<AmountFilterCard/>}/>


  </Routes>
</Router>
   )
}

export default App
