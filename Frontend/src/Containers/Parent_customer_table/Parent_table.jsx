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

    const {Cust_save_btn,Cust_main_table_data,site_data,site_contact } = useContext(Table_context)
    

    return (
        <div>
            <div className='outer_parent_div'>
                {/* <div className={pagemove ? 'parent_class_move' : 'parent_table_box'}>
                    <div className='table_data_box' >
                        <Table />
                        <div className='add_client_box' onClick={()=>{set_site_arrow_fn()}}>
                            <p class={site_arrow?'bi bi-caret-down-fill':'bi bi-caret-right-fill'} ></p>
                            <b > Site</b>
                            <div className='heading_underline'></div>
                        </div>
                        <br />
                        <div className={site_arrow?'site_data_outer_box':'site_data_outer_box_hid'}>
                            
                        <Site_data />
                        </div>

                        <div className='contact_info_main'>
                            <Customer_contact />

                        </div>
                    </div>

                    <div className='site_data_box'>
                        <Sitetable />


                        <div className='site_submit'>
                            <button type='submit' onClick={() => { setpagemove(false) }}>Save</button>
                        </div>
                    </div>



                </div> */}

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
                    <button onClick={()=>{Submit_customer_details_fn(Cust_save_btn,Cust_main_table_data,site_data,site_contact)}}><b>Submit</b></button>
                    <button><b>Create New</b></button>

                </div>

            </div>
            
        </div>
    )
}

export default Parent_table