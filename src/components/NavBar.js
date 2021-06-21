import { Dropdown } from 'bootstrap';
import React from 'react'
import {Link, useHistory} from 'react-router-dom'

function NavBar({loggedIn}) {
    let history = useHistory();
    // const [showLogin, setShowLogin]= useState()

    // function handleLoginLink() {
    //     setShowLogin(!showLogin)
    // }
    function handleLogOut() {
        localStorage.clear();
        alert("Successfully logged out")
        history.push("/")
        history.go(0)
        // window.location.reload();
    }

    return (
        <div className="nav-bar">

            <Link className="" to="/signup">
                Sign Up  
            </Link>

            { loggedIn ? 
            <Link to={`/userprofile/${loggedIn.id}`}>
                Profile
            </Link> 
             : null }

            { loggedIn ? 
            <Link className="" to="/createevent">
             Create Event
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


            {/* <select className="filter">
                <option>Category:</option>
                <option>Workout</option>
                <option>Nightlife</option>
                <option>Free</option>
                <option>Games</option>
                <option>Class</option>
                <option>Outdoors</option>
                <option>Personal</option>
                <option>Food</option>
                <option>Entertainment</option>
            </select> */}

            { loggedIn ?
            <Link onClick={handleLogOut} to="/">
                Log out
            </Link>
            : null}
        </div>
    )
}

export default NavBar
