import {Switch, Route} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import Login from './Login'
import Home from './Home'
import AllEvents from './AllEvents'
import MyEvents from './MyEvents'
import NavBar from './NavBar'
import CreateEvent from './CreateEvent'
import UserProfile from './UserProfile'
import SignUp from './SignUp'

function App() {
    const [events, setEvents] = useState()
    const[loggedIn, setLoggedIn] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/events", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then((r) => r.json())
        .then((eventsArray) => {
            if(!localStorage.token){
                return null
            }
            setEvents(eventsArray);
            setLoggedIn(eventsArray);
        });
    },[]);

    // if(!localStorage.userId){
    //     return<h2>Please Log In or Sign Up</h2>
    // }
    function onLogin(userData) {
        setLoggedIn(userData)
    }

    function handleAddEvent(newEvent) {
        const updatedEventsArray = [...events, newEvent];
        setEvents(updatedEventsArray);
    }
    function handleDelete(id) {
        const newEventsArray = events.filter(event=>event.id !==id)
        setEvents(newEventsArray)
    }

    // function logOut() {
    //     localStorage.clear()
    // }


    return (
        <div>
            {loggedIn ? <NavBar loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}/> : null}

            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route exact path='/userprofile'>
                    <UserProfile loggedIn={loggedIn}/>
                </Route>
                <Route exact path='/myevents'>
                    <MyEvents loggedIn={loggedIn}/>
                </Route>
                <Route exact path='/allevents'>
                    <AllEvents loggedIn={loggedIn} events={events} deleteEvent={handleDelete} addEvent={handleAddEvent}/>
                </Route> 
                <Route exact path='/addevent'>
                    <CreateEvent addEvent={handleAddEvent} loggedIn={loggedIn}/>
                </Route>
                <Route exact path='/createevent'>
                    <CreateEvent loggedIn={loggedIn}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App