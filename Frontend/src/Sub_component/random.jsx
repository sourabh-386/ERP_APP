import React from 'react'
import UseCustomState from '../Custom_hook/Item_Table/Item_segment_state'
const Random = () => {
  const[state,setstate]=UseCustomState(false)
  return (
    <div>

      <input type="text" disabled={state} placeholder='testing value'/>
      <button onClick={()=>{setstate(!state)}}>change</button>
    </div>
  )
}

export default Random