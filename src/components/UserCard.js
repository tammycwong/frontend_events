import React, {useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom'

function UserCard({userData}) {
    const [rsvps, setRsvps] = useState({})
    let userEventCards = []
    
    const{image, username, name, age, location, interests, event_id}= userData
    // const params = useParams()
    useEffect(() => {
        fetch("http://localhost:3000/rsvps", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                event_id: event_id,
                status: "yes",
            }),
            
        })
        .then((r) => r.json())
        .then((rsvps) => {
            setRsvps(rsvps);
        });
    }, []);
    if(!userData.events) {
        console.log("asshole")
        return null
    } else {
    userEventCards = userData.events.map((event) => {
        return <p key={event.id}> {event.name} <button>Delete</button></p>
    })

}
    // const rsvpArray = rsvps.status.map((rsvp) => {
    //     return <p key={rsvp.id}>{rsvp.status}</p>
    // })

    
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
                {/* <ul>
                    {rsvpArray}
                </ul> */}
                <button>Add Event</button>
        </div>
    )
}
export default UserCard