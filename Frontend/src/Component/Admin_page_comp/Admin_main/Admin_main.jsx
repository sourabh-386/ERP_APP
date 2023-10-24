import React from 'react'
import style from './Admin_main.module.css'
import { useState } from 'react'
import cross_btn from '../../../assets/Images/close.png'
import add_btn from '../../../assets/Images/plus.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skill_box from '../../../Sub_component/Admin_page/Skill_box'
import Salary_box from '../../../Sub_component/Admin_page/Salary_box'
import Client_box from '../../../Sub_component/Admin_page/Client_box'
const Admin_main = () => {


    const skillref = useRef(null)
    const [page, setpage] = useState(true)

    //function fro getting data from skill_box comp
    const skill_box_data = (data) => {
        values.skills = data
    }

    //formik yup start

    const initialValues = {
        Client: '',
        Job: '',
        Emp_type: '',
        Department: '',
        Role: '',
        skills: [],
        Work_mode: '',
        Currency: "₹",
        Start_sal: '1 Lacs',
        End_sal: '2 Lacs',
        Start_exp: '0',
        End_exp: '1'
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        // validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            console.log(value)
        },
    })


    // use fro frrmik input 
    function onchange_event_fn(e) {
        handleChange(e)

    }

    //use for adding skills

    // function add_skill_fn(e) {

    //     let skill_val = skillref.current.value

    //     const dublicate_skill = values.skills.find((val => { return (val === skill_val) }))

    //     if (dublicate_skill == undefined) {
    //         values.skills = [...values.skills, skill_val]
    //         skillref.current.value = ''
    //         setpage(!page)
    //     }
    //     else {
    //         toast.error(<div className="error_box">{skill_val} is already added</div>)
    //     }

    // }

    //delete skill
    // function delete_skill_fn(skill, e) {
    //     console.log(skill)

    //     values.skills = values.skills.filter(value => { return (value !== skill) })

    //     setpage(!page)
    // }


    return (
        <div className={style.main_item_table} >
            <div className='add_client_box'>
                {/* <p class='bi bi-caret-right-fill'></p> */}
                <b>Job Discription</b>
                <div className='heading_underline'></div>
            </div>
            <br />
            <form className={style.form} onSubmit={handleSubmit}>
                <table className={style.table} width="100%">
                    <tr>
                        {/* <td colSpan='2' >
                            <label className={style.lable}><b>** Client : </b></label>

                            <input
                                type="text"
                                name='Client'
                                className={style.client_input_fields}
                                onChange={(e) => { onchange_event_fn(e) }}
                                value={values.Client}
                            />
                        </td> */}

                        <Client_box onchange_event_fn={onchange_event_fn} values={values} />
                        <td >
                            <label className={style.lable}><b>** Job title : </b></label>

                            <input
                                type="text"
                                name='Job'
                                className={style.client_input_fields}
                                onChange={(e) => { onchange_event_fn(e) }}
                                value={values.Job}

                            />
                        </td>
                    </tr>
                    <tr>
                        {/* <td>  <label className={style.lable}><b>** Employment type : </b></label></td> */}

                        <td width="33%">
                            <label className={style.lable}><b>** Employment type : </b></label>

                            <select
                                name="Emp_type"
                                className={style.client_input_fields}
                                value={values.Emp_type}

                            >
                                <option value="" defaultChecked>Select</option>
                                <option value="Full Time, Temporary/Contractual">Full Time, Temporary/Contractual</option>
                                <option value="Full Time, Freelance/Homebase">Full Time, Freelance/Homebase</option>
                                <option value="Part Time, Permanent">Part Time, Permanent</option>
                                <option value="Part Time, Temporary/Contractual">Part Time, Temporary/Contractual</option>
                                <option value="Part Time, Freelance/Homebase">Part Time, Freelance/Homebase</option>
                            </select>
                        </td>
                        {/* <td>  <label className={style.lable}><b>** Department : </b></label></td> */}
                        <td width="33%">
                            <label className={style.lable}><b>** Department : </b></label>

                            <input
                                type="text"
                                name='Department'
                                className={style.client_input_fields}
                                onChange={(e) => { onchange_event_fn(e) }}
                                value={values.Department}

                            />
                        </td>
                        {/* <td>  <label className={style.lable}><b>** Location : </b></label></td> */}
                        <td width="33%">
                            <label className={style.lable}><b>** Role : </b></label>

                            <input
                                type="text"
                                name='Role'
                                className={style.client_input_fields}
                                onChange={(e) => { onchange_event_fn(e) }}
                                value={values.Role}

                            />
                        </td>
                    </tr>
                    {/* <tr>
                        <td className={style} colSpan='9'>
                            <label className={style.lable}><b>** Skills </b></label>
                            <div className={style.skill_box}>
                                {
                                    values.skills.map((skill,index) => {
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
                                    // theme="colord"
                                    />
                                </div>
                            </div>

                        </td>
                    </tr> */}
                    <Skill_box skill_box_data={skill_box_data} />

                    <tr>
                        <td >
                            <label className={style.lable}><b>** Work mode : </b></label>

                            <select
                                name="Work_mode"
                                className={style.client_input_fields}
                                value={values.Work_mode}

                            >
                                <option value="" defaultChecked>Select</option>
                                <option value="Full Time, Temporary/Contractual">In office</option>
                                <option value="Full Time, Freelance/Homebase">Remote</option>
                                <option value="Part Time, Permanent">Hybrid</option>
                            </select>
                        </td>
                    </tr>
                    <Salary_box onchange_event_fn={onchange_event_fn} />



                    <tr>
                        <td colSpan='7'>
                            <button type='submit' >Submit</button>
                        </td>
                    </tr>
                </table>
            </form>

        </div >
    )
}

export default Admin_main