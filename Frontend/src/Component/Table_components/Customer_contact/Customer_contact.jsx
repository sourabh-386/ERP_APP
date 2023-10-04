import React, { useState } from 'react'
import { useEffect } from 'react'
import './Customer_contact.css'
import { useContext } from 'react'
import { Table_context } from '../../../Context/Table_context/Table_context'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import Customer_contact_table from '../Customer_contact_table/Customer_contact_table'
// import Customer_contact_table from '../Customer_contact_table/Customer_contact_table'
const Customer_contact = () => {

    const { site_data, set_contact, contact, con_editdata, add_edit_contact_data } = useContext(Table_context)

    const [contact_vis, set_contact_vis] = useState(false)

    const contact_vis_fn = () => {
        contact_vis ? set_contact_vis(false) : set_contact_vis(true)
    }


    const initialValues = {
        id: '',
        site: '',
        name: '',
        phone: '',
        email: '',
        designation: '',
        Site_id:''
    }

    useEffect(() => {
        if (con_editdata !== null) {
            setFieldValue('site', con_editdata.site)
            setFieldValue('name', con_editdata.name)
            setFieldValue('phone', con_editdata.phone)
            setFieldValue('email', con_editdata.email)
            setFieldValue('designation', con_editdata.designation)
        }
    }, [con_editdata])

    const valid = Yup.object({
        // site: Yup.string().required(),
        name: Yup.string().min(2).max(40).required(),
        phone: Yup.number().required(),
        email: Yup.string().email().required(),
        designation: Yup.string().min(2).max(50).required(),
    })

    const { values, errors, touched, handleBlur, resetForm, handleChange, handleSubmit, setFieldValue } = useFormik({

        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime()

           const sample= site_data.filter((data) => {
                return (data.Site_Name === value.site)
            })
           const cust_site_id= sample[0].id
           console.log(cust_site_id)

            if (con_editdata !== null) {
                add_edit_contact_data({ ...value, id: con_editdata.id,Site_id:cust_site_id })
            }
            else {
                set_contact([...contact, { ...value, id: time,Site_id:cust_site_id }])
                // console.log(contact)
            }


            // resetForm()

        }

    });

    //validation fn
    const validation_fn_con = (e) => {
        e.stopPropagation()
        if (errors.name) {
            toast.error(errors.name)
        }
        if (errors.site) {
            toast.error(errors.site)
        }
        else if (errors.phone) {
            toast.error(errors.phone)
        }
        else if (errors.email) {
            toast.error(errors.email)
        }
        else if (errors.designation) {
            toast.error(errors.designation)
        }
    }


    return (
        <div className='customer_contact'>
            <div className='add_client_box' onClick={() => { contact_vis_fn() }} >
                <p class={contact_vis ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b > Contact</b>
                <div className='heading_underline'></div>
            </div>

            <div className={contact_vis ? 'main_customer_detail_table' : 'main_customer_detail_table_hide'}>
                <div className='main_customer_detail_table_inside'>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <thead>
                                <tr className='contact_dis_grid'>
                                    <th><label>S.no</label></th>
                                    <th><label>** Site</label></th>
                                    <th><label>** Person Name</label></th>
                                    <th><label>** Phone</label></th>
                                    <th><label>** E-mail</label></th>
                                    <th><label>** Designation</label></th>
                                    <th><label>Edit</label></th>
                                    <th><label>Delete</label></th>
                                </tr>
                            </thead>
                            <tr lassName='contact_dis_grid'>
                                <td>--</td>
                                <td>
                                    <select
                                        className='contact_inp_field_select'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name='site'
                                        value={values.site}
                                    >
                                        <option value="null">Select</option>
                                        {
                                            site_data.map((data, index) => {
                                                return (
                                                    <option key={index} value={data.Site_Name}>{data.Site_Name}</option>

                                                )
                                            })
                                        }
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name='name'
                                        className='contact_inp_field'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name='phone'
                                        className='contact_inp_field'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        name='email'
                                        className='contact_inp_field'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name='designation'
                                        className='contact_inp_field'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.designation}
                                    />
                                </td>
                                <td>
                                    {
                                        con_editdata !== null ?
                                            <button type='submit' onClick={(e) => { validation_fn_con(e) }}><b>Edit...</b></button>
                                            :
                                            <button type='submit' onClick={(e) => { validation_fn_con(e) }}><b>Save</b></button>
                                    }
                                </td>
                                <td>

                                </td>
                            </tr>
                            <Customer_contact_table />

                        </table>
                    </form>
                </div>



            </div>
        </div>
    )
}

export default Customer_contact