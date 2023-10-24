import React from 'react'
import style from '../../Component/Admin_page_comp/Admin_main/Admin_main.module.css'
import style2 from './Admin_sub_comp.module.css'
const Salary_box = ({ onchange_event_fn }) => {
    return (
        <tr>
            <td colSpan='3'>

                <div className={style2.salary}>
                    <label className={style2.head1}><b>** Annual Salary range : </b></label>
                    <label className={style2.head2}><b>** Work experience (years): </b></label>

                    <select
                        name="Currency"
                        id=""
                        onChange={e => onchange_event_fn(e)}
                        className={`${style2.col1} ${style.client_input_fields}`}
                    >
                        <option selected value="₹">₹</option>
                        <option value="$">$</option>
                    </select>

                    <select
                        name="Start_sal"
                        id=""
                        onChange={e => onchange_event_fn(e)}
                        className={`${style2.col2} ${style.client_input_fields}`}
                        
                    >
                        <option selected value="1 Lacs">1 Lacs</option>
                        <option value="2 Lacs">2 Lacs</option>
                        <option value="3 Lacs">3 Lacs</option>
                        <option value="4 Lacs">4 Lacs</option>
                        <option value="5 Lacs">5 Lacs</option>
                        <option value="6 Lacs">6 Lacs</option>
                        <option value="7 Lacs">7 Lacs</option>
                        <option value="8 Lacs">8 Lacs</option>
                        <option value="9 Lacs">9 Lacs</option>
                        <option value="10 Lacs">10 Lacs</option>
                        <option value="11 Lacs">11 Lacs</option>
                        <option value="12 Lacs">12 Lacs</option>
                        <option value="13 Lacs">13 Lacs</option>
                        <option value="14 Lacs">14 Lacs</option>
                        <option value="15 Lacs">15 Lacs</option>
                        <option value="16 Lacs">16 Lacs</option>
                        <option value="17 Lacs">17 Lacs</option>
                    </select>
                    <label className={style2.to}><b>To</b></label>

                    <select
                        name="End_sal" id=""
                        onChange={e => onchange_event_fn(e)}
                        className={`${style2.col3} ${style.client_input_fields}`}
                    >
                        <option selected value="2 Lacs">2 Lacs</option>
                        <option value="3 Lacs">3 Lacs</option>
                        <option value="4 Lacs">4 Lacs</option>
                        <option value="5 Lacs">5 Lacs</option>
                        <option value="6 Lacs">6 Lacs</option>
                        <option value="7 Lacs">7 Lacs</option>
                        <option value="8 Lacs">8 Lacs</option>
                        <option value="9 Lacs">9 Lacs</option>
                        <option value="10 Lacs">10 Lacs</option>
                        <option value="11 Lacs">11 Lacs</option>
                        <option value="12 Lacs">12 Lacs</option>
                        <option value="13 Lacs">13 Lacs</option>
                        <option value="14 Lacs">14 Lacs</option>
                        <option value="15 Lacs">15 Lacs</option>
                        <option value="16 Lacs">16 Lacs</option>
                        <option value="17 Lacs">17 Lacs</option>
                    </select>

                    <select
                        name="Start_exp"
                        id=""
                        onChange={e => onchange_event_fn(e)}
                        className={`${style2.col5} ${style.client_input_fields}`}
                    >
                        <option selected value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                    </select>
                    <label className={style2.to}><b>To </b></label>

                    <select
                        name="End_exp"
                        id=""
                        onChange={e => onchange_event_fn(e)}
                        className={`${style2.col6} ${style.client_input_fields}`}
                    >
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                    </select>

                </div>

            </td>
        </tr>
    )
}

export default Salary_box