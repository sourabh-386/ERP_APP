import React from 'react'
import './Item.css'
import { motion } from 'framer-motion'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Item_parent from '../../Containers/Item_parent_table/Item_parent'
import { Item_Table_context_provider } from '../../Context/Item_table_context/Item_table_context'

const Item = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
           <Item_Table_context_provider> 
            <div className='main_div'>
                <div className='table_side'>
                    <Sidebar />
                </div>
                <div className='main_box'>
                    <Item_parent/>
                </div>       
            </div>
            </Item_Table_context_provider>
        </motion.div>
    )
}

export default Item