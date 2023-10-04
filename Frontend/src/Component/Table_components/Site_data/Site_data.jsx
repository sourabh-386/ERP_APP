import React from 'react'
import './Site_data.css'
import { Table_context } from '../../../Context/Table_context/Table_context'
import { useContext } from 'react'
const Site_data = () => {

    const { pagemove, setpagemove, submit_btn, site_data, set_site_data, client_delete, editing_user } = useContext(Table_context)




    return (
        <div className='site_date'>
            {
                pagemove ? '' :

                    <div className='site_data_edditing_btns'>
                        <button className='site_data_editing_btn' onClick={() => { setpagemove(true) }} ><b>+ Create New</b></button>
                        <button className='site_data_editing_btn' onClick={() => { setpagemove(true) }} ><b>Edit Site...</b></button>
                    </div>
            }
            <table>
                <tr>
                    <th>S.no</th>
                    <th>Site Name</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Address1</th>
                    <th>Address2</th>
                    <th>Address3</th>
                    <th>Address4</th>
                    <th>PIN Code</th>
                    <th>Start date</th>
                    {pagemove ? <th>Edit</th> : ''}
                    {pagemove ? <th>Delete</th> : ''}

                </tr>
                {
                    site_data.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.Site_Name}</td>
                                <td>{data.Country}</td>
                                <td>{data.State}</td>
                                <td>{data.City}</td>
                                <td>{data.Address1}</td>
                                <td>{data.Address2}</td>
                                <td>{data.Address3}</td>
                                <td>{data.Address4}</td>
                                <td>{data.PIN_Code}</td>
                                <td>{data.Start_date}</td>

                                {/* <td>
                                    {
                                        pagemove ?
                                            <button className='site_edit_btn' onClick={() => { editing_user(data) }}>Edit</button>
                                            :
                                            <button className='site_edit_btn' onClick={() => { setpagemove(true) }}>Edit</button>
                                    }
                                </td> */}
                                {pagemove ? <td><button className='site_edit_btn' onClick={() => { editing_user(data) }}>Edit</button></td> : ""}
                                {pagemove ? <td><button className='site_del_btn' onClick={() => { client_delete(data.id) }}>Delete</button></td> : ''}


                            </tr>

                        )
                    })
                }

            </table>
        </div>
    )
}

export default Site_data