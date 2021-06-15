import {Switch, Route} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import Login from './Login'
import AllEvents from './AllEvents'
import NavBar from './NavBar'
import CreateEvent from './CreateEvent'
import UserProfile from './UserProfile'
import SignUp from './SignUp'
import UserCard from './UserCard'

function App() {
    const [events, setEvents] = useState()
    const[loggedIn, setLoggedIn] = useState()
    const [user, setUser] = useState(null)

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
        });
    },[]);

    useEffect(() => {
        if (localStorage.token) {
          fetch("http://localhost:3000/keep_logged_in", {
            method: "GET",
            headers: {
                "Authorization": localStorage.token
            }
          })
          .then(resp => resp.json())
          .then(data => {
              setLoggedIn(data)
          })
        }
      }, [])
    // useEffect(() => {
    //     const loggedIn = localStorage.getItem("user")
    //     if(loggedIn) {
    //         const currentUser = {username: localStorage.getItem("username"),
    //         id: localStorage.getItem("id"),
    //         token: localStorage.getItem("token")}
    //         setUser(currentUser)
    //     }
    // }, [])

    // if(!localStorage.userId){
    //     return<h2>Please Log In or Sign Up</h2>
    // }

    // function onLogin(userData) {
    //     setLoggedIn(userData)
    // }

    function onLogin(userInfo) {
        setUser(userInfo)
    }

    function handleAddEvent(newEvent) {
        const updatedEventsArray = [...events, newEvent];
        setEvents(updatedEventsArray);
    }
    function handleDelete(id) {
        const newEventsArray = events.filter(event=>event.id !==id)
        setEvents(newEventsArray)
    }

    return (
        <div>
            {/* {loggedIn ? <NavBar loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}/> : null} */}
            <NavBar/>

            <Switch>
                <Route exact path='/'>
                    <Login onLogin={onLogin}/>
                </Route>
                <Route exact path="/signup">
                    <SignUp onLogin={onLogin}/>
                </Route>
                <Route exact path='/userprofile/:id'>
                    <UserProfile loggedIn={loggedIn}/>
                </Route>
                <Route exact path='/userprofile/:id'>
                    <UserCard loggedIn={loggedIn}/>
                </Route>
                <Route exact path='/allevents'>
                    <AllEvents loggedIn={loggedIn} events={events} deleteEvent={handleDelete} addEvent={handleAddEvent}/>
                </Route> 
                {/* <Route exact path='/addevent'>
                    <CreateEvent addEvent={handleAddEvent} loggedIn={loggedIn}/>
                </Route> */}
                <Route exact path='/createevent'>
                    <CreateEvent addEvent={handleAddEvent} loggedIn={loggedIn}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App