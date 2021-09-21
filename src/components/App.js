import {Switch, Route} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import Login from './Login'
import AllEvents from './AllEvents'
import NavBar from './NavBar'
import CreateEvent from './CreateEvent'
import UserProfile from './UserProfile'
import SignUp from './SignUp'

function App() {
    const[events, setEvents] = useState([])
    const[loggedIn, setLoggedIn] = useState(false)
    const[rsvps, setRsvps] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")

    useEffect(() => {
        fetch("http://localhost:3000/events", {
            method: "GET",
        })
        .then((r) => r.json())
        .then((eventsArray) => {
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
              onLogin(data)
          })
        }
      }, [])


    function handleDeleteEvent(id) {
        const newEventsArray = events.filter(event=>event.id !== id)
        setEvents(newEventsArray);
    }

    function onLogin(userInfo) {
        setLoggedIn(userInfo.user)
        if(userInfo.user) {
            setRsvps(userInfo.user.rsvps)
        }
    }
    
    function handleNewRsvp(newRsvp) {
        setRsvps([...rsvps, newRsvp])
    }

    function handleCreateEvent(newEvent) {
        const updatedEventsArray = [...events, newEvent];
        setEvents(updatedEventsArray);
    }
    function handleEventChange(selectedCategory) {
        setSelectedCategory(selectedCategory)
    }

    const filterByCategory = events.filter((event) => {
        if (selectedCategory === "All") {
            return true
        } else {
        return (
            selectedCategory === event.category
        )
        }
    })
    function routeToCreateEvent() {
        window.location='/createevent';
    }

    return (
        <div>
            <NavBar 
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn} 
                    events={events}
                    onEventChange={handleEventChange}
            /> 

            <Switch>
                <Route exact path='/'>
                    <Login 
                    onLogin={onLogin}/>
                </Route>

                <Route exact path="/signup">
                    <SignUp 
                    onLogin={onLogin}/>
                </Route>

                <Route exact path='/allevents'>
                    <AllEvents 
                    loggedIn={loggedIn} 
                    events={filterByCategory} 
                    createEvent={handleCreateEvent} 
                    handleNewRsvp={handleNewRsvp} 
                    onDeleteEvent = {handleDeleteEvent}
                    onEventChange={handleEventChange}
                    routeToCreateEvent={routeToCreateEvent}
                    />
                </Route> 

                <Route exact path='/userprofile/:id'>
                    <UserProfile 
                    loggedIn={loggedIn} 
                    rsvps={rsvps} 
                    events={events}
                    onDeleteEvent = {handleDeleteEvent}
                    routeToCreateEvent={routeToCreateEvent}
                    />
                </Route>
                
                <Route exact path='/createevent'>
                    <CreateEvent 
                    createEvent={handleCreateEvent} 
                    loggedIn={loggedIn} 
                    events={events}
                    />

                </Route>
            </Switch>
        </div>
    )
}

export default App