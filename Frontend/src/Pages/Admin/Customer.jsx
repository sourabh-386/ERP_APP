
import Sidebar from '../../Component/Sidebar/Sidebar'
import Navbar from '../../Component/Navbar/Navbar'
import Parent_table from '../../Containers/Parent_customer_table/Parent_table'
import React from 'react'
import './Customer.css'
import { Table_context_provider } from '../../Context/Table_context/Table_context'
const Customer = () => {
  return (
<Table_context_provider>
    <div  >

      <div className='main_div'>
        <div className='table_side'>
        <Sidebar />
        </div>
        <div className='main_box'>
         <Parent_table /> 
        </div>
      </div>

    </div>
 </Table_context_provider>
  )
}

export default Customer
