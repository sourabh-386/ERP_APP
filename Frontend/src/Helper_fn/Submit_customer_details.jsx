import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
//Submit data to backend
const Submit_customer_details_fn = (Cust_save_btn, Cust_main_table_data, site_data, site_contact,set_disable_form,disable_form) => {


    if(!disable_form){

    if (Cust_save_btn) {

        if (site_data.length !== 0) {

            const return_value = findDuplicates_site(site_data)

            if (return_value.length === 0) {

                if (site_contact.length !== 0) {

                    const return_value = findDuplicates_cintact(site_contact)

                    if (return_value.length === 0) {

                        // console.log('contact')
                        /////////////////////////////
                        send_cust_data(Cust_main_table_data, site_data,site_contact,set_disable_form)
                        ////////////////////////////
                        // console.log(Cust_main_table_data, site_data, site_contact)

                    }
                    else {
                        toast.error(<div className='error_box'>Dublicate Contacts</div>)

                    }

                }
                else {
                    console.log('no contact')
                    send_cust_data(Cust_main_table_data, site_data,site_contact,set_disable_form)


                    /////////////////////////////
                }

            }
            else {
                toast.error(<div className='error_box'>Dublicate Contacts </div>)

            }

        }
        else {
            toast.error(<div className='error_box'>Enter Atleast One Site</div>)
        }

    }
    else {
        toast.error(<div className='error_box'>Save Customer Details</div>)
    }
}
else{
    toast.error(<div className='error_box'>Customer Details alredy saved</div>)
}

}



//sending data to backend
const send_cust_data = async (Cust_main_table_data, site_data, site_contact,set_disable_form) => {

    try {
        await axios({
            method: 'post',
            url: 'http://localhost:3008/data/customer_data',
            data: {
                Cust_main_table_data: Cust_main_table_data,
                site_data: site_data,
                site_contact: site_contact
            }
        });


        toast.success(<div className='error_box'>Customer Data Saved</div>)
        set_disable_form(true)

    } catch (error) {

        // console.log('catch',error)

        if(error.request.status==404){
            toast.error(<div className='error_box'>Network Error Try Again</div>)

        }
        else{
            toast.error(<div className='error_box'>Customer Alredy Exist</div>)
        }

    }

}


//function for finding dublicate in segment data

function findDuplicates_site(arr) {
    // console.log(arr)
    let index = 0, newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].Site_Name === arr[j].Site_Name) {
                newArr[index] = arr[i];
                index++;

            }
        }
    }
    return newArr;
}

//function for finding dublicate in sub segment data

function findDuplicates_cintact(arr) {
    // console.log(arr)
    let index = 0, newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].site === arr[j].site && arr[i].name === arr[j].name) {
                newArr[index] = arr[i];
                index++;

            }
        }
    }
    return newArr;
}


export {Submit_customer_details_fn, findDuplicates_site, findDuplicates_cintact }
