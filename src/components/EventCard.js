import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import {deleteEvent} from "../deleteEvent"
// import { Modal, Button } from "react-bootstrap";

function EventCard({loggedIn, event, handleNewRsvp, userId, onDeleteEvent}) {
    const {id, name, price, date, time, location, image, description, user_id} = event  
    const history = useHistory();
    const[showDetails, setShowDetails] = useState()
    // const[showModal, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleSHow=() => setShow

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
                // checkboxes for status 
                // status: status
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
            <h3 className="event-name">{name}
            <br/>
            {loggedIn.id === event.user_id ? 
            <button onClick={handleOnDelete} className="delete">❌  REMOVE</button>
             : null} 
             </h3>
            <img src={image} alt={name}/>
            <br/>
            <button onClick={handleShowDetails}>Details</button>


            {showDetails ? 
            <div className="details">
              <h4 className="detail-key">Price:</h4> <p>${price}</p>
              <h4 className="detail-key">Date:</h4> <p>{date}</p>
              <h4 className="detail-key">Time:</h4> <p>{time}</p>
              <h4 className="detail-key">Location:</h4> <p>{location}</p>
            
              <div className="description">
              <h4 className="detail-key">Description:</h4> <p>{description}</p>
            {/* <p>Host: {user_id}</p> */}
              </div>
            </div>
            : null }
            

            {/* {loggedIn.id === event.user_id ? 
            <button onClick={handleOnDelete} className="delete">❌  REMOVE</button>
             : null}  */}
            
            
            {loggedIn.id !== event.user_id ? 
            <button onClick={handleRsvp}>RSVP</button>
             : null} 
        
        </div>
    )
}
export default EventCard
