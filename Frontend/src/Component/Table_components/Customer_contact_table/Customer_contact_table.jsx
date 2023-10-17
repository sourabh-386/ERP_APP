import React from 'react'
import './Customer_contact_table.css'
import style from '../../Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { useFormik } from 'formik'
import { Table_context } from '../../../Context/Table_context/Table_context'
import { useContext } from 'react'
import { useState } from 'react'
import { findDuplicates_cintact } from '../../../Helper_fn/Submit_customer_details'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Customer_contact_table = ({ data, index,site_data }) => {


    const {site_contact,set_site_contact,setState } = useContext(Table_context)

    //disable enable  input value change
    const [disabled, set_disabled] = useState(true)

    //changing data of contact
    const onchange_data_fn= (data, e) => {

        let value = e.target.value
        // console.log(e.target.name, e.target.value)
        site_contact.splice(site_contact.findIndex((sub) => { return (sub.id === data.id) }), 1, { ...data, [e.target.name]: value })
        // console.log(sub_segment)
        setState(prev => !prev)

    }

      //delete segment fn
      const delete_contact = (data) => {
        // console.log(data.id)
        set_site_contact(
            site_contact.filter((value) => {
                return (value.id !== data.id)
            })
        )
    }

       //segment_edit_save_fn

       const sub_segment_edit_save_fn = () => {
        if (disabled) {
            set_disabled(!disabled)
        }
        else {
            const dublicate_segment = findDuplicates_cintact(site_contact)
            if (dublicate_segment.length == 0) {
                set_disabled(!disabled)
            }
            else {
                toast.error(<div className="error_box" >This contact already exist</div>)

            }
            // set_disabled(!disabled)

        }

    }



    return (
        <tr key={index+1}>
            <td>{index + 1}</td>
            <td>
                <select
                    className={style.input_box}
                    onChange={(e)=>{onchange_data_fn(data,e)}}
                    disabled={disabled}
                    name='site'
                    value={data.site}
                >
                    
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
                    onChange={(e)=>{onchange_data_fn(data,e)}}
                    disabled={disabled}
                    value={data.name}
                />
            </td>
            <td>
                <input
                    type="number"
                    name='phone'
                    className={style.input_box}
                    onChange={(e)=>{onchange_data_fn(data,e)}}
                    disabled={disabled}
                    value={data.phone}
                />
            </td>
            <td>
                <input
                    type="email"
                    name='email'
                    className={style.input_box}
                    onChange={(e)=>{onchange_data_fn(data,e)}}
                    disabled={disabled}
                    value={data.email}
                />
            </td>
            <td>
                <input
                    type="text"
                    name='designation'
                    className={style.input_box}
                    onChange={(e)=>{onchange_data_fn(data,e)}}
                    disabled={disabled}
                    value={data.designation}
                />
            </td>
            <td>
            <p className={disabled ? 'site_edit_btn' : 'add_btn'} onClick={() => { sub_segment_edit_save_fn() }}><b>{disabled ? 'Edit..' : 'Save'}</b></p>
            
            </td>
            <td>
            <p className='del_btn' onClick={() => { delete_contact(data) }}><b>Delete</b></p></td>

        </tr>


    )
}

export default Customer_contact_table