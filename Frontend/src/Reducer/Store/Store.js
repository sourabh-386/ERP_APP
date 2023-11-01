import { configureStore } from '@reduxjs/toolkit'
import {LoaderSlice} from '../Reducers/Parent_reducer'
import {SearchSlice} from '../Reducers/Search_reducer'
// import { combineReducers } from ''



export const Store = configureStore({
    reducer:{
      reducer1:LoaderSlice.reducer,
      reducer2:SearchSlice.reducer     
    } 
})