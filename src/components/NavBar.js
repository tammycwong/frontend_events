import React from 'react'
import {Link, useHistory} from 'react-router-dom'

function NavBar({loggedIn}) {
    let history = useHistory();
    console.log(loggedIn)
    return (
        <div className="nav-bar">
            {/* <Link className="" to="/">
                Login
            </Link> */}

            <Link className="" to="/signup">
                Sign Up
            </Link>

            {loggedIn ? 
            <Link className="" to={`/userprofile/${loggedIn.id}`}>
                Profile
            </Link> 
            : null} 

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