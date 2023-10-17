import React from 'react'
import './Site_data.css'
import style from '../../Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { Table_context } from '../../../Context/Table_context/Table_context'
import { useContext } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findDuplicates_site } from '../../../Helper_fn/Submit_customer_details'
import Site_data_data from '../../../Sub_component/Site_data_data/Site_data_data'
const Site_data = ({ data, index }) => {

    const {setState,site_data,set_site_data,site_contact,set_site_contact} = useContext(Table_context)

    //disable enable  input value change
    const [disabled, set_disabled] = useState(true)


    //changing data of site
    const onchange_data_fn = (data, e) => {

        let value = e.target.value
        site_data.splice(site_data.findIndex((sub) => { return (sub.id === data.id) }), 1, { ...data, [e.target.name]: value })

        setState(prev => !prev)
        // console.log(demostate)
    }

    //delete site
    const delete_site = (data) => {

        const filterd_data = site_data.filter((value) => {
            return (value.id == data.id)
        })

        set_site_data(
            site_data.filter((value) => {
                return (value.id != data.id)
            })
        )

        set_site_contact(
            site_contact.filter((value) => {
                return (value.Site_id != filterd_data[0].id)
            })
        )
    }

    const segment_edit_save_fn = () => {

        if (disabled) {
            set_disabled(!disabled)
        } else {

            const filterd_data = site_data.filter((value) => {
                return (value.id == data.id)
            })

            set_site_contact(
                site_contact.filter((value) => {
                    return (value.Site_id != filterd_data[0].id)
                })
            )


            const dublicate_segment = findDuplicates_site(site_data)
            if (dublicate_segment.length == 0) {
                set_disabled(!disabled)
            }
            else {
                toast.error(<div className="error_box">Site already exist</div>)

            }


        }

    }
    return (
        <tr>
            <td>{index+1}</td>
            <td>
                <input
                    type="text"
                    name='Site_Name'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Site_Name}
                // ref={country_value}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='Address1'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Address1}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='Address2'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Address2}
                />
            </td>


            <td>
                <input
                    type="text"
                    name='Address3'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Address3}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='Address4'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Address4}
                />
            </td>

            <td>
                {/* <div className={style.input_box}> */}
                <input
                    type="text"
                    name='Country'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Country}
                // ref={country_value}
                />
                {/* <img src={down_img} alt="img" id='arrow_down_img' onClick={() => { toggle_country_list() }} />
                <div className='country_list' id='country_list_toggle_id' >
                    <table>
                        <tr>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                        </tr>
                        {
                            country_list.map((data, index) => {
                                return (
                                    <tr onClick={() => table_toggle_country_list(data)} key={index}>
                                        <td >{data.Country}</td>
                                        <td >{data.State_name}</td>
                                        <td >{data.City}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>

                    <hr />
                    <p className='client_list_search' onClick={() => search_onclick_fn()}><a href="#">Search</a></p>
                </div> */}
                {/* </div> */}
            </td>


            <td>
                <input
                    type="text"
                    name='State'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.State}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='City'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.City}
                />
            </td>

            <td>
                <input
                    type="text"
                    name='PIN_Code'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.PIN_Code}
                />
            </td>


            <td>

                <input
                    type="date"
                    name='Start_date'
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    disabled={disabled}
                    value={data.Start_date}
                />

            </td>
            <td><p className={disabled ? 'site_edit_btn' : 'add_btn'} onClick={() => { segment_edit_save_fn() }}><b>{disabled ? 'Edit..' : 'Save'}</b></p></td>
            <td><p className='del_btn' onClick={() => { delete_site(data) }}>Delete</p></td>
        </tr>
    )
}

export default Site_data