import React, { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table_context = createContext(null)



const Table_context_provider = ({ children }) => {

    //store all customer info
    const [Customer_data, set_customer_data] = useState([])


    //store all client data
    const [site_data, set_site_data] = useState([])

    //customer contact data
    const [contact, set_contact] = useState([])


    //move table page
    const [pagemove, setpagemove] = useState(false)

    //check submitton of submit btn
    const [submit_btn, set_submit_btn] = useState(false)

    //for moving site_arrow
    const [site_arrow, set_site_arrow] = useState(false)




    // deleting client data function
    const client_delete = (id) => {
        const filterd_data = site_data.filter((value) => {
            return (value.id == id)
        })

        // console.log(filterd_data)
        set_site_data(
            site_data.filter((value) => {
                return (value.id != id)
            })
        )

        set_contact(
            contact.filter((value) => {
                return (value.Site_id != filterd_data[0].id)
            })
        )
        // console.log(contact)

    }

    ///editing data fcn and state

    const [editdata, seteditData] = useState(null)

    const editing_user = (data) => {

        seteditData(data)

    }


    const add_edit_data = (value) => {
        // console.log(value)


        const filterd_data = site_data.filter((data) => {
            return (data.id == value.id)
        })

        site_data.splice(site_data.findIndex((user) => { return (user.id === value.id) }), 1, value)
        seteditData(null)

        set_contact(
            contact.filter((value) => {
                return (value.Site_id != filterd_data[0].id)
            })
        )

    }

    //sending data to backend
    const send_table_data = async () => {

        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3008/data/customer_data',
                data: {
                    Customer_data: Customer_data,
                    site_data: site_data,
                    contact: contact
                }
            });


            toast.success('New Customer Created succesfully')
        } catch (error) {
            if(error){
                toast.error(error)
            }
            else{
                toast.error("Try Again")
            }
            console.log()
        }


    }



    // deleting contact data function
    const contact_delete = (data) => {
        console.log(data.id)
        set_contact(
            contact.filter((value) => {
                return (value.id != data.id)
            })
        )

    }

    ///editing data fcn and state

    const [con_editdata, con_seteditData] = useState(null)

    const editing_contact = (data) => {

        con_seteditData(data)
        console.log(data)


    }


    const add_edit_contact_data = (value) => {
        // console.log(value)
        contact.splice(contact.findIndex((user) => { return (user.id === value.id) }), 1, value)
        con_seteditData(null)
        // console.log(site_data)

    }

    const demo = 'sourbh'


    const passing = {
        demo,
        site_data,
        set_site_data,
        client_delete,
        pagemove,
        setpagemove,
        Customer_data,
        set_customer_data,
        send_table_data,
        editdata,
        seteditData,
        editing_user,
        add_edit_data,
        contact,
        set_contact,
        contact_delete,
        editing_contact,
        con_editdata,
        add_edit_contact_data,
        submit_btn,
        set_submit_btn,
        site_arrow,
        set_site_arrow

    }
    return (
        <Table_context.Provider value={passing}>{children}</Table_context.Provider>
    )
}

export { Table_context, Table_context_provider };