import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    Loading_screen: false,
}

export const LoaderSlice = createSlice({
    name: 'Loader',
    initialState,
    reducers: {
        toggle_loading_screen: (state, action) => {
            state.Loading_screen = !state.Loading_screen
        },
        true_loading_screen: (state, action) => {
            state.Loading_screen = true
        },
        false_loading_screen: (state, action) => {
            state.Loading_screen = false
        }
    }
})

export const { toggle_loading_screen,true_loading_screen,false_loading_screen } = LoaderSlice.actions
export default LoaderSlice.reducer