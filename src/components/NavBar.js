import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {

    return (
        <div className="nav-bar">
            <Link className="" to="/">
                Home
            </Link>

            <Link className="" to="/api/v1/login">
                Login
            </Link>

            <Link className="" to="/signup">
                Sign Up
            </Link>

            <Link className="" to="/userprofile">
                Profile
            </Link>

            <Link className="" to="/myevents">
                My Events
            </Link>

            <Link className="" to="/allevents">
                All Events
            </Link>

            {/* <Link className="" to="/addevent">
                Create Event
            </Link> */}

            <Link className="" to="">
                Log Out
            </Link>
        </div>
    )
}

export default NavBar