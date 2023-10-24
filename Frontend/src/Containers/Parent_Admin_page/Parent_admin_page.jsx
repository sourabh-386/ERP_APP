import React from 'react'
import Admin_main from '../../Component/Admin_page_comp/Admin_main/Admin_main'
const Parent_admin_page = () => {

  return (
    <div className='outer_item_div'>
                <div className='main_item_table_box'>
                    <Admin_main/>
                    
                </div>
                <div className='main_item_table_box'>
                    {/* <Segment_item_table /> */}
                </div>
                <div className='main_item_table_box'>
                    {/* <Sub_item_table /> */}
                </div>
                {/* <div className='Item_table_btns'>
                    <button onClick={()=>{Submit_item_details_fn(Item_save_btn,item_main_table_data,segment,sub_segment,set_disable_form,disable_form)}}><b>Submit</b></button>
                    <button onClick={() => window.location.reload(false)}><b>Create New</b></button>

                </div> */}
            </div>
        
  )

}

export default Parent_admin_page