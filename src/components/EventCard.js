import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import {deleteEvent} from "../deleteEvent"


function EventCard({loggedIn, event, handleNewRsvp, userId, onDeleteEvent}) {
    const {id, name, price, date, time, location, image, description, user_id} = event  
    const history = useHistory();
    const[showDetails, setShowDetails] = useState()

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

    function handleShowDetails() {
        setShowDetails(!showDetails)
    }

    function handleOnDelete() {
        deleteEvent(event.id).then(()=>onDeleteEvent(event.id))
    }
    return (
        <div className="event-card">
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <br/>
            <button onClick={handleShowDetails}>Details</button>
            {showDetails ? 
            <>
            <p>Price: ${price}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Location: {location}</p>
            <p className="details">Description: {description}</p>
            <p>Host: {user_id}</p>
            <br/>
            </>
            : null }
            

            {loggedIn.id === event.user_id ? 
            <button onClick={handleOnDelete} className="delete">Delete</button>
             : null} 
            
            
            {loggedIn.id !== event.user_id ? 
            <button onClick={handleRsvp}>RSVP</button>
             : null} 
        
        </div>
        

    )
}
export default EventCard
