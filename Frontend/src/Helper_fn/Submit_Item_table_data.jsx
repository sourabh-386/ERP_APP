import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
//Submit data to backend
const Submit_item_details_fn = (Item_save_btn, item_main_table_data, segment, sub_segment, set_disable_form,disable_form) => {
if(!disable_form){
    if (Item_save_btn) {

        if (segment.length !== 0) {

            const return_value = findDuplicates_seg(segment)

            if (return_value.length === 0) {

                if (sub_segment.length !== 0) {

                    const return_value = findDuplicates_sub_seg(sub_segment)

                    if (return_value.length === 0) {

                        /////////////////////////////
                        send_item_data(item_main_table_data, segment, sub_segment,set_disable_form)
                        ////////////////////////////
                        // console.log(item_main_table_data, segment, sub_segment,se)
                        // set_disable_form(true)

                    }
                    else {
                        toast.error(<div className='error_box'>Dublicate Sub Segment </div>)

                    }

                }
                else {
                    // console.log('no sub_segment')
                    send_item_data(item_main_table_data, segment, sub_segment,set_disable_form)
                    // set_disable_form(true)

                    /////////////////////////////
                }

            }
            else {
                toast.error(<div className='error_box'>Dublicate Tech Segment </div>)

            }

        }
        else {
            toast.error(<div className='error_box'>Enter Atleast One Tech Segment</div>)
        }

    }
    else {
        toast.error(<div className='error_box'>Save Tech Details</div>)
    }

}
else{
    toast.error(<div className='error_box'>Tech Details alredy saved</div>)
}
}




//function for finding dublicate in segment data

function findDuplicates_seg(arr) {
    // console.log(arr)
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

function findDuplicates_sub_seg(arr) {
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

const send_item_data = async (item_main_table_data, segment, sub_segment,set_disable_form) => {

    try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3008/data/Item_data',
            data: {
                item_main_table_data: item_main_table_data,
                segment: segment,
                sub_segment: sub_segment
            }
        });

        toast.success(<div className='error_box'>Item Data Saved</div>)
        set_disable_form(true)

    } catch (error) {

        console.log('catch', error)

        if (error.request.status == 404) {
            toast.error(<div className='error_box'>Network Error Try Again</div>)

        }
        else {
            toast.error(<div className='error_box'>Item Alredy Exist</div>)
        }

    }

}



export { Submit_item_details_fn, findDuplicates_seg, findDuplicates_sub_seg }
