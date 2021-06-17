import React from 'react'
import {useHistory} from "react-router-dom"


function EventCard({loggedIn, event, createEvent, handleNewRsvp, userId, onDeleteEvent}) {
    const {id, name, price, date, time, location, image, description, category} = event  
    // console.log(event.id)
    const history = useHistory();

    function handleRsvp () {
        fetch("http://localhost:3000/rsvps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                event_id: id,
                user_id: userId,
                status: "yes",
            }),         
        })
        .then((r) => r.json())
        .then((userRsvps) => {
            console.log(userRsvps)
            handleNewRsvp(userRsvps);
            history.push(`/userprofile/${userId}`)
        });
    }    


    function handleOnDelete() {
        fetch(`http://localhost:3000/events/${id}`, {
            // ${params.id}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => {
            onDeleteEvent(id)
        })
    }
    
    return (
        <div>
            <ul className="card">
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Location: {location}</p>
            <p>Description: {description}</p>
            {loggedIn.id === event.user_id ? (
            <button onClick={handleOnDelete} className="delete">Delete</button>
            ) : null}
            </ul>
            <button>Add To Calendar</button>
            <button onClick={()=>handleRsvp()}>RSVP</button>
        
        </div>
        

    )
}
export default EventCard
