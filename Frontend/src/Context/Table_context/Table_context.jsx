import React, { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
const Table_context = createContext(null)



const Table_context_provider = ({ children }) => {

    //store all customer info
    const [Customer_data, set_customer_data] = useState([])


    //store all client data
    const [site_data, set_site_data] = useState([])


    //move table page
    const [pagemove, setpagemove] = useState(false)


    // deleting client data function
    const client_delete = (id) => {
        set_site_data(
            site_data.filter((value) => {
                return (value.id != id)
            })
        )

    }

    ///editing data

    const [editdata, seteditData] = useState(null)

    const editing_user = (data) => {

        seteditData(data)

    }


    const add_edit_data = (value) => {
        // console.log(value)
        site_data.splice(site_data.findIndex((user) => { return (user.id === value.id) }), 1, value)
        seteditData(null)
        // console.log(site_data)

    }

    //sending data to backend
    const send_table_data = async () => {

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3008/create',
                data: {
                    Customer_data: Customer_data,
                    site_data: site_data
                }
            });
            if(response.data.code){
                alert('Customer already exist')
            }
            else{
                alert('data inserted successfully')
            }
            
            console.log('Response from server:', response.data);
        } catch (error) {
            alert(error)
            console.log(error)
        }


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
        add_edit_data

    }




    return (
        <Table_context.Provider value={passing}>{children}</Table_context.Provider>
    )
}

export { Table_context, Table_context_provider };