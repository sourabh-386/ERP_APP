import React from 'react'
import UseCustomState from '../Custom_hook/Item_Table/Item_segment_state'
const Random = () => {
  const [state, setstate] = UseCustomState(false)

  fn()
  return (
    <div>

      <input type="file" name="name" multiple="multiple"  />
      <button type='submit' onClick={()=>{fn()}}>submit</button>
    </div>
  )
}

export default Random