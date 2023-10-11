import { useState } from 'react';

function UseCustomState(initialValue) {
  const [state, setState] = useState(initialValue);

  const updateState = (newValue) => {
    setState(newValue);
  };

  return [state, updateState];
}

export default UseCustomState;