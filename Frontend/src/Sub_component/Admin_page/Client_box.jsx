import React from 'react'
import style from '../../Component/Admin_page_comp/Admin_main/Admin_main.module.css'
import style2 from './Admin_sub_comp.module.css'
import down_img from '../../assets/Images/down.png'
const Client_box = ({ onchange_event_fn, values }) => {
    return (
        <td colSpan='2' >
            <label className={style.lable}><b>** Client : </b></label>
            <div className={style2.client_box} >
                <input
                    type="text"
                    name='Client'
                    className={style.client_input_fields}
                    onChange={(e) => { onchange_event_fn(e) }}
                    value={values.Client}
                />
                <div className={style2.client_arrow}>
                    <img src={down_img} className={style2.client_arrow_img} alt=""  />
                </div>
            </div>
        </td>
    )
}

export default Client_box