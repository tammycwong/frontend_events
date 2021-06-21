import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import UserCard from './UserCard'

function UserProfile({rsvps, onDeleteEvent, loggedIn, events}) {
    const [userData, setUserData] = useState({})
    const [isLoaded, setIsLoaded] = useState()
    const params = useParams()
    const [userEvents, setUserEvents] = useState([])

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
            console.log(userData)
            setIsLoaded(true)
        });
    },[params.id]);

    // console.log(userEvents)
    // function handleUpdatedUserData(updatedUserData) {
    //     const objToArray = Object.values(userData)
    //      objToArray.map(data => {
    //         if (data.id === updatedUserData.id) {
    //             return updatedUserData;
    //         } else {
    //             return userData;
    //         };
    //     })
    // }

    if(isLoaded) {
        return (
            <div>
                <UserCard 
                userData={userData} 
                rsvps={rsvps} 
                onDeleteEvent={onDeleteEvent}
                // onUpdatedUserData={handleUpdatedUserData}
                loggedIn={loggedIn}
                events={events}
                setUserData={setUserData}
                userEvents = {userEvents}
                setUserEvents = {setUserEvents}
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