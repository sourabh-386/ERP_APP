import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Employee_parent from '../../Containers/Employee_table/Employee_parent'
import { Emp_Table_context_provider } from '../../Context/Employee_table_context/Employee_table_context'
const Employee = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Emp_Table_context_provider>
            <div className='main_div'>
                <div className='table_side'>
                    <Sidebar />
                </div>
                <div className='main_box'>
                    <Employee_parent />
                </div>
            </div>
            </Emp_Table_context_provider>
        </motion.div>
    )
}

export default Employee