import React from 'react'
import {useHistory} from "react-router-dom"


function EventCard({event, deleteEvent, createEvent, handleNewRsvp, userId}) {
    const {id, name, price, date, time, location, image, description, category} = event  
    const history = useHistory();

    function handleDelete() {
        fetch("http://localhost:3000/events", {
            // ${params.id}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => {
            deleteEvent(id)
            history.push("/allevents")
        })
    }

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
    return (
        <div>
            <ul className="card">
            <h3>{name}</h3>
            <img src={image}/>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Location: {location}</p>
            <p>Description: {description}</p>
            <button onClick={handleDelete} className="delete">Delete</button>
         </ul>
            <button>Add Calendar</button>
            <button onClick={()=>handleRsvp()}>RSVP</button>
        
        </div>
        

    )
}
export default EventCard