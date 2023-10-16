import React, { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Emp_Table_context = createContext(null)

const Emp_Table_context_provider = ({ children }) => {

    // for item data 
    const [Emp_save_btn, set_Emp_save_btn] = useState(false)
    const [emp_hr_table_data, set_emp_hr_table_data] = useState([])

    //for segment data 
    const [emp_table, set_emp_table] = useState([])

    //auto relode state 
    const [demostate, setState] = useState(false)


    // auto open aemp details one time
    const [emp,set_emp]=useState(false)
    
    const passing = {
        Emp_save_btn, set_Emp_save_btn,
        emp_hr_table_data, set_emp_hr_table_data,
        emp_table, set_emp_table,
        demostate,setState,
        emp,set_emp
    }

    return (
        <Emp_Table_context.Provider value={passing}>{children}</Emp_Table_context.Provider>
    )
}

export { Emp_Table_context, Emp_Table_context_provider };
