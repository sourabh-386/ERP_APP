import React, { useState } from 'react'
import style from './Segment_item_table.module.css'
import { useContext } from 'react'
import { Item_Table_context } from '../../../Context/Item_table_context/Item_table_context'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import { useEffect } from 'react';
import Item_segment_data from '../../../Sub_component/Item_segment/Item_segment_data';
// import { useEffect } from 'react';
const Segment_item_table = () => {

    //setup arrow img
    const { Item_save_btn, segment, set_segment, segment_vis, Set_segment_vis } = useContext(Item_Table_context)
    const [segment_arrow, set_segment_arrow] = useState(false)


    const segment_item_vis_fn = () => {
        if (Item_save_btn) {
            segment_arrow ? set_segment_arrow(false) : set_segment_arrow(true)
        }
        else {
            toast.error(<div className='error_box'>Save Tech Details</div>)

        }
    }



    //formik use
    const initialValues = {
        Tech_segment_Name: '',
        Rating: '',
        Start_date: '',
        Description: '',
        id: ''
    }


    const valid = Yup.object({
        Tech_segment_Name: Yup.string().min(2).max(40).required().notOneOf(segment.map(item => item.Tech_segment_Name), 'Segment Already Exist'),
        Description: Yup.string().min(2).max(150).required(),
        Rating: Yup.number().max(10).required(),
        Start_date: Yup.date().required()
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            let unique_id = new Date().getTime()

            set_segment([...segment, { ...value, id: unique_id }])
            resetForm()
        },
    })

    //validation fn
    const validation_fn = () => {
        if (errors.Tech_segment_Name) {
            toast.error(<div className="error_box">{errors.Tech_segment_Name}</div>)
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

        handleChange(e)
    }

    ///open segment first  time
    useEffect(() => {

        Item_save_btn? set_segment_arrow(true) : set_segment_arrow(false)
    }, [Item_save_btn])


    return (
        <div className={style.main_item_table}>
            <div className='add_client_box' onClick={() => { segment_item_vis_fn() }} >
                <p class={segment_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b > Tech Segment</b>
                <div className='heading_underline'></div>
            </div>
            <br />
            <form onSubmit={handleSubmit} >
                <div className={segment_arrow ? style.form : style.form_hid}>
                    <table className={style.table}>
                        <tr>
                            <td> <label>S.No</label></td>
                            <td><label>** Segment Name </label></td>
                            <td><label>** Rating</label></td>
                            <td><label>** Start date</label></td>
                            <td><label>** Description</label></td>
                            <td></td>
                            <td></td>

                        </tr>
                        {
                            segment.map((data, index) => {
                                return (
                                    <Item_segment_data data={data} index={index} />
                                )
                            })

                        }
                        <tr>
                            <td>{segment.length + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    name='Tech_segment_Name'
                                    className={style.input_box}
                                    value={values.Tech_segment_Name}
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
                </div>
            </form>
        </div>
    )
}

export default Segment_item_table