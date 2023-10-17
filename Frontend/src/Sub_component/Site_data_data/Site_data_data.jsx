import React from 'react'

const Site_data_data = ({data,index}) => {
    return (
        <tr key={index+1}>
            <td>{index + 1}</td>
            <td>
                <input type="text"
                    value={data.Site_Name}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.Country}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.State}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.City}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            
            <td>
                <input type="text"
                    value={data.Address1}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.Address2}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
             <td>
                <input type="text"
                    value={data.Address3}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.Address4}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.PIN_Code}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td>
                <input type="text"
                    value={data.Start_date}
                    name='Tech_segment_Name'
                    onChange={(e) => { onchange_data_fn(data, e) }}
                    className={style.input_box}
                    disabled={disabled}
                />
            </td>
            <td></td>
            <td></td>

        </tr>

    )
}

export default Site_data_data