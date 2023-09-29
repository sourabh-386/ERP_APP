import React from 'react'
import './Home.css'
import {motion} from 'framer-motion'
import Customer_contact from '../../Component/Table_components/Customer_contact/Customer_contact'
const Home = () => {
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:1}}
    className='main_div'>
        <div className='side'></div>
        <div className='main_home_div'>
        <div className='customer_contact_main'>
            <br />
          <Customer_contact />
        </div>
        </div>
        
    </motion.div>
  )
}

export default Home