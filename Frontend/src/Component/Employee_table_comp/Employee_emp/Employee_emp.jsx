import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import style from './Employee_emp.module.css'
import { Emp_Table_context } from '../../../Context/Employee_table_context/Employee_table_context';
import { useContext } from 'react';
import { useState } from 'react';
import Employee_emp_data from '../../../Sub_component/Employee_emp/Employee_emp_data';
import { useEffect } from 'react';
const Employee_emp = () => {

    //setup arrow img
    const { Emp_save_btn, emp_hr_table_data, set_emp_hr_table_data,emp_table,set_emp_table,emp} = useContext(Emp_Table_context)
    const [emp_arrow, set_emp_arrow] = useState(false)


    //togel form only one time when hr save data 
    useEffect(() => { 
      emp?set_emp_arrow(true):set_emp_arrow(false)
    }, [emp])
    


    //togel form
    const employee_emp_vis_fn = () => {
        if (Emp_save_btn) {
            emp_arrow ? set_emp_arrow(false) : set_emp_arrow(true)
        }
        else {
            toast.error(<div className='error_box'>Save Employee Details</div>)

        }
    }

    //formik
    const initialValues = {
        Super_Visor: '',
        Role: '',
        Tech_Assign: '',
        Gender: '',
        Grade: '',
        Active: '',
        Start_date: new Date(),
        id: ''
    }
    const valid = Yup.object({
        Super_Visor: Yup.string().min(2).max(40).required(),
        Role: Yup.string().min(2).max(40).required(),
        EMP_Middle_Name: Yup.string().min(2).max(40),
        Tech_Assign: Yup.string().min(2).max(40).required(),
        Gender: Yup.string().min(2).max(40).required(),
        Grade: Yup.string().min(2).max(40).required(),
        Active: Yup.string().required()
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {
            const unique_id = new Date().getTime()
            set_emp_table([...emp_table, { ...value, id: unique_id }])
            resetForm()
        },
    })

    const validation_fn = (e) => {
        e.stopPropagation()
        if (errors.Super_Visor) {
            toast.error(<div className="error_box">{errors.Super_Visor}</div>)
        }
        else if (errors.Role) {
            toast.error(<div className="error_box">{errors.Role}</div>)
        }
        else if (errors.Tech_Assign) {
            toast.error(<div className="error_box">{errors.Tech_Assign}</div>)
        }
        else if (errors.Gender) {
            toast.error(<div className="error_box">{errors.Gender}</div>)
        }
        else if (errors.Grade) {
            toast.error(<div className="error_box">{errors.Grade}</div>)
        }
        else if (errors.Active) {
            toast.error(<div className="error_box">{errors.Active}</div>)
        }
    }

    // trigerr when input change 
    const onchange_event_fn = (e) => {
        // set_Emp_save_btn(false)
        handleChange(e)
    }

    return (
        <div className={style.main_item_table}>
            <div className='add_client_box' onClick={() => { employee_emp_vis_fn() }}>
                <p class={emp_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b>Assign Details</b>
                <div className='heading_underline'>
                </div>
            </div>
            <br />
            <form className={emp_arrow ? style.form : style.form_hid} onSubmit={handleSubmit}>
                <table className={style.table}>
                    <tr>
                        <td><label>S.no</label></td>
                        <td><label>** Super Visor</label></td>
                        <td><label>** Role</label></td>
                        <td><label>** Tech Assign</label></td>
                        <td><label>** Gender </label></td>
                        <td><label>** Grade</label></td>
                        <td><label>Active</label></td>
                        <td><label>** Start date</label></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                        emp_table.map((data, index) => {
                            return (
                                <Employee_emp_data data={data} index={index} key={index} />
                            )
                        })

                    }
                    <tr >
                        <td>{emp_table.length+1}</td>
                        <td>
                            <input
                                type="text"
                                name='Super_Visor'
                                className={style.input_box}
                                value={values.Super_Visor}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}


                            />
                        </td>

                        <td>
                            <input
                                type="text"
                                name='Role'
                                className={style.input_box}
                                value={values.Role}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                            />
                        </td>

                        <td>
                            <input
                                type="text"
                                name='Tech_Assign'
                                className={style.input_box}
                                value={values.Tech_Assign}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name='Gender'
                                className={style.input_box}
                                value={values.Gender}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                            />
                        </td>

                        <td>
                            <input
                                type="text"
                                name='Grade'
                                className={style.input_box}
                                value={values.Grade}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                            />
                        </td>


                        <td>

                        <select
                                name="Active"
                                value={values.Active}
                                className={style.input_box}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}

                            >
                                <option value="" defaultValue='' key='default'>Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>

                            </select>
              
                        </td>
                        <td>
                            <input
                                type="date"
                                name='Start_date'
                                className={style.input_box}
                                value={values.Start_date}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                            />
                        </td>
                        <td ><button type='submit' className='add_btn' onClick={(e) => { validation_fn(e) }}><b>+ADD</b></button></td>
                        <td></td>
                    </tr>
                    <tr>

                    </tr>

                </table>
            </form>
        </div>
    )
}

export default Employee_emp