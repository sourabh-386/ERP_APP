import React, { useState } from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {

    const [master_option_box, change_master_option_box] = useState(false)

    const changemaster_Option_box = () => {

        master_option_box ? change_master_option_box(false) : change_master_option_box(true)
    }
    const home_box = () => {
        master_option_box ? change_master_option_box(false) :''

    }

    return (
        <div className='navbar_main'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='main_link_box'>

                <NavLink className='link' to="/" onClick={() => { home_box() }}><h4>Home</h4></NavLink>
                <div className='link more_link' onClick={() => { changemaster_Option_box() }}>
                    <h4>Master Data</h4>
                    <p className='nav_arrow'><i class={master_option_box ? "bi bi-caret-down-fill" : "bi bi-caret-right-fill"}></i></p>
                </div>
                <div className={master_option_box ? 'master_option_box' : 'master_option_box hide_master_option_box'}>
                    <NavLink className='link link_inside' to="/customer"><h4>Customer</h4></NavLink>
                    <NavLink className='link link_inside' to="/Item"><h4>Item</h4></NavLink>
                    <NavLink className='link link_inside' to="/employee"><h4>Employee</h4></NavLink>
                    <div className='link link_inside'><h4>Nav3</h4></div>
                </div>

            </div>


        </div>
    )
}

export default Navbar