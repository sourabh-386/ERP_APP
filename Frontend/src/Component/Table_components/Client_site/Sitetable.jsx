import React, { useRef, useState } from 'react'
import './Sitetable.css'
import { useFormik } from 'formik'
// import plus_img from'.../../../'
import down_img from '../../../assets/Images/down.png'
import { Table_context } from '../../../Context/Table_context/Table_context'
import { useContext } from 'react'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'


const Sitetable = () => {

    const { site_data, set_site_data, editdata, add_edit_data } = useContext(Table_context)


    //store cuntry city ,state list
    const [country_list, set_country_list] = useState([''])

    // const country_value = useRef('');

//     console.log(site_data.map(item => [item.Site_Name])
// )


    const valid = Yup.object({
        Site_Name: Yup.string().min(2).max(40).required().notOneOf(site_data.map(item => item.Site_Name),'This Site Already Exist'),
        Address1: Yup.string().min(5).max(60).required(),
        Country: Yup.string().min(2).max(30).required(),
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
        Start_date: '',
        id: ''
    }

    useEffect(() => {
        if (editdata !== null) {
            setFieldValue('Country', editdata.Country)
            setFieldValue('State', editdata.State)
            setFieldValue('City', editdata.City)
            setFieldValue('Address1', editdata.Address1)
            setFieldValue('Address2', editdata.Address2)
            setFieldValue('Address3', editdata.Address3)
            setFieldValue('Address4', editdata.Address4)
            setFieldValue('Site_Name', editdata.Site_Name)
            setFieldValue('PIN_Code', editdata.PIN_Code)
            setFieldValue('Start_date', editdata.Start_date)
        }
    }, [editdata])


    const { values, errors, touched, handleBlur, resetForm, handleChange, handleSubmit, setFieldValue } = useFormik({

        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time=new Date().getTime()
            if (editdata !== null) {
                // console.log(value)
                add_edit_data({ ...value, id: editdata.id })
            }
            else {
                set_site_data([...site_data, { ...value, id:time }])
            }

            // resetForm()

        }

    });


    //validation fn
    const validation_fn = () => {
        if (errors.Site_Name) {
            toast.error(errors.Site_Name)
        }
        else if (errors.Address1) {
            toast.error(errors.Address1)
        }
        else if (errors.Country) {
            toast.error(errors.Country)
        }
        else if (errors.State) {
            toast.error(errors.State)
        }
        else if (errors.City) {
            toast.error(errors.City)
        }
        else if (errors.PIN_Code) {
            toast.error(errors.PIN_Code)
        }
        else if (errors.Start_date) {
            toast.error(errors.Start_date)
        }

    }



    //funtion  for calling api to get geo location
    const toggle_country_list = async () => {

        try {
            const response = await fetch("http://localhost:3008/location")

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



    return (
        <div className='sitetable_main'>

            <div className='add_client_box'>
                <p class='bi bi-caret-right-fill'></p>
                <b >Site Details</b>
                <div className='heading_underline'></div>
            </div>
            


            <form onSubmit={handleSubmit}>
                <div >
                    <table className='site_input_table'>
                        <tr>
                            <td>
                                <label htmlFor="">** Site Name : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='Site_Name'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Site_Name}
                                // ref={country_value}
                                />
                            </td>
                            <td>
                                <label htmlFor="">** Address1 : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='Address1'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address1}
                                />
                            </td>
                            <td>
                                <label htmlFor="" className='label_margin'>Address2 : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='Address2'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address2}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="" className='label_margin'>Address3 : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='Address3'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address3}
                                />
                            </td>
                            <td>
                                <label htmlFor="" className='label_margin'>Address4 : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='Address4'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Address4}
                                />
                            </td>
                            <td>
                                <label htmlFor="">** Country : </label>
                            </td>
                            <td>
                                <div className='List_of_values'>
                                    <input
                                        type="text"
                                        name='Country'
                                        className='client_input_fields'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.Country}
                                    // ref={country_value}
                                    />
                                    <img src={down_img} alt="img" id='arrow_down_img' onClick={() => { toggle_country_list() }} />
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
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">** State : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='State'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.State}
                                />
                            </td>
                            <td>
                                <label htmlFor="">** City : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='City'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.City}
                                />
                            </td>
                            <td>
                                <label htmlFor="">** Pin Code : </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name='PIN_Code'
                                    className='client_input_fields'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.PIN_Code}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">** Start Date :</label>
                            </td>
                            <td>

                                <input
                                    type="date"
                                    name='Start_date'
                                    className='startdate_input'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Start_date}
                                />

                            </td>
                        </tr>
                    </table>
                </div>

                <div className='Table_save_btn'>
                    {
                        editdata !== null ?
                            <button type='submit' onClick={() => { validation_fn() }}>Save Edit...</button>
                            :
                            <button type='submit' onClick={() => { validation_fn() }}>Add Site</button>
                    }
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

            </form>





        </div>
    )
}

export default Sitetable