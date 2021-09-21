import React from 'react'
import {Link, useHistory} from 'react-router-dom'

function NavBar({loggedIn}) {
    let history = useHistory();

    function handleLogOut() {
        localStorage.clear();
        alert("Successfully logged out")
        history.push("/")
        history.go(0)
    }
    function logoOnClick() {
        window.location='/allevents'
    }


    return (
        <div className="nav-bar">
            <img src="https://i.ibb.co/QFnhRby/palcal-dark-1.png" className="logo" onClick={logoOnClick} alt="logo"/>

         { !loggedIn ? 
            <Link className="" to="/signup">
                Sign Up  
            </Link>
            : null }

            { loggedIn ? 
            <Link to={`/userprofile/${loggedIn.id}`}>
                Profile
            </Link> 
             : null }

            { !loggedIn ? 
            <Link className="" to="/">
                Login
            </Link>
            : null }
             

            <Link className="" to="/allevents">
                All Events
            </Link>
            

            { loggedIn ?
            <Link onClick={handleLogOut} to="/">
                Log out
            </Link>
            : null}

            <Link>
            
            </Link>
        </div>
    )
}

export default NavBar
