import React from 'react'
import style from './Main_item_table.module.css'
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Item_Table_context } from '../../../Context/Item_table_context/Item_table_context';
import Date_fn from '../../../Helper_fn/Date_fn';
const Main_item_table = () => {

    const { Item_save_btn, set_Item_save_btn,set_item_main_table_data,disable_form} = useContext(Item_Table_context)

    //change item_form_vis //setup arrow img
    const [item_arrow, set_item_arrow] = useState(true)

    const arrow_set_fn = () => {

        if (Item_save_btn) {
            item_arrow ? set_item_arrow(false) : set_item_arrow(true)
        }
        else {
            toast.error(<div className="error_box">Save Tech Details</div>)

        }
    }

    //formik yup start

    const initialValues = {
        Tech_Name: '',
        Rating: '',
        Start_date: Date_fn(),
        Description: ''
    }
    const valid = Yup.object({
        Tech_Name: Yup.string().min(2).max(40).required(),
        Rating: Yup.number().max(10).required(),
        Start_date: Yup.date().required(),
        Description: Yup.string().required()
    })



    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            if(!disable_form){

            set_item_main_table_data(value)
            set_Item_save_btn(true)
            // Set_segment_vis(true)
            }
        },
    })

    //validation fn show error
    const validation_fn = (e) => {


        e.stopPropagation()
        if (errors.Tech_Name) {
            toast.error(<div className="error_box">{errors.Tech_Name}</div>)
        }
        else if (errors.Rating) {
            toast.error(<div className="error_box">{errors.Rating}</div>)
        }
        else if (errors.Start_date) {
            toast.error(<div className="error_box">{errors.Start_date}</div>)
        }
        else if (errors.Description) {
            toast.error(<div className="error_box">{errors.Description}</div>)
        }
    }

    // trigerr when input change 
    const onchange_event_fn = (e) => {
        set_Item_save_btn(false)
        handleChange(e)
    }

    return (
        <div className={style.main_item_table}>
            <div className='add_client_box' onClick={() => { arrow_set_fn() }}>
                <p class={item_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b>Tech Details</b>
                <div className='heading_underline'>

                </div>
            </div>
            <form className={item_arrow ? style.form : style.form_vis} onSubmit={handleSubmit}>
                <table className={style.table}>
                    <tr >
                        <td><label htmlFor="">** Tech Name :</label></td>
                        <td>
                            <input
                                type="text"
                                name='Tech_Name'
                                className='client_input_fields'
                                value={values.Tech_Name}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>
                        <td><label htmlFor="">** Rating :</label></td>
                        <td>
                            <select
                                name="Rating"
                                value={values.Rating}
                                className='client_input_fields'
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}

                            >
                                <option value="" defaultValue='' key='default'>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>

                            </select>
                            {/* <input
                                type="number"
                                name='Rating'
                                className='client_input_fields'
                                value={values.Rating}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            /> */}
                        </td>
                        <td><label htmlFor="">** Start Date :</label></td>
                        <td>
                            <input
                                type="date"
                                name='Start_date'
                                className='startdate_input'
                                value={values.Start_date}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="">** Description :</label></td>
                        <td colSpan='5' >
                            <input
                                type="text"
                                name='Description'
                                className={style.discription}
                                value={values.Description}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>
                    </tr>
                    <tr >
                        <td colSpan='6'>

                            <button onClick={(e) => { validation_fn(e) }} type='submit' className={Item_save_btn ? style.btn : `${style.btn} ${style.btn_color}`}><b>Save</b></button>
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

                </table>
            </form>

        </div>
    )
}

export default Main_item_table