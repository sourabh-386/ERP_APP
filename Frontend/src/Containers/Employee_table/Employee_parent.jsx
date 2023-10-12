import React from 'react'
import Employee_hr from '../../Component/Employee_table_comp/Employee_hr/Employee_hr'
import Employee_emp from '../../Component/Employee_table_comp/Employee_emp/Employee_emp'
import { Submit_emp_details_fn } from '../../Helper_fn/Submit_emp_detail'
import { useContext } from 'react'
import { Emp_Table_context } from '../../Context/Employee_table_context/Employee_table_context'
const Employee_parent = () => {
    const{emp_table,Emp_save_btn,emp_hr_table_data} =useContext(Emp_Table_context)
    return (
        <div className='outer_item_div'>
            <div className='main_item_table_box'>
                <Employee_hr />
            </div>
            <div className='main_item_table_box'>
                <Employee_emp />
            </div>
            <div className='Item_table_btns'>
                <button onClick={() => { Submit_emp_details_fn(Emp_save_btn, emp_table,emp_hr_table_data) }}><b>Submit</b></button>
                <button><b>Create New</b></button>

            </div>
        </div>
    )
}

export default Employee_parent