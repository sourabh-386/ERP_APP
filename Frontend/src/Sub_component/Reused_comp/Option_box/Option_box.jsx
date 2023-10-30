import React from 'react'
import style from './Option_box.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const data_fetch_fn = async () => {

    const res = await axios.get(`http://localhost:3008/client`)
    console.log(res.data)
    return res.data

}



const Option_box = () => {

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: data_fetch_fn
        // enabled: false,
    })

    return (
        <div className={style.main}>

            <input type="text" />
            <button onClick={() => refetch()}>Fetch Todos</button>
            {isPending ?
                <span>Loading...</span> : ''
            }

            {isError ?
                <span>Error: {error.message}</span> : ''
            }
            
        </div>
    )
}

export default Option_box