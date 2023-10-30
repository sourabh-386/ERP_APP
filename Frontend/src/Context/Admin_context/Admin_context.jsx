import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_context = createContext(null)

const Admin_context_provider = ({ children }) => {

    const [searchbar_vis, set_searchbar_vis] = useState(false)

    const dname = 'ssss'
    const passing = {
        searchbar_vis,
        set_searchbar_vis,
        dname
    }

    return (
        <Admin_context.Provider value={passing}>{children}</Admin_context.Provider>
    )
}

export { Admin_context, Admin_context_provider };
