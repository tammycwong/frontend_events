import { CalendarApi } from '@fullcalendar/react';
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

            <img src="https://i.ibb.co/QFnhRby/palcal-dark-1.png" className="logo" onClick={logoOnClick}/>

            {/* { loggedIn ?
                <select onChange={handleCategory} className="filter">
                <option value="All" onClick={resetFilter}>All</option>
                <option value="Class">Class</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Free">Free</option>
                <option value="Games">Games</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Personal">Personal</option>
                <option value="Workout">Workout</option>
                </select>
                : null }

                {loggedIn ? 
                <button onClick={resetFilter} className="reset-button">Reset</button>
                : null}
                 */}

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

            {/* { loggedIn ? 
            <Link className="" to="/createevent">
                <button className="create-event-button">
             <p>+</p>
             </button>
            </Link>
            : null } */}

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

            {/* <select onChange={handleCategory}>
                <option value="All">All</option>
                <option value="Class">Class</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Free">Free</option>
                <option value="Games">Games</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Personal">Personal</option>
                <option value="Workout">Workout</option>
            </select> */}
        </div>
    )
}

export default NavBar
