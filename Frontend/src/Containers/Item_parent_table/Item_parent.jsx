import React from 'react'
import './Item_parent.css'
import Main_item_table from '../../Component/Item_table_comp/Main_item_table/Main_item_table'
import { useContext } from 'react'
import Segment_item_table from '../../Component/Item_table_comp/Segment_item_table/Segment_item_table'
import Sub_item_table from '../../Component/Item_table_comp/Sub_item_table/Sub_item_table'
import { Item_Table_context } from '../../Context/Item_table_context/Item_table_context'
import { Submit_item_details_fn } from '../../Helper_fn/Submit_Item_table_data'
import { useDispatch } from 'react-redux'
import { toggle_loading_screen } from '../../Reducer/Reducers/Parent_reducer'

const Item_parent = () => {

    const dispatch = useDispatch()


    const { Item_save_btn, item_main_table_data, segment, sub_segment, set_disable_form, disable_form } = useContext(Item_Table_context)
    return (

        <div className='outer_item_div'>
            <div className='main_item_table_box'>
                <Main_item_table />
            </div>
            <div className='main_item_table_box'>
                <Segment_item_table />
            </div>
            <div className='main_item_table_box'>
                <Sub_item_table />
            </div>
            <div className='Item_table_btns'>
                <button onClick={() => { Submit_item_details_fn(Item_save_btn, item_main_table_data, segment, sub_segment, set_disable_form, disable_form, dispatch) }}><b >Submit</b></button>
                <button onClick={() => window.location.reload(false)}><b>Create New</b></button>

            </div>
        </div>

    )
}

export default Item_parent