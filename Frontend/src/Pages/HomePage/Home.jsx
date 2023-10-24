import React from 'react'
import './Home.css'
import { motion } from 'framer-motion'
// import Customer_contact from '../../Component/Table_components/Customer_contact/Customer_contact'
// import Random from '../../Sub_component/random'
import Option_box from '../../Sub_component/Reused_comp/Option_box/Option_box'
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className='main_div'>
      <div className='side'></div>
      <div className='main_home_div'>
        homepage
        {/* <Random /> */}
        {/* <Random /> */}
        <Option_box />
  

      </div>

    </motion.div>
  )
}

export default Home