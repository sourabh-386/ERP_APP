import React, { useState } from 'react'
import style from '../../Component/Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { useContext } from 'react'
import { Emp_Table_context } from '../../Context/Employee_table_context/Employee_table_context'


const Employee_emp_data = ({ data, index }) => {

    const { emp_table, set_emp_table, setState } = useContext(Emp_Table_context)

    //changing data of emp 
    const onchange_data_fn = (data, e) => {

        let value = e.target.value
        emp_table.splice(emp_table.findIndex((sub) => { return (sub.id === data.id) }), 1, { ...data, [e.target.name]: value })

        setState(prev => !prev)
        // console.log(demostate)
    }

    //delete segment fn
    const delete_emp = (data) => {
        set_emp_table(
            emp_table.filter((value) => {
                return (value.id != data.id)
            })
        )
    }


    //employe edit data fn

    const [disabled, set_disabled] = useState(true)
    const emp_edit_save_fn = () => {

        console.log('edit working')

        set_disabled(!disabled)


    }

    return (
        <tr >
            <td>{index + 1}</td>
            <td>
                <input
                    type="text"
                    name='Super_Visor'
                    className={style.input_box}
                    value={data.Super_Visor}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='Role'
                    className={style.input_box}
                    value={data.Role}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='Tech_Assign'
                    className={style.input_box}
                    value={data.Tech_Assign}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                />
            </td>
            <td>
                <input
                    type="text"
                    name='Gender'
                    className={style.input_box}
                    value={data.Gender}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='Grade'
                    className={style.input_box}
                    value={data.Grade}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                />
            </td>


            <td>
                <select
                    name="Active"
                    value={data.Active}
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(e) }}
                    disabled={disabled}

                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

                    

                </select>
            </td>
            <td>
                <input
                    type="date"
                    name='Start_date'
                    className={style.input_box}
                    value={data.Start_date}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                />
            </td>
            <td><p className='site_edit_btn' onClick={() => { emp_edit_save_fn() }}><b>{disabled ? "Edit.." : 'Save'}</b></p></td>
            <td><p className='del_btn' onClick={() => { delete_emp(data) }}><b>Delete</b></p></td>
        </tr>

    )
}

export default Employee_emp_data