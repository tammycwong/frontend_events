import React from 'react'
import {Link, useHistory} from 'react-router-dom'

function NavBar() {
    let history = useHistory();

    return (
        <div className="nav-bar">
            <Link className="" to="/">
                Home
            </Link>

            <Link className="" to="/login">
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
            <Link className="" to="/createevent">
                Create Event
            </Link>

            {/* <Link className="" to="/addevent">
                Create Event
            </Link> */}

            <Link onClick={() => {
                localStorage.clear();
                history.push("/")
            }}
            >
                Log Out
            </Link>
        </div>
    )
}

export default NavBar