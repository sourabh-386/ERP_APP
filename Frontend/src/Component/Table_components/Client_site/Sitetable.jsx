import React, { useRef, useState } from 'react'
import './Sitetable.css'
import style from '../../Item_table_comp/Segment_item_table/Segment_item_table.module.css'
import { useFormik } from 'formik'
// import plus_img from'.../../../'
import down_img from '../../../assets/Images/down.png'
import { Table_context } from '../../../Context/Table_context/Table_context'
import { useContext } from 'react'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import Date_fn from '../../../Helper_fn/Date_fn'
import Site_data from '../Site_data/Site_data'
import Site_data_data from '../../../Sub_component/Site_data_data/Site_data_data'
import Client_box from '../../../Sub_component/Admin_page/Client_box'
const Sitetable = () => {

    const { Cust_save_btn, site_data, set_site_data, disable_form } = useContext(Table_context)

    const [Site_arrow, set_Site_arrow] = useState(false)

    const site_vis_fn = () => {

        if (!disable_form) {
            if (Cust_save_btn) {
                Site_arrow ? set_Site_arrow(false) : set_Site_arrow(true)
            }
            else {
                toast.error(<div className='error_box'>Save Customer Details</div>)

            }
        }
    }

    //store cuntry city ,state list
    const [country_list, set_country_list] = useState([''])

    // const country_value = useRef('');

    //     console.log(site_data.map(item => [item.Site_Name])
    // )


    const valid = Yup.object({
        Site_Name: Yup.string().min(2).max(40).required().notOneOf(site_data.map(item => item.Site_Name), 'Site Already Exist'),
        Address1: Yup.string().min(5).max(60).required(),
        // Country: Yup.string().min(2).max(30).required(),
        State: Yup.string().min(2).max(30).required(),
        City: Yup.string().min(2).max(30).required(),
        PIN_Code: Yup.number().typeError('PIN Code must be a number').required('sss'),
        Start_date: Yup.date().required()
    })

    const initialValues = {
        Site_Name: '',
        Address1: '',
        Address2: '',
        Address3: '',
        Address4: '',
        Country: '',
        State: '',
        City: '',
        PIN_Code: '',
        Start_date: Date_fn(),
        id: ''
    }

    // useEffect(() => {
    //     if (editdata !== null) {
    //         setFieldValue('Country', editdata.Country)
    //         setFieldValue('State', editdata.State)
    //         setFieldValue('City', editdata.City)
    //         setFieldValue('Address1', editdata.Address1)
    //         setFieldValue('Address2', editdata.Address2)
    //         setFieldValue('Address3', editdata.Address3)
    //         setFieldValue('Address4', editdata.Address4)
    //         setFieldValue('Site_Name', editdata.Site_Name)
    //         setFieldValue('PIN_Code', editdata.PIN_Code)
    //         setFieldValue('Start_date', editdata.Start_date)
    //     }
    // }, [editdata])


    const { values, errors, touched, handleBlur, resetForm, handleChange, handleSubmit, setFieldValue } = useFormik({

        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime()
            set_site_data([...site_data, { ...value, id: time }])

            console.log('working')
            // resetForm()

        }

    });


    ///open site first  time
    useEffect(() => {
        if (!disable_form) {
            Cust_save_btn ? set_Site_arrow(true) : set_Site_arrow(false)
        }
    }, [Cust_save_btn])


    ///disable form
    useEffect(() => {

        disable_form ? set_Site_arrow(false) : ''
    }, [disable_form])


    //validation fn
    const validation_fn = () => {
        if (errors.Site_Name) {
            toast.error(<div className='error_box'>{errors.Site_Name}</div>)
        }
        else if (errors.Address1) {
            toast.error(<div className='error_box'>{errors.Address1}</div>)
        }
        else if (errors.Country) {
            toast.error(<div className='error_box'>{errors.Country}</div>)
        }
        else if (errors.State) {
            toast.error(<div className='error_box'>{errors.State}</div>)
        }
        else if (errors.City) {
            toast.error(<div className='error_box'>{errors.City}</div>)
        }
        else if (errors.PIN_Code) {
            toast.error(<div className='error_box'>{errors.PIN_Code}</div>)
        }
        else if (errors.Start_date) {
            toast.error(<div className='error_box'>{errors.Start_date}</div>)
        }

    }



    //funtion  for calling api to get geo location
    const toggle_country_list = async () => {

        try {
            const response = await fetch("http://localhost:3008/LOV/location")

            const data = await response.json()

            set_country_list(data)

        } catch (error) {
            alert(error)

        }

        document.getElementById('country_list_toggle_id').classList.toggle('hide_country_list')

    }


    //function set country state and city value
    const table_toggle_country_list = (data) => {
        setFieldValue('Country', data.Country)
        setFieldValue('State', data.State_name)
        setFieldValue('City', data.City)
        document.getElementById('country_list_toggle_id').classList.toggle('hide_country_list')

    }

    ///tringer onchange
    const onchange_event_fn = (e) => {
        // set_Cust_save_btn(false)
        handleChange(e)
    }



    return (
        <div className={style.main_item_table}>

            <div className='add_client_box' onClick={() => { site_vis_fn() }} >
                <p class={Site_arrow ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}></p>
                <b >Site Details</b>
                <div className='heading_underline'></div>
            </div>
            <br />


            <form onSubmit={handleSubmit}>
                <div className={Site_arrow ? style.form : style.form_hid}>
                    <table className={style.site_table}>
                        <tr>
                            <th>S.No</th>
                            <th>** Site Name</th>
                            <th>** Address1</th>
                            <th>Address2</th>
                            <th>Address3</th>
                            <th>Address4</th>
                            <th>** Country</th>
                            <th>** State</th>
                            <th>** City</th>
                            <th>** PIN Code</th>
                            <th>** Start date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {
                            site_data.map((data, index) => {
                                return (
                                    <Site_data data={data} index={index} />
                                )
                            })
                        }
                        <tr>
                            <td>{site_data.length + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    name='Site_Name'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Site_Name}

                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    name='Address1'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address1}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    name='Address2'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address2}
                                />
                            </td>


                            <td>
                                <input
                                    type="text"
                                    name='Address3'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address3}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    name='Address4'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address4}
                                />
                            </td>

                            <td>

                                {/* <Client_box
                                    onchange_event_fn={onchange_event_fn}
                                    values={values.Country}
                                    field_name={'Country'}
                                    setFieldValue={setFieldValue}
                                    api={`http://localhost:3008/LOV/location`}
                                    input_lable={'location'}
                                    box_heading={'Search and Select: location'}

                                /> */}
                                <div className='lov_box'>
                                <input
                                    type="text"
                                    name='Country'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Country}
                                />
                                {/* <img src={down_img} alt="img" id='arrow_down_img' onClick={() => { toggle_country_list() }} />
                                    <div className='country_list' id='country_list_toggle_id' >
                                        <table>
                                            <tr>
                                                <th>Country</th>
                                                <th>State</th>
                                                <th>City</th>
                                            </tr>
                                            {
                                                country_list.map((data, index) => {
                                                    return (
                                                        <tr onClick={() => table_toggle_country_list(data)} key={index}>
                                                            <td >{data.Country}</td>
                                                            <td >{data.State_name}</td>
                                                            <td >{data.City}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </table>

                                        <hr />
                                        <p className='client_list_search' onClick={() => search_onclick_fn()}><a href="#">Search</a></p>
                                    </div> */}
                                    {/* <div className='lov_box_searches'>
                                        vffdfdfsdds
                                    </div> */}
                                </div>
                            </td>


                            <td>
                                <input
                                    type="text"
                                    name='State'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.State}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    name='City'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.City}
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    name='PIN_Code'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.PIN_Code}
                                />
                            </td>


                            <td>

                                <input
                                    type="date"
                                    name='Start_date'
                                    className={style.input_box}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Start_date}
                                />

                            </td>
                            <td>
                                <button type='submit' className='add_btn' onClick={() => { validation_fn() }}><b>+ADD</b></button>

                            </td>
                            <td></td>
                        </tr>
                    </table>
                </div>

                <div className='Table_save_btn'>

                </div>

            </form>




        </div>
    )
}

export default Sitetable