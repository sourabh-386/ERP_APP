import React, { useState } from 'react'
import style from '../../Component/Admin_page_comp/Admin_main/Admin_main.module.css'
import style2 from './Admin_sub_comp.module.css'
import down_img from '../../assets/Images/down.png'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { true_Search_box, false_Search_box } from '../../Reducer/Reducers/Search_reducer'
import { true_loading_screen, false_loading_screen } from '../../Reducer/Reducers/Parent_reducer'
import Client_box_search from './Client_box_search'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Client_box = ({ onchange_event_fn, field_name, values, setFieldValue, api, input_lable, box_heading }) => {

    // console.log(field_name)

    const [search_box_data, set_search_box_data] = useState([])





    const data_fetch_fn = async () => {

        const res = await axios.get(api)
        set_search_box_data(res.data)
        console.log(res.data)
        return res.data

    }

    const dispatch = useDispatch()

    //controll search_box visibilty
    const search_vis = useSelector((state) => state.reducer2.Search_box);

    //check if application render first or not
    const [first_render, set_first_render] = useState(false)

    //toogle search_box field 
    const [client_toggle, set_client_toggle] = useState(true)

    //ref for input value
    const data_ref = useRef(null)


    //react querry is used hear
    const { isPending, isError, data, error, refetch, isFetching, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: data_fetch_fn,
        enabled: false,
        concurrent: 100,
    })


    //call api function
    const function_for_refetch = () => {
        set_client_toggle(!client_toggle)
        client_toggle ? refetch() : set_search_box_data('')


    }

    // set input value on click 
    const set_client_val_fn = (val) => {

        console.log(val)
        // setFieldValue(field_name, val)
        val.Customer_Name ? setFieldValue('Client', val.Customer_Name) : ''
        val.Name ? setFieldValue('Organisation', val.Name) : ''

        val.Country ? setFieldValue('Country', val.Country) : ''
        val.State_name ? setFieldValue('State', val.State_name) : ''
        val.City ? setFieldValue('City', val.City) : ''

        val.Title ? setFieldValue('Title', val.Title) : ''
        val.Gender ? setFieldValue('Gender', val.Gender) : ''
        val.Grade ? setFieldValue('Grade', val.Grade) : ''

        set_search_box_data('')
        set_client_toggle(!client_toggle)
    }

    //work on search btn click
    const function_for_search_click = () => {
        set_client_toggle(!client_toggle)
        dispatch(true_Search_box())
    }


    // for counting render 
    useEffect(() => { set_first_render(true) }, [])

    //get data from  child
    const child_data = (val) => {
        console.log(val)
        val.Customer_Name ? setFieldValue('Client', val.Customer_Name) : ''
        val.Name ? setFieldValue('Organisation', val.Name) : ''

        val.Country ? setFieldValue('Country', val.Country) : ''
        val.State_name ? setFieldValue('State', val.State_name) : ''
        val.City ? setFieldValue('City', val.City) : ''

        val.Title ? setFieldValue('Title', val.Title) : ''
        val.Gender ? setFieldValue('Gender', val.Gender) : ''
        val.Grade ? setFieldValue('Grade', val.Grade) : ''

        set_search_box_data('')
    }
    ////////////////////////////////////////


    useEffect(() => {
        if (first_render) {
            console.log(isFetching, isLoading, isPending, isError)
            isFetching ? dispatch(true_loading_screen()) : dispatch(false_loading_screen())

            if (isError) {
                dispatch(false_loading_screen())
                toast.error(<div className='error_box'>{error.message}</div>)
                set_client_toggle(true)
            }
            else {
                // dispatch(true_loading_screen())
            }
        }
    }, [isFetching, isError, isPending])





    return (
        <>
            <label className={style.lable}><b>** {field_name} : </b></label>
            <div className={`${style2.client_box}`} >
                <input
                    type="text"
                    name={field_name}
                    className={style.client_input_fields}
                    onChange={(e) => { onchange_event_fn(e) }}
                    value={values}
                    onBlur={() => { set_client_toggle(true) }}
                    ref={data_ref}
                />
                <div className={style2.client_arrow} onClick={() => function_for_refetch()}>
                    <img src={down_img} className={style2.client_arrow_img} alt="" />
                </div>
                <div
                    className={`
                    ${style2.client_box_serach} 
                ${client_toggle ? style2.client_hid : ''} 
               `}
                >

                    {
                        search_box_data.length!==0 ?
                            search_box_data.map((val, index) => {
                                return (
                                    <>
                                        {val.Customer_Name ?
                                            <p
                                                className={style2.client_search_para}
                                                key={index}
                                                onClick={(e) => { set_client_val_fn(val) }}
                                            >
                                                {val.Customer_Name}

                                            </p> : ''
                                        }

                                        {val.Name ?
                                            <p
                                                className={style2.client_search_para}
                                                key={index}
                                                onClick={(e) => { set_client_val_fn(val) }}
                                            >
                                                {val.Name}

                                            </p> : ''
                                        }


                                        {val.Country ?

                                            <div
                                                // className={style2.client_search_para}
                                                className={`${style2.search_div} ${style2.client_search_para}`}
                                                key={index}
                                                onClick={(e) => { set_client_val_fn(val) }}

                                            >
                                                <table className={style2.table}>
                                                    <tr>
                                                        <td > {val.Country}</td>
                                                        <td> {val.State_name}</td>
                                                        <td> {val.City}</td>
                                                    </tr>
                                                </table>



                                            </div>
                                            : ''

                                        }
                                    </>

                                )
                            })
                            : ''
                    }
                    {
                        search_box_data.length!==0 ?
                            search_box_data[0].Title ?
                                <table className={style2.table}>
                                    <tr>
                                        <td className={style2.table_head}><b>Title</b></td>
                                        <td><b>Gender</b></td>
                                        <td><b>Grade</b></td>

                                    </tr>

                                    {search_box_data.map((val, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                onClick={(e) => { set_client_val_fn(val) }}

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
                            : ''
                    }

                    <hr />
                    <p className={style2.client_search}><b onClick={() => { function_for_search_click() }} >Search...</b></p>
                </div>
                {
                    search_vis ?

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Client_box_search
                                child_data={child_data}
                                api={api}
                                input_lable={input_lable}
                                box_heading={box_heading}
                            />
                        </motion.div>

                        : ''


                }
            </div>
        </>
    )
}

export default Client_box