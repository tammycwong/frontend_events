import {Switch, Route, useHistory, useParams} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import Login from './Login'
import AllEvents from './AllEvents'
import NavBar from './NavBar'
import CreateEvent from './CreateEvent'
import UserProfile from './UserProfile'
import SignUp from './SignUp'

function App() {
    const[events, setEvents] = useState([])
    const[loggedIn, setLoggedIn] = useState({})
    const[rsvps, setRsvps] = useState([])
    let history = useHistory()
    const params = useParams();

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

    //   function handleOnDelete(id) {
    //     const newEventsArray = events.filter(event=>event.id !==id)
    //     setEvents(newEventsArray)
    // }
      function handleDelete() {
        fetch(`http://localhost:3000/events/${params.id}`, {
            // ${params.id}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => {
            // handleOnDelete(id)
            history.push("/allevents")
        })
    }

    function onLogin(userInfo) {
        setLoggedIn(userInfo.user)
        setRsvps(userInfo.user.rsvps)
    }
    
    function handleNewRsvp(newRsvp) {
        setRsvps([...rsvps, newRsvp])
    }

    function handleCreateEvent(newEvent) {
        const updatedEventsArray = [...events, newEvent];
        setEvents(updatedEventsArray);
    }

    return (
        <div>
            {loggedIn ? <NavBar loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}/> : null}
            {/* <NavBar loggedIn={loggedIn}/> */}

            <Switch>
                <Route exact path='/'>
                    <Login onLogin={onLogin}/>
                </Route>

                <Route exact path="/signup">
                    <SignUp onLogin={onLogin}/>
                </Route>

                <Route exact path='/userprofile/:id'>
                    <UserProfile 
                    loggedIn={loggedIn} 
                    rsvps={rsvps} 
                    onDelete={handleDelete}
                    />
                </Route>

                <Route exact path='/allevents'>
                    <AllEvents 
                    loggedIn={loggedIn} 
                    events={events} 
                    createEvent={handleCreateEvent} 
                    handleNewRsvp={handleNewRsvp} 
                    onDelete={handleDelete}
                    />
                </Route> 
                {/* <Route exact path='/addevent'>
                    <CreateEvent addEvent={handleAddEvent} loggedIn={loggedIn}/>
                </Route> */}
                <Route exact path='/createevent'>
                    <CreateEvent 
                    createEvent={handleCreateEvent} 
                    loggedIn={loggedIn} 
                    />
                </Route>
            </Switch>
        </div>
    )
}

export default App