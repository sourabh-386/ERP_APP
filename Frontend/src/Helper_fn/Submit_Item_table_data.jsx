import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Submit data to backend
const Submit_item_details_fn = (Item_save_btn, item_main_table_data, segment, sub_segment) => {

    if (Item_save_btn) {

        if (segment.length !== 0) {

            const return_value = findDuplicates_seg(segment)

            if (return_value.length === 0) {
               
                if (sub_segment.length !== 0){

                    const return_value = findDuplicates_sub_seg(sub_segment)

                    if(return_value.length === 0){

                        /////////////////////////////
                        send_item_data()    
                        ////////////////////////////

                    }
                    else{
                        toast.error(<div className='error_box'>Dublicate Sub Segment </div>)
    
                    }

                }
                else{
                    console.log('no sub_segment')
                    /////////////////////////////
                }
               
            }
            else {
                toast.error(<div style={{ fontSize: '16px' }}>Dublicate Tech Segment </div>)

            }

        }
        else {
            toast.error(<div style={{ fontSize: '16px' }}>Enter Atleast One Tech Segment</div>)
        }

    }
    else {
        toast.error(<div style={{ fontSize: '16px' }}>Save Tech Details</div>)
    }

}




//function for finding dublicate in segment data

function findDuplicates_seg(arr) {
    console.log(arr)
    let index = 0, newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].Tech_segment_Name === arr[j].Tech_segment_Name) {
                newArr[index] = arr[i];
                index++;

            }
        }
    }
    return newArr;
}

//function for finding dublicate in sub segment data

function findDuplicates_sub_seg(arr){
    console.log(arr)
    let index = 0, newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].Tech_Segment === arr[j].Tech_Segment && arr[i].Tech_sub_segment_Name === arr[j].Tech_sub_segment_Name) {
                newArr[index] = arr[i];
                index++;

            }
        }
    }
    return newArr;
}






//sending data fn

const send_item_data = async (emp_hr_table_data, emp_table) => {

    try {
        await axios({
            method: 'post',
            url: 'http://localhost:3008/data/emp_dat',
            data: {
                Hr_table: emp_hr_table_data,
                Emp_table: emp_table
            }
        });


        toast.success(<div className='error_box'>Employees Data Saved succesfully</div>)
    } catch (error) {
        console.log(error)
    }

}





export {Submit_item_details_fn,findDuplicates_seg,findDuplicates_sub_seg}
