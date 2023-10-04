import React from 'react'
import './Customer_contact_table.css'
import { useFormik } from 'formik'
import { Table_context } from '../../../Context/Table_context/Table_context'
import { useContext } from 'react'
const Customer_contact_table = () => {


    const { contact,contact_delete,editing_contact,con_editdata } = useContext(Table_context)

    return (  
            contact.length==0?<p>No contacts data</p>:
                contact.map((data,index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.site}</td>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.email}</td>
                            <td>{data.designation}</td>
                            <td><div className='site_edit_btn' onClick={()=>{editing_contact(data)}}>Edit</div></td>
                            <td><div className='site_del_btn' onClick={()=>{contact_delete(data)}}>Delete</div></td>                          
                        </tr>
                    )
                })
            

    )
}

export default Customer_contact_table