import React, { useState } from 'react'
import { useEffect } from 'react'
import style from '../../Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import './Customer_contact.css'
import { useContext } from 'react'
import { Table_context } from '../../../Context/Table_context/Table_context'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import Customer_contact_table from '../Customer_contact_table/Customer_contact_table'
// import { useState } from 'react'
// import Customer_contact_table from '../Customer_contact_table/Customer_contact_table'
// import Customer_contact_table from '../Customer_contact_table/Customer_contact_table'
const Customer_contact = () => {

    const { site_contact,setState ,set_site_contact, site_data, Cust_save_btn,disable_form } = useContext(Table_context)

    const [contact_vis, set_contact_vis] = useState(false)

    const contact_vis_fn = () => {
        if (!disable_form) {

        if (Cust_save_btn) {
            if (site_data.length !== 0) {
                set_contact_vis(!contact_vis)
            }
            else {
                toast.error(<div className='error_box'>Add atleast one site</div>)
            }
        }
        else {
            toast.error(<div className='error_box'>Save Customer Details</div>)

        }
    }

    }


    const initialValues = {
        id: '',
        site: '',
        name: '',
        phone: '',
        email: '',
        designation: '',
        Site_id: ''
    }

    // useEffect(() => {
    //     if (con_editdata !== null) {
    //         setFieldValue('site', con_editdata.site)
    //         setFieldValue('name', con_editdata.name)
    //         setFieldValue('phone', con_editdata.phone)
    //         setFieldValue('email', con_editdata.email)
    //         setFieldValue('designation', con_editdata.designation)
    //     }
    // }, [con_editdata])

    const valid = Yup.object({
        site: Yup.string().required(),
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

            const sample = site_data.filter((data) => {
                return (data.Site_Name === value.site)
            })
            const cust_site_id = sample[0].id
            console.log(cust_site_id)


            set_site_contact([...site_contact, { ...value, id: time, Site_id: cust_site_id }])


            console.log(site_contact)
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

     ///disable form
     useEffect(() => {

        disable_form ? set_contact_vis(false) : ''
    }, [disable_form])


    return (
        <div className={style.main_item_table}>
            <div className='add_client_box' onClick={() => { contact_vis_fn() }} >
                <p class={contact_vis ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b > Contact</b>
                <div className='heading_underline'></div>
            </div>
            <br />

            <div className={contact_vis ? style.form : style.form_hid}>

                <form onSubmit={handleSubmit}>
                    <table className='style.table'>

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
                        
                        {
                            site_contact.map((data, index) => {
                                return (
                                    <Customer_contact_table key={index} data={data} index={index} site_data={site_data} setState={setState}/>
                                )
                            })
                        }

                        <tr >
                            <td>{site_contact.length+1}</td>
                            <td>
                                <select
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='site'
                                    value={values.site}
                                >
                                    <option key='default' value='' defaultValue='' >Select</option>
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
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name='phone'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    name='email'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='designation'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.designation}
                                />
                            </td>
                            <td>
                                <button className='add_btn' type='submit' onClick={(e) => { validation_fn_con(e) }}>+ADD</button>
                            </td>
                            <td>

                            </td>
                        </tr>
                        

                    </table>
                </form>



            </div>
        </div>
    )
}

export default Customer_contact