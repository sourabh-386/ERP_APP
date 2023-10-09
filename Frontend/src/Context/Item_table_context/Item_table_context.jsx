import React, { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item_Table_context = createContext(null)

const Item_Table_context_provider = ({ children }) => {

    // for item data 
    const [Item_save_btn, set_Item_save_btn] = useState(false)
    const [item_main_table_data, set_item_main_table_data] = useState([])


    //for segment data 
    const [segment, set_segment] = useState([])

    //save sub  Segment_data
    const [sub_segment, set_sub_segment] = useState([])


    const passing = {
        Item_save_btn, set_Item_save_btn,
        item_main_table_data, set_item_main_table_data,
        segment, set_segment,
        sub_segment, set_sub_segment
    }

    return (
        <Item_Table_context.Provider value={passing}>{children}</Item_Table_context.Provider>
    )
}

export { Item_Table_context, Item_Table_context_provider };
