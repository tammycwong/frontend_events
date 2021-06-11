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
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/events", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then((r) => r.json())
        .then((eventsArray) => {
            setEvents(eventsArray);
        });
    },[]);

    function handleAddEvent(newEvent) {
        const updatedEventsArray = [...events, newEvent];
        setEvents(updatedEventsArray);
    }
    function handleDelete(id) {
        const newEventsArray = events.filter(event=>event.id !==id)
        setEvents(newEventsArray)
    }

    function logOut() {
        localStorage.clear()
    }


    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path='/'>
                    <Home events={events}/>
                </Route>
                <Route exact path='/api/v1/login'>
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route exact path='/userprofile'>
                    <UserProfile />
                </Route>
                <Route exact path='/myevents'>
                    <MyEvents />
                </Route>
                {/* <Route exact path='/allevents'>
                    <AllEvents events={events} deleteEvent={handleDelete} addEvent={handleAddEvent}/>
                </Route>
                <Route exact path='/addevent'>
                    <CreateEvent addEvent={handleAddEvent} />
                </Route> */}
            </Switch>
        </div>
    )
}

export default App