import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import UserCard from './UserCard'

function UserProfile({rsvps, onDeleteEvent, loggedIn, events, routeToCreateEvent}) {
    const [userData, setUserData] = useState({})
    const [isLoaded, setIsLoaded] = useState()
    const params = useParams()
    const [userEvents, setUserEvents] = useState([])
    const [] = useState()

    // GET request
    useEffect(() => {
        fetch(`http://localhost:3000/users/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }           
        })
        .then((r) => r.json())
        .then((userData) => {
            setUserEvents(userData.user.events)
            setUserData(userData.user)
            setIsLoaded(true)
        });
    },[params.id]);

    if(isLoaded) {
        return (
            <div>
                <UserCard 
                userData={userData} 
                rsvps={rsvps} 
                onDeleteEvent={onDeleteEvent}
                loggedIn={loggedIn}
                events={events}
                setUserData={setUserData}
                userEvents = {userEvents}
                setUserEvents = {setUserEvents}
                routeToCreateEvent={routeToCreateEvent}
                />
            </div>
        )
    } else {
        return (
            <p>Please <a href="/">Login</a> or <a href="/signup">Sign Up</a>to view your profile</p>
        )
    }
}

export default UserProfile