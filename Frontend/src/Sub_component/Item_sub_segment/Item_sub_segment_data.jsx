import React from 'react'
import style from '../../Component/Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { useContext } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findDuplicates_sub_seg } from '../../Helper_fn/Submit_Item_table_data';
// import '../../index.css'
import { Item_Table_context } from '../../Context/Item_table_context/Item_table_context'
const Item_sub_segment_data = ({ data, index, segment }) => {

    const { sub_segment, set_sub_segment, Item_save_btn, setState } = useContext(Item_Table_context)

    //disable enable  input value change
    const [disabled, set_disabled] = useState(true)





    //changing data of sub segment
    const onchange_data_fn = (data, e) => {

        let value = e.target.value
        // console.log(e.target.name, e.target.value)
        sub_segment.splice(sub_segment.findIndex((sub) => { return (sub.id === data.id) }), 1, { ...data, [e.target.name]: value })
        // console.log(sub_segment)
        setState(prev => !prev)

    }

    //delete segment fn
    const delete_segment = (data) => {
        console.log(data.id)
        set_sub_segment(
            sub_segment.filter((value) => {
                return (value.id !== data.id)
            })
        )
    }

    //segment_edit_save_fn

    const sub_segment_edit_save_fn = () => {
        if (disabled) {
            set_disabled(!disabled)
        }
        else {
            const dublicate_segment = findDuplicates_sub_seg(sub_segment)
            if (dublicate_segment.length == 0) {
                set_disabled(!disabled)
            }
            else {
                toast.error(<div className="error_box" > Sub Segment already exist</div>)

            }
        }

    }

    return (
        <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>
                <select
                    className={style.input_box}
                    disabled={disabled}
                    name="Tech_Segment"
                    value={data.Tech_Segment}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                >
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
                <input type="text"
                    value={data.Tech_sub_segment_Name}
                    name='Tech_sub_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
            <select
                    name="Rating"
                    value={data.Rating}
                    className={style.input_box}
                    onChange={(e) => { onchange_data_fn(data, e) }}
                   
                    disabled={disabled}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                </select>
                {/* <input type="text"
                    value={data.Rating}
                    name='Rating'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}


                /> */}
            </td>
            <td>
                <input type="date"
                    value={data.Start_date}
                    name='Start_date'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.Description}
                    name='Description'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <button className={disabled ? 'site_edit_btn' : 'add_btn'} onClick={() => { sub_segment_edit_save_fn() }}><b>{disabled ? 'Edit..' : 'Save'}</b></button>
            </td>

            <td><p className='del_btn' onClick={() => { delete_segment(data) }}><b>Delete</b></p></td>

        </tr>
    )




}

export default Item_sub_segment_data