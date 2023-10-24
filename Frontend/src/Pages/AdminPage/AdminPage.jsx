import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Parent_admin_page from '../../Containers/Parent_Admin_page/Parent_admin_page'
import { Admin_context_provider } from '../../Context/Admin_context/Admin_context'
const AdminPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Admin_context_provider>
                <div className='main_div'>
                    <div className='table_side'>
                        <Sidebar />
                    </div>
                    <div className='main_box'>
                        <Parent_admin_page />

                    </div>
                </div>
            </Admin_context_provider>

        </motion.div>
    )
}

export default AdminPage