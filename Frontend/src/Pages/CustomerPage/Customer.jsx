
import Sidebar from '../../Component/Sidebar/Sidebar'
// import Navbar from '../../Component/Navbar/Navbar'
import Parent_table from '../../Containers/Parent_customer_table/Parent_table'
import React from 'react'
import './Customer.css'
import { Table_context_provider } from '../../Context/Table_context/Table_context'
import { motion } from 'framer-motion'
// import Customer_contact from '../../Component/Table_components/Customer_contact/Customer_contact'
const Customer = () => {
  return (
    <Table_context_provider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}


      >

        <div className='main_div'>
          <div className='table_side'>
            <Sidebar />
          </div>
          <div className='main_box'>
            <Parent_table />
          </div>
        </div>
       

      </motion.div>
    </Table_context_provider>
  )
}

export default Customer
