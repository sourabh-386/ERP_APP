import React, { useState } from 'react'
import './Customer_contact.css'
import Customer_contact_table from '../Customer_contact_table/Customer_contact_table'
const Customer_contact = () => {

    const [click_counter, set_click_counter] = useState(0)

    //function rendor table 
    const rendor_contact_form = () => {
        set_click_counter(click_counter++)

    }

    const customer_contact_data = () => {
    }
   

    return (
        <div className='customer_contact'>
            <div className='add_client_box' onClick={() => { customer_contact_data() }} >
                <p class='bi bi-caret-right-fill'></p>
                <h3> Contact</h3>
            </div>

            <div className='main_customer_detail_table'>
                <form>
                    <Customer_contact_table />
                </form>
            </div>
            <button onClick={() => { rendor_contact_form() }}>
                click
            </button>
        </div>
    )
}

export default Customer_contact