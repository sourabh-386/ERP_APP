import React from 'react'
import UseCustomState from '../Custom_hook/Item_Table/Item_segment_state'
const Random = () => {
  const [state, setstate] = UseCustomState(false)
  return (
    <div>

      <input type="file" name="name" multiple="multiple" />
      <button type='submit'>submit</button>
    </div>
  )
}

export default Random