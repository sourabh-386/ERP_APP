import React from 'react'
import './App.css'
import Customer from './Pages/CustomerPage/Customer'
import Home from './Pages/HomePage/Home'
import Navbar from './Containers/Navbar/Navbar'
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <div className='app_main'>
      <Navbar />
      <AnimatePresence>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customer' element={<Customer />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App