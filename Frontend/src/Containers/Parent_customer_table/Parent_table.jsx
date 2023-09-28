import React from 'react'
import './Parent_table.css'
import Table from '../../Component/Table_components/Table/Table'
import Sitetable from '../../Component/Table_components/Client_site/Sitetable'
import Site_data from '../../Component/Table_components/Site_data/Site_data'
import { useContext } from 'react'
import { Table_context } from '../../Context/Table_context/Table_context'
import Alert_box from '../../Component/Alert_box/Alert_box'

const Parent_table = () => {

    const { pagemove, setpagemove, site_data, send_table_data } = useContext(Table_context)
    console.log(pagemove)


    return (
        <div>
            <div className={pagemove ? 'parent_class_move' : 'parent_table'}>
                <div className='table_data_box'>
                    <Table />
                    {/* {
                        site_data.length == 0 ? '' : <div className='add_client_box'>
                            <b>Site Details</b>

                        </div>
                    }
                    <br />
                    {
                        site_data.length == 0 ? '' : <Site_data />
                    } */}

                    <div className='add_client_box'>
                        <b>Site Details</b>
                    </div>
                    <br />
                    <Site_data />

                </div>

                <div className='site_data_box'>
                    <Sitetable />

                    <Site_data />


                    <div className='site_submit'>
                        <button type='submit' onClick={() => { setpagemove(false) }}>Save</button>
                    </div>
                </div>

            </div>
            {
                site_data.length !== 0 && pagemove == false ? <div className='data_submit_btn'>
                    <button onClick={() => { send_table_data() }} >Submit</button>
                </div> : ''
            }

        </div>
    )
}

export default Parent_table