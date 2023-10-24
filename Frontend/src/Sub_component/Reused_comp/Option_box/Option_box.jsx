import React from 'react'
import style from './Option_box.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const data_fetch_fn= async ()=>{

    
}



const Option_box = () => {

    const { isPending, isError, data, error } = useQuery({ queryKey: ['todos'], queryFn: data_fetch_fn })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className={style.main}>

        </div>
    )
}

export default Option_box