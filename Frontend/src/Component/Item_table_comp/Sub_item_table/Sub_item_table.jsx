import React from 'react'
import style from '../../Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { useContext } from 'react'
import { useState } from 'react'
import moment from 'moment'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { Item_Table_context } from '../../../Context/Item_table_context/Item_table_context'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik'
import Item_sub_segment_data from '../../../Sub_component/item_sub_segment/item_sub_segment_data'
import { findDuplicates_sub_seg } from '../../../Helper_fn/Submit_Item_table_data'
const Sub_item_table = () => {


    //setup arrow img
    const { segment, Item_save_btn, sub_segment, set_sub_segment } = useContext(Item_Table_context)
    const [segment_arrow, set_segment_arrow] = useState(false)
    const segment_item_vis_fn = () => {
        if (Item_save_btn) {
            if (segment.length !== 0) {
                segment_arrow ? set_segment_arrow(false) : set_segment_arrow(true)
            }
            else {
                toast.error(<div className='error_box'>Create Tech Segment</div>)
            }
        }
        else {
            toast.error(<div className='error_box'>Save Tech Details</div>)

        }

    }




    //formik use
    const initialValues = {
        Tech_Segment: '',
        Tech_sub_segment_Name: '',
        Rating: '',
        Start_date: '',
        Description: '',
        id: '',
    }

    const valid = Yup.object({
        Tech_Segment: Yup.string().required(),
        Tech_sub_segment_Name: Yup.string().min(2).max(40).required(),
        Description: Yup.string().min(2).max(150).required(),
        Rating: Yup.number().max(10).required(),
        Start_date: Yup.date().required()
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            let unique_id = new Date().getTime()

            set_sub_segment([...sub_segment, { ...value, id: unique_id }])

            console.log(sub_segment)
            resetForm()
        },
    })

    //validation fn
    const validation_fn = () => {
        if (errors.Tech_Segment) {
            toast.error(<div className="error_box">{errors.Tech_Segment}</div>)
        }
        else if (errors.Tech_sub_segment_Name) {
            toast.error(<div className="error_box">{errors.Tech_sub_segment_Name}</div>)
        }
        else if (errors.Rating) {
            toast.error(<div className="error_box">{errors.Rating}</div>)
        }
        else if (errors.Start_date) {
            toast.error(<div className="error_box">{errors.Start_date}</div>)
        }
        else if (errors.Description) {
            toast.error(<div className="error_box">{errors.Description}</div>)
        }
    }

    // trigerr when input change 
    const onchange_event_fn = (e) => {
        // set_Item_save_btn(false)
        handleChange(e)
    }

    //auto relode state 
    const [, setState] = useState(false)

  

    return (
        <div className={style.main_item_table}>
            <div className='add_client_box' onClick={() => { segment_item_vis_fn() }} >
                <p class={segment_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b > Sub Segment</b>
                <div className='heading_underline'></div>
            </div>
            <br />
            <div className={segment_arrow ? style.form : style.form_hid}>
                <form onSubmit={handleSubmit} >
                    <table className={style.table}>
                        <tr>
                            <td> <label>S.No</label></td>
                            <td><label>** Segment</label></td>
                            <td><label>** Sub Segment </label></td>
                            <td><label>** Rating</label></td>
                            <td><label>** Start date</label></td>
                            <td><label>** Description</label></td>
                            <td></td>
                            <td></td>

                        </tr>
                        {
                            sub_segment.map((data, index) => {
                                return (
                                    <Item_sub_segment_data data={data} index={index} segment={segment} setState={setState} />
                                )
                            })
                        }

                        <tr>
                            <td>{sub_segment.length + 1}</td>
                            <td className={style.dropdown}>
                                <select
                                    className={style.input_box}
                                    name="Tech_Segment"
                                    value={values.Tech_Segment}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                >
                                    <option key='default' value='' defaultValue='' >Select</option>
                                    {
                                        segment.map((data, index) => {
                                            return (
                                                <option key={index} value={data.Tech_segment_Name}>{data.Tech_segment_Name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='Tech_sub_segment_Name'
                                    className={style.input_box}
                                    value={values.Tech_sub_segment_Name}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                />
                            </td>
                            <td>
                                <select
                                    name="Rating"
                                    value={values.Rating}
                                    className={style.input_box}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}

                                >
                                    <option value="" defaultValue='' key='default'>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>

                                </select>
                                {/* <input
                                    type="number"
                                    name='Rating'
                                    className={style.input_box}
                                    value={values.Rating}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                /> */}
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name='Start_date'
                                    className={style.input_box}
                                    value={values.Start_date}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                />
                            </td>
                            <td >
                                <input
                                    type="text"
                                    name='Description'
                                    className={style.input_box}
                                    value={values.Description}
                                    onChange={(e) => { onchange_event_fn(e) }}
                                    onBlur={handleBlur}
                                />
                            </td>
                            <td ><button type='submit' className='add_btn' onClick={() => { validation_fn() }}><b>+ADD</b></button></td>
                            <td></td>
                        </tr>

                    </table>
                </form>
            </div>
        </div>
    )
}

export default Sub_item_table