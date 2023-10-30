import React from 'react'
import './Home.css'
import { motion } from 'framer-motion'
import Option_box from '../../Sub_component/Reused_comp/Option_box/Option_box'
import Loader from '../../Sub_component/Reused_comp/Loder/Loader'
import { useDispatch } from 'react-redux'
// import { toggle_loading_screen } from '../../Reducer/Reducers/Parent_reducer'
// import { useSelector } from 'react-redux';
// import 
const Home = () => {

  // const dispatch=useDispatch()
  // const loadingScreen = useSelector((state) => state.Loading_screen);

  // console.log(loadingScreen)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className='main_div'>
      <div className='side'></div>
      <div className='main_home_div'>
        homepage
        {/* <Random /> */}
        {/* <Random /> */}
        {/* <Option_box /> */}
        {/* <Loader/> */}
        {/* <button onClick={()=>{dispatch(toggle_loading_screen())}}>ddd</button> */}

      </div>

    </motion.div>
  )
}

export default Home