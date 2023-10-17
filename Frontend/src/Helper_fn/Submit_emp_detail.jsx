import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
//Submit data to backend
const Submit_emp_details_fn = (Emp_save_btn, emp_table, emp_hr_table_data,set_disable_form,disable_form) => {
    if(!disable_form){
    if (Emp_save_btn) {

        if (emp_table.length !== 0) {

            //////////////////////////////
            // console.log(Emp_save_btn, emp_table, emp_hr_table_data)
            ///////////////////////////////
            send_emp_data(emp_hr_table_data, emp_table,set_disable_form)

        } else {

            toast.error(<div className='error_box'>Enter Employee Assign Details</div>)

        }

    }
    else {
        toast.error(<div className='error_box'>Save Employee Details</div>)
    }
}
else{
    toast.error(<div className='error_box'>Employees Details alredy saved</div>)
}

}

//send data to backend
const send_emp_data = async (emp_hr_table_data, emp_table,set_disable_form) => {

    try {
        await axios({
            method: 'post',
            url: 'http://localhost:3008/data/emp_data',
            data: {
                Hr_table: emp_hr_table_data,
                Emp_table: emp_table
            }
        });


        toast.success(<div className='error_box'>Employees Data Saved succesfully</div>)
        set_disable_form(true)

    } catch (error) {
        console.log(error)
    }

}


// function to convert first letter to uppercase

// const Modifying_values = (value) => {
//     const trim_value = value.trim();
//     const cap_value = trim_value[0].toUpperCase() + trim_value.slice(1);
//     return (cap_value)
// }







//function for finding dublicate in segment data

// function findDuplicates_seg(arr) {
//     console.log(arr)
//     let index = 0, newArr = [];
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i].Tech_segment_Name === arr[j].Tech_segment_Name) {
//                 newArr[index] = arr[i];
//                 index++;

//             }
//         }
//     }
//     return newArr;
// }

//function for finding dublicate in sub segment data

// function findDuplicates_sub_seg(arr) {
//     console.log(arr)
//     let index = 0, newArr = [];
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i].Tech_Segment === arr[j].Tech_Segment && arr[i].Tech_sub_segment_Name === arr[j].Tech_sub_segment_Name) {
//                 newArr[index] = arr[i];
//                 index++;

//             }
//         }
//     }
//     return newArr;
// }


export { Submit_emp_details_fn }