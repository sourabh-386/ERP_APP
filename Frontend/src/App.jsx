import React from 'react'
import './App.css'
import Customer from './Pages/CustomerPage/Customer'
import Home from './Pages/HomePage/Home'
import Navbar from './Containers/Navbar/Navbar'
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'
import Item from './Pages/ItemPage/Item'
import Employee from './Pages/Employee/Employee'
import AdminPage from './Pages/AdminPage/AdminPage'
import Loader from './Sub_component/Reused_comp/Loder/Loader'
import { useSelector } from 'react-redux';
import Client_box_search from './Sub_component/Admin_page/Client_box_search'

const App = () => {
  const loadingScreen = useSelector((state) => state.reducer1.Loading_screen);
  const search_vis = useSelector((state) => state.reducer2.Search_box);

  return (
    <div className='app_main'>

      {/* show loading screen  */}
      {
        loadingScreen ?
          <Loader /> : ''

      }

      {/* show search_box  */}
      {/* {
        search_vis ?
          <Client_box_search /> : ''

      } */}

      {/* navbar  */}
      <Navbar />

      {/* pages  */}
      <AnimatePresence>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/Item' element={<Item />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App