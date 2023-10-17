import React, { useState } from 'react'
import './Parent_table.css'
import Table from '../../Component/Table_components/Table/Table'
import Sitetable from '../../Component/Table_components/Client_site/Sitetable'
import Site_data from '../../Component/Table_components/Site_data/Site_data'
import { useContext } from 'react'
// import { useState } from 'react'
import { Table_context } from '../../Context/Table_context/Table_context'
import Alert_box from '../../Component/Alert_box/Alert_box'
import Customer_contact from '../../Component/Table_components/Customer_contact/Customer_contact'
import Customer_contact_table from '../../Component/Table_components/Customer_contact_table/Customer_contact_table'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Submit_customer_details_fn } from '../../Helper_fn/Submit_customer_details'
const Parent_table = () => {

    const {Cust_save_btn,Cust_main_table_data,site_data,site_contact,disable_form,set_disable_form } = useContext(Table_context)
    

    return (
        <div>
            <div className='outer_parent_div'>
         
                <div className='main_item_table_box'>
                    <Table />
                </div>
                <div className='main_item_table_box'>
                    <Sitetable/>
                </div>
                <div className='main_item_table_box'>
                    <Customer_contact/>
                </div>
                <div className='Item_table_btns'>
                    <button onClick={()=>{Submit_customer_details_fn(Cust_save_btn,Cust_main_table_data,site_data,site_contact,set_disable_form,disable_form)}}><b>Submit</b></button>
                    <button onClick={() => window.location.reload(false)}><b>Create New</b></button>

                </div>

            </div>
            
        </div>
    )
}

export default Parent_table