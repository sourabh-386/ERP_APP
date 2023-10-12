import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Submit data to backend
const Submit_emp_details_fn = (Emp_save_btn, emp_table,emp_hr_table_data) => {

    if (Emp_save_btn) {

        if (emp_hr_table_data.length !== 0) {

            //////////////////////////////
            console.log(Emp_save_btn, emp_table,emp_hr_table_data)
            ///////////////////////////////
        } else {

        toast.error(<div className='error_box'>Enter Employee Assign Details</div>)
            
        }

    }
    else {
        toast.error(<div className='error_box'>Save Employee Details</div>)
    }

}




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


export { Submit_emp_details_fn}