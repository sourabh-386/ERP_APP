import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cross_btn from '../../assets/Images/close.png'
import add_btn from '../../assets/Images/plus.png'
import style from '../../Component/Admin_page_comp/Admin_main/Admin_main.module.css'
import { useRef } from 'react';
// import { useState } from 'react';

const Skill_box = ({skill_box_data}) => {

    

    //save skills values
    const [value, set_value] = useState([])

    //fro skill input box
    const skillref = useRef(null)

    //use for adding skills
    function add_skill_fn(e) {

        let skill_val = skillref.current.value
        console.log(skill_val)

        const dublicate_skill = value.find((val => { return (val === skill_val) }))

        if (dublicate_skill == undefined) {
            set_value(prevValue => [...prevValue,skill_val])
            skill_box_data(value)
            console.log(value)
            skillref.current.value = ''

        }
        else {
            toast.error(<div className="error_box">{skill_val} is already added</div>)
        }

    }

    // delete skill 
    function delete_skill_fn(skill, e) {

        set_value(value.filter(value => { return (value !== skill) }))
        skill_box_data(value)
        console.log(value)


    }

    return (
        <tr>
            <td className={style} colSpan='9'>
                <label className={style.lable}><b>** Skills </b></label>
                <div className={style.skill_box}>
                    {
                        value.map((skill, index) => {
                            return (
                                <div className={style.outer_add_skill} key={index} >
                                    <input type="text" name='skills' className={style.add_skill} placeholder='Add Skills' value={skill} disabled={true} />
                                    <img className={style.plus_btn} src={cross_btn} alt="*" onClick={(e) => { delete_skill_fn(skill, e) }} />
                                </div>
                            )
                        })
                    }

                    <div className={style.outer_add_skill} >
                        <input type="text" name='skills' className={style.add_skill} placeholder='Add Skills' ref={skillref} />
                        <img className={style.plus_btn} src={add_btn} alt="+" onClick={(e) => { add_skill_fn(e) }} />
                        <ToastContainer
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </div>

            </td>
        </tr>
    )
}

export default Skill_box