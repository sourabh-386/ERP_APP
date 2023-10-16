import React, { useRef } from 'react'
import './Table.css'
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

const Table = () => {

    const { pagemove, setpagemove, submit_btn, site_data, Customer_data, set_customer_data, set_submit_btn, set_site_arrow } = useContext(Table_context)
    const [organisation_list, setorganisation_list] = useState([''])
    // console.log(submit_btn)
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
        NDA_Signed: false
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            if (value.NDA_Signed) {
                value.NDA_Signed = "Yes"
            }
            else {
                value.NDA_Signed = "No"
            }


            console.log(value)

            set_customer_data(value)

            set_site_arrow(true)

            set_submit_btn(true)

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
    }


    ////////
    const onchange_event_fn = (e) => {
        set_submit_btn(false)
        handleChange(e)
    }

    return (
        <div className='table_main' >


            <div className='add_client_box'>
                <p class='bi bi-caret-right-fill'></p>
                <b>Customers</b>
                <div className='heading_underline'></div>
            </div>
            <form className='table_input' onSubmit={handleSubmit}>


                <table className='main_input_table'>
                    <tr>
                        <td><label htmlFor="">** Customer Name :</label></td>
                        <td>
                            <input
                                type="text"
                                name='Customer_Name'
                                className='client_input_fields'
                                value={values.Customer_Name}
                                onChange={(e) => { onchange_event_fn(e) }}
                                onBlur={handleBlur}
                            />
                        </td>
                        <td>
                            <label htmlFor="">** Organisation Type : </label>
                        </td>
                        <td>
                            <div className='List_of_values'>
                                <input
                                    type="text"
                                    name='Organisation'
                                    // className='client_input_fields'
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
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
                            </div>
                        </td>
                        <td><label htmlFor="">** Tax Registration : </label></td>
                        <td><input
                            type="text"
                            name="Tax_Registration"
                            value={values.Tax_Registration}
                            className='client_input_fields'
                            onChange={(e) => { onchange_event_fn(e) }}
                            onBlur={handleBlur}
                        /></td>
                    </tr>
                    <tr>
                        <td><label>** Start Date : </label></td>
                        <td><input
                            type="date"
                            name="Start_date"
                            className='startdate_input'
                            value={values.Start_date}
                            onChange={(e) => { onchange_event_fn(e) }}
                            onBlur={handleBlur}
                        /></td>
                        <td>
                            <div className='checkbox_input'>
                                <label>NDA Signed : </label><input
                                    type="checkbox"
                                    name='NDA_Signed'
                                    className='nda_signed_input'
                                    value={values.NDA_Signed}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}


                                />
                            </div></td>
                        <td></td>
                    </tr>
                </table>

                <br />
                <div className='Table_save_btn'>
                    <button className={submit_btn ? 'Table_save_btn_btn' : 'Table_save_btn_btn Table_save_btn_btn_color'} type='submit' onClick={(e) => { validation_fn(e) }}><b>Save</b></button>
                </div>
            </form>

        </div>
    )
}
export default Table