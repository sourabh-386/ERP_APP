import React from 'react'
import style from '../../Component/Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { useContext } from 'react'
import { useState } from 'react'
// import '../../index.css'
import { Item_Table_context } from '../../Context/Item_table_context/Item_table_context'
const Item_sub_segment_data = () => {

    const { segment, sub_segment, set_sub_segment, Item_save_btn } = useContext(Item_Table_context)

    console.log(sub_segment)


    //auto relode state 
    const [, setState] = useState(false)


    //changing data of sub segment
    const onchange_data_fn = (data, e) => {

        let value = e.target.value
        // console.log(e.target.name, e.target.value)
        sub_segment.splice(sub_segment.findIndex((sub) => { return (sub.id === data.id) }), 1, { ...data, [e.target.name]: value })
        console.log(sub_segment)
        setState(prev => !prev)
    }

      //delete segment fn
      const delete_segment=(data)=>{
        console.log(data.id)
        set_sub_segment (
            sub_segment.filter((value) => {
                 return (value.id !== data.id)
             })
         )
     }

    return (

        sub_segment.map((data, index) => {
            return (
                <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>
                        <select
                            className={style.input_box}
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
                        />
                    </td>
                    <td>
                        <input type="text"
                            value={data.Rating}
                            name='Rating'
                            onChange={(e) => { onchange_data_fn(data, e) }}
                            className={style.input_box}


                        />
                    </td>
                    <td>
                        <input type="date"
                            value={data.Start_date}
                            name='Start_date'
                            onChange={(e) => { onchange_data_fn(data, e) }}
                            className={style.input_box}
                        />
                    </td>
                    <td>
                        <input type="text"
                            value={data.Description}
                            name='Description'
                            onChange={(e) => { onchange_data_fn(data, e) }}
                            className={style.input_box}
                        />
                    </td>
                    {/* <td><button className='site_edit_btn'>Edit</button></td> */}
                    <td><p className='del_btn' onClick={()=>{delete_segment(data)}}>Delete</p></td>

                </tr>
            )
        })


    )
}

export default Item_sub_segment_data