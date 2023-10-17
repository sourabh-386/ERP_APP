import React, { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table_context = createContext(null)



const Table_context_provider = ({ children }) => {

    // for item data 
    const [Cust_save_btn, set_Cust_save_btn] = useState(false)
    const [Cust_main_table_data, set_Cust_main_table_data] = useState([])

    //for segment data 
    const [site_data, set_site_data] = useState([])

    //save sub  Segment_data
    const [site_contact, set_site_contact] = useState([])

    //auto relode state 
    const [demostate, setState] = useState(false)

    // disable changes on submit
    const[disable_form,set_disable_form]=useState(false)


    const passing = {
        Cust_save_btn, set_Cust_save_btn,
        Cust_main_table_data, set_Cust_main_table_data,
        site_data, set_site_data,
        site_contact, set_site_contact,
        demostate, setState,
        disable_form,set_disable_form
    }





    return (
        <Table_context.Provider value={passing}>{children}</Table_context.Provider>
    )
}

export { Table_context, Table_context_provider };