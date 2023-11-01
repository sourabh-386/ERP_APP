import React, { useRef } from 'react'
import './Table.css'
import style from '../../Item_table_comp/Main_item_table/Main_item_table.module.css'
import { useState } from 'react'
import { useFormik } from 'formik'
import moment from 'moment/moment'
import down_img from '../../../assets/Images/down.png'
import * as Yup from 'yup'
import axios from 'axios'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table_context } from '../../../Context/Table_context/Table_context'
// import Sitetable from '../../Sub_component/Client_site/Sitetable'
import Date_fn from '../../../Helper_fn/Date_fn'
import Client_box from '../../../Sub_component/Admin_page/Client_box'

const Table = () => {

    const { Cust_save_btn, set_Cust_save_btn, Cust_main_table_data, set_Cust_main_table_data, disable_form } = useContext(Table_context)


    const [Cust_arrow, set_Cust_arrow] = useState(true)

    const arrow_set_fn = () => {

        if (Cust_save_btn) {
            Cust_arrow ? set_Cust_arrow(false) : set_Cust_arrow(true)
        }
        else {
            toast.error(<div className="error_box">Save Customer Details</div>)

        }
    }

    const [organisation_list, setorganisation_list] = useState([''])


    // formik start
    const valid = Yup.object({
        Customer_Name: Yup.string().min(2).max(40).required(),
        Tax_Registration: Yup.string().required(),
        Start_date: Yup.date().required(),
        Organisation: Yup.string().required()

    })

    const initialValues = {
        Customer_Name: '',
        Tax_Registration: '',
        Start_date: Date_fn(),
        Organisation: '',
        NDA_Signed: false,
        file: ''
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            // if (!disable_form) {

            //     if (value.NDA_Signed) {
            //         value.NDA_Signed = "Yes"
            //     }
            //     else {
            //         value.NDA_Signed = "No"
            //     }

            //     const formData = new FormData();

            //     for (let key in values) {
            //         if (key === 'file') {
            //             const files = values[key];

            //             for (let i = 0; i < files.length; i++) {
            //                 formData.append('file', files[i]);
            //             }
            //         } else {
            //             formData.append(key, values[key]);
            //         }
            //     }

            //     set_Cust_main_table_data(formData)

            //     set_Cust_save_btn(true)
            // }

            console.log(value)
            set_Cust_save_btn(true)

            const formData = new FormData();

            for (let key in values) {
                if (key === 'file') {
                    const files = values[key];

                    for (let i = 0; i < files.length; i++) {
                        formData.append('file', files[i]);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            }

            axios.post('http://localhost:3008/data/customer_data', formData)


        },



    })


    //fuction get organisation list
    const toggle_organisation_list = async () => {
        try {
            const response = await fetch("http://localhost:3008/Orgtype")

            const data = await response.json()

            setorganisation_list(data)
            console.log(data)

        } catch (error) {
            alert(error)

        }

        document.getElementById('org_list_toggle_id').classList.toggle('hide_country_list')

    }

    //function set org value 
    const table_toggle_org_list = (data) => {

        setFieldValue('Organisation', data.Name)
        document.getElementById('org_list_toggle_id').classList.toggle('hide_country_list')

    }

    //fuction get Customer profile list
    const toggle_Cust_profile_list = () => {
        console.log('list')
    }

    //validation fn
    const validation_fn = (e) => {
        e.stopPropagation()
        if (errors.Customer_Name) {
            toast.error(errors.Customer_Name)
        }
        else if (errors.Tax_Registration) {
            toast.error(errors.Tax_Registration)
        }
        else if (errors.Start_date) {
            toast.error(errors.Start_date)
        }
        else if (errors.Organisation) {
            toast.error(errors.Organisation)
        }
        else if (errors.file) {
            toast.error(errors.file)
        }
    }


    ////////
    const onchange_event_fn = (e) => {
        set_Cust_save_btn(false)
        handleChange(e)
    }

    return (
        <div className={style.main_item_table} >
            <div className='add_client_box' onClick={() => { arrow_set_fn() }}>
                <p class={Cust_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b>Customers</b>
                <div className='heading_underline'></div>
            </div>
            <form
                className={Cust_arrow ? style.form : style.form_vis}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <table className={style.table} width="100%">
                    <tr>
                        <td>
                            <label htmlFor=""><b>** Customer Name :</b></label>
                            <input
                                type="text"
                                name='Customer_Name'
                                className='client_input_fields'
                                value={values.Customer_Name}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            />
                        </td>

                        <td width="33%">
                            {/* <div className='List_of_values'>
                                <input
                                    type="text"
                                    name='Organisation'
                                    // className='client_input_fields'
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                    disabled={disable_form}
                                    value={values.Organisation}

                                />
                                <div className='arrow_down_box'>
                                    <img src={down_img} alt="img" id='arrow_down_img' onClick={() => { toggle_organisation_list() }} />

                                </div>
                                <div className='country_list' id='org_list_toggle_id' >
                                    <table>
                                        <tr>
                                            <th>Organisation Type</th>
                                        </tr>
                                        {
                                            organisation_list.map((data, index) => {
                                                return (
                                                    <tr key={index} onClick={() => table_toggle_org_list(data)} >
                                                        <td >{data.Name}</td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>

                                    <hr />
                                    <p className='client_list_search'><a href="#">Search</a></p>
                                </div>
                            </div> */}
                            {/* <label htmlFor="">** Organisation Type : </label> */}
                            <Client_box
                                onchange_event_fn={onchange_event_fn}
                                values={values.Organisation}
                                field_name={'Organisation'}
                                setFieldValue={setFieldValue}
                                api={`http://localhost:3008/LOV/organisation`}
                                input_lable={'Organisation'}
                                box_heading={'Search and Select: Organisation'}

                            />
                        </td>
                        <td>
                            <label htmlFor=""><b>** Tax Registration : </b></label>
                            <input
                                type="text"
                                name="Tax_Registration"
                                value={values.Tax_Registration}
                                className='client_input_fields'
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            /></td>
                    </tr>
                    <tr>
                        <td>
                            <label><b>** Start Date : </b></label>
                            <input
                                type="date"
                                name="Start_date"
                                className='client_input_fields'
                                value={values.Start_date}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                                disabled={disable_form}
                            /></td>
                        <td>
                            <div className='checkbox_input'>
                                <label><b>NDA Signed : </b></label><input
                                    type="checkbox"
                                    name='NDA_Signed'
                                    className='nda_signed_input'
                                    value={values.NDA_Signed}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                    disabled={disable_form}
                                />
                            </div></td>
                        <td>
                            <input
                                className='checkbox_input'
                                type="file"
                                name="file"
                                accept='image/*'
                                onChange={(e) => { setFieldValue('file', e.currentTarget.files) }}
                                multiple
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='6'>
                            <button onClick={(e) => { validation_fn(e) }} type='submit' className={Cust_save_btn ? style.btn : `${style.btn} ${style.btn_color}`}>Save</button>

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
export default Table