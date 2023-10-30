import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    Search_box: false,
    Search_result:''
}

export const SearchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        true_Search_box: (state, action) => {
            state.Search_box = true
        },
        false_Search_box: (state, action) => {
            state.Search_box = false
        },
        set_search_result:(state,action)=>{
            state.Search_result=action.payload
        }
    }
})

export const { true_Search_box, false_Search_box,set_search_result } = SearchSlice.actions
export default SearchSlice.reducer