import React from 'react'
import { useState } from 'react'
import style from '../../Item_table_comp/Main_item_table/Main_item_table.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Emp_Table_context } from '../../../Context/Employee_table_context/Employee_table_context'
import { useContext } from 'react'
import Date_fn from '../../../Helper_fn/Date_fn'
import Client_box from '../../../Sub_component/Admin_page/Client_box'
const Employee_hr = () => {

    const { Emp_save_btn, set_Emp_save_btn, emp_hr_table_data, set_emp_hr_table_data, emp, set_emp, disable_form } = useContext(Emp_Table_context)
    //change item_form_vis //setup arrow img
    const [item_arrow, set_item_arrow] = useState(true)

    const arrow_set_fn = () => {

        if (Emp_save_btn) {
            item_arrow ? set_item_arrow(false) : set_item_arrow(true)
        }
        else {
            toast.error(<div className="error_box">Save Tech Details</div>)

        }
    }



    //formik
    const initialValues = {
        EMP_First_Name: '',
        EMP_Last_Name: '',
        EMP_Middle_Name: '',
        Title: '',
        Gender: '',
        Grade: '',
        Start_date: Date_fn(),
        Active: ''
    }
    const valid = Yup.object({
        EMP_First_Name: Yup.string().notOneOf([" ", "  ", "   ", "    ", "     ", "      "], "First Name must not consist of spaces only").min(2).max(40).required('First name is required field'),
        EMP_Last_Name: Yup.string().notOneOf([" ", "  ", "   ", "    ", "     ", "      "], "Last Name must not consist of spaces only").min(2).max(40),
        EMP_Middle_Name: Yup.string().notOneOf([" ", "  ", "   ", "    ", "     ", "      "], "Middle Name must not consist of spaces only").min(2).max(40),
        Title: Yup.string().notOneOf([" ", "  ", "   ", "    ", "     ", "      "], "Title must not consist of spaces only").min(2).max(40).required('Title is required field'),
        Gender: Yup.string().min(2).max(40).required('Gender is required field'),
        Grade: Yup.string().notOneOf([" ", "  ", "   ", "    ", "     ", "      "], "Grade must not consist of spaces only").min(2).max(40).required('Grade is required field'),
        Start_date: Yup.date().required(),
        Active: Yup.string().required()

    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            if (!disable_form) {
                set_emp_hr_table_data(value)
                set_Emp_save_btn(true)
                // console.log(emp_hr_table_data)
                set_emp(true)
                // resetForm()
            }

        },
    })

    //validation fn show error
    const validation_fn = (e) => {


        e.stopPropagation()
        if (errors.EMP_First_Name) {
            toast.error(<div className="error_box">{errors.EMP_First_Name}</div>)
        }
        else if (errors.EMP_Last_Name) {
            toast.error(<div className="error_box">{errors.EMP_Last_Name}</div>)
        }
        else if (errors.Title) {
            toast.error(<div className="error_box">{errors.Title}</div>)
        }
        else if (errors.Gender) {
            toast.error(<div className="error_box">{errors.Gender}</div>)
        }
        else if (errors.Grade) {
            toast.error(<div className="error_box">{errors.Grade}</div>)
        }
        else if (errors.Start_date) {
            toast.error(<div className="error_box">{errors.Start_date}</div>)
        }
        else if (errors.Active) {
            toast.error(<div className="error_box">{errors.Active}</div>)
        }
    }



    // trigerr when input change 
    const onchange_event_fn = (e) => {
        set_Emp_save_btn(false)
        handleChange(e)
        set_emp(false)
    }

    return (
        <div className={style.main_item_table}>
            <div className='add_client_box' onClick={() => { arrow_set_fn() }}>
                <p class={item_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b>Employee Details</b>
                <div className='heading_underline'>

                </div>
            </div>
            <form className={item_arrow ? style.form : style.form_vis} onSubmit={handleSubmit}>
                <table className={style.table}>
                    <tr >
                        <td>
                            <label htmlFor=""><b>** First Name :</b></label>

                            <input
                                type="text"
                                name='EMP_First_Name'
                                className='client_input_fields'
                                value={values.EMP_First_Name}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}


                            />
                        </td>

                        {/* <td><label htmlFor="">Middle Name :</label></td> */}
                        <td>
                            <label htmlFor=""><b>Middle Name :</b></label>

                            <input
                                type="text"
                                name='EMP_Middle_Name'
                                className='client_input_fields'
                                value={values.EMP_Middle_Name}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>

                        {/* <td><label htmlFor="">Last Name :</label></td> */}
                        <td>
                            <label htmlFor=""><b>** Last Name :</b></label>

                            <input
                                type="text"
                                name='EMP_Last_Name'
                                className='client_input_fields'
                                value={values.EMP_Last_Name}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>
                    </tr>

                    <tr >
                        {/* <td><label htmlFor="">** Title :</label></td> */}
                        {/* <td>
                            <input
                                type="text"
                                name='Title'
                                className='client_input_fields'
                                value={values.Title}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td> */}
                        <td>
                        <Client_box
                            onchange_event_fn={onchange_event_fn}
                            values={values.Title}
                            field_name={'Title'}
                            setFieldValue={setFieldValue}
                            api={`http://localhost:3008/LOV/empTitle`}
                            input_lable={'Title'}
                            box_heading={'Search and Select: Emp Details'}

                        />
                        </td>

                        <td>
                            <label htmlFor=""><b>** Gender :</b></label>

                            <select
                                className='client_input_fields'
                                value={values.Gender}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                                name="Gender" >
                                <option value="" defaultValue='' key='default'>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>

                            </select>

                        </td>

                        <td>
                            <label htmlFor=""><b>** Grade :</b></label>

                            <input
                                type="text"
                                name='Grade'
                                className='client_input_fields'
                                value={values.Grade}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label htmlFor=""><b>** Start Date :</b></label>

                            <input
                                type="date"
                                name="Start_date"
                                className='client_input_fields'
                                // value={date.toLocaleDateString('en-CA')}
                                value={values.Start_date}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            /></td>
                        
                        <td>
                        <label htmlFor=""><b>** Active :</b></label>

                            <select
                                name="Active"
                                value={values.Active}
                                className='client_input_fields'
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}

                            >
                                <option value="" defaultValue='' key='default'>Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr >
                        <td colSpan='6'>

                            <button type='submit' className={Emp_save_btn ? style.btn : `${style.btn} ${style.btn_color}`} onClick={(e) => { validation_fn(e) }} ><b>Save</b></button>
                            <ToastContainer
                                autoClose={1500}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            // theme="colord"
                            />

                        </td>
                    </tr>
                    <tr>

                    </tr>

                </table>
            </form>
        </div>
    )
}

export default Employee_hr