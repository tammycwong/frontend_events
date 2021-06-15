import React, {useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom'

function UserCard({userData}) {

    // const [rsvps, setRsvps] = useState({})
    // const params = useParams()
    // useEffect(() => {
    //     fetch(`http://localhost:3000/rsvps/${params.id}`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.token}`
    //         }
            
    //     })
    //     .then((r) => r.json())
    //     .then((rsvps) => {
    //         console.log(rsvps)
    //         setRsvps(rsvps)
    //     });
    // },[params.id]);
    let userEventCards = []
    
    const{image, username, name, age, location, interests}= userData
        if(!userData.events) {
            console.log("asshole")
            return null
        } else {
        userEventCards = userData.events.map((event) => {
            return <p key={event.id}> {event.name} <button>Delete</button></p>
        })

    }
        console.log(userData)
        // events that belong to user => need to render RSVP events instead!!
        // rsvps.find_by(user_id) ??
    return(
        <div className="">
                <h3>{username}</h3>
                <img src={image}/>
                <p>name: {name}</p>
                <p>age: {age}</p>
                <p>location: {location}</p>
                <p>interests: {interests}</p>
                <h4>Events:</h4>
                    <ul>
                    {userEventCards}
                    </ul> 
                <h4>RSVP:</h4>
                <button>Add Event</button>
        </div>
    )
}
export default UserCard