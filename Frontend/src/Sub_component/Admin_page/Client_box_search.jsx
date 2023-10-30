import React from 'react'
import style from '../../Component/Admin_page_comp/Admin_main/Admin_main.module.css'
import { useRef } from 'react';
import style2 from './Admin_sub_comp.module.css'
import { useState } from 'react';
// import { useRef } from 'react';
import cross_img from '../../assets/Images/close.png'
import { useDispatch } from 'react-redux';
import { true_Search_box, false_Search_box } from '../../Reducer/Reducers/Search_reducer.js'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { true_loading_screen, false_loading_screen } from '../../Reducer/Reducers/Parent_reducer'


const Client_box_search = ({ child_data, api, input_lable, box_heading }) => {
    const [first_render, set_first_render] = useState(false)

    //save data from api
    const [api_data, set_api_data] = useState([])


    const Searched_client = useRef('')

    const dispatch = useDispatch()

    const [selected_client, set_selected_client] = useState();


    const data_fetch_fn = async () => {

        const value = Searched_client.current.value
        console.log(value)
        const res = await axios.get(`${api}/${value}`)
        set_api_data(res.data)
        return res.data

    }

    const { isPending, isError, data, error, refetch, isFetching, isLoading } = useQuery({
        queryKey: ['client'],
        queryFn: data_fetch_fn,
        enabled: false,
    })



    // search function
    const find_searched_client = (value) => {


        // console.log(value)
        refetch()
    }


    useEffect(() => {

        set_first_render(true)

    }, [])



    useEffect(() => {
        if (first_render) {
            console.log(isFetching, isLoading, isPending, isError)
            isFetching ? dispatch(true_loading_screen()) : dispatch(false_loading_screen())

            if (isError) {
                dispatch(false_loading_screen())
                toast.error(<div className='error_box'>{error.message}</div>)
                // set_client_toggle(true)
            }
            else {
                // dispatch(true_loading_screen())
            }
        }
    }, [isFetching, isError, isPending])

    //send data tp parent
    const [save_val, set_save_val] = useState('')

    const para_click_fn = (data) => {
        console.log(data)
        set_save_val(data)
        // dispatch(false_Search_box())
    }


    // dubleclick on para 
    const para_duble_click = (data) => {
        child_data(data)
        set_api_data([])
        dispatch(false_Search_box())

    }

    // submit 
    const submit_val_fn = () => {
        child_data(save_val)
        set_api_data([])
        dispatch(false_Search_box())

    }

    //close
    const close_btn_fn = () => {
        set_api_data([])
        dispatch(false_Search_box())
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={`${style2.searchbox_main_outer} `} >
                <div className={style2.searchbox_main}>
                    <img src={cross_img} alt="close" className={style2.searchbox_cross} onClick={() => { close_btn_fn() }} />
                    <h4>{box_heading} </h4>
                    <div className={style2.searchbox_input}>{input_lable} :
                        <input type="text" ref={Searched_client} />
                        <div className={style2.Searchbox_btn1}>
                            <button onClick={() => { find_searched_client(Searched_client.current.value) }}><b>Search</b></button>
                            <button onClick={() => Searched_client.current.value = ''}><b>Reset</b></button>
                        </div>
                        {/* <hr /> */}
                        <div className={style2.serached_client_list}>
                            <p><b>{input_lable}</b></p>
                            <br />
                            <hr />
                            {
                                data ?
                                    api_data.map((val, index) => {
                                        return (<div key={index}>
                                            {
                                                val.Customer_Name ?
                                                    <p
                                                        className={style2.client_search_para}
                                                        onDoubleClick={() => { para_duble_click(val) }}
                                                        onClick={() => { para_click_fn(val) }}
                                                    >
                                                        {val.Customer_Name}
                                                    </p> : ''
                                            }
                                            {
                                                val.Name ?
                                                    <p
                                                        className={style2.client_search_para}
                                                        onDoubleClick={() => { para_duble_click(val) }}
                                                        onClick={() => { para_click_fn(val) }}
                                                    >
                                                        {val.Name}
                                                    </p> : ''
                                            }

                                            {/* <hr /> */}
                                        </div>)
                                    })
                                    :
''
                            }
                            {
                                api_data.length !== 0 ?
                                    api_data[0].Title ?
                                        <table className={style2.table}>
                                            <tr>
                                                <td className={style2.table_head}>
                                                    <b>Title</b></td>
                                                <td><b>Gender</b></td>
                                                <td><b>Grade</b></td>

                                            </tr>

                                            {api_data.map((val, index) => {
                                                return (
                                                    <tr
                                                    key={index}
                                                    className={style2.client_search_table}
                                                    onDoubleClick={() => { para_duble_click(val) }}
                                                    onClick={() => { para_click_fn(val) }}

                                                    >
                                                        <td > {val.Title}</td>
                                                        <td> {val.Gender}</td>
                                                        <td> {val.Grade}</td>
                                                    </tr>
                                                )

                                            })
                                            }

                                        </table>
                                        : ''
                                    : <p>No rows to display</p>
                            }
                        </div>
                    </div>
                    <div className={style2.searcbox_lower_btn}>
                        <button onClick={() => { submit_val_fn() }} ><b>Submit</b></button>

                        <button onClick={() => { dispatch(false_Search_box()) }} ><b>Cancel</b></button>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}

export default Client_box_search