import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import {deleteEvent} from "../deleteEvent"


function EventCard({loggedIn, event, handleNewRsvp, userId, onDeleteEvent, handleCategory}) {
    const {id, name, price, date, time, location, image, description, category} = event  
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
        <div className="event-card" onClick={handleShowDetails}>
            <img src={image} alt={name} className="event-image"/>
            <h3 className="event-name">{name}
            <br/>
            <p>Category: <p className="category">{category}</p>  </p>
            {loggedIn.id === event.user_id ? 
            <button onClick={handleOnDelete} className="delete">❌  REMOVE</button>
             : null} 
             </h3>
            <br/>

            {showDetails ? 
            <div className="details">
                <button className="button-right" onClick={handleShowDetails}>X CLOSE</button>
              <h4 className="detail-key">{name}</h4>
              <img src={image} className="card-image" alt={name}/>
              <h4 className="detail-key">Price:</h4> <p>${price}</p>
              <h4 className="detail-key">Date:</h4> <p>{date}</p>
              <h4 className="detail-key">Time:</h4> <p>{time}</p>
              <h4 className="detail-key">Location:</h4> <p>{location}</p>

              <div className="description">
              <h4 className="detail-key">Description:</h4> <p>{description}</p>
              </div>

              {loggedIn && loggedIn.id !== event.user_id ? 
                <button className="button-details" onClick={handleRsvp}>RSVP</button>
             :null}

              {loggedIn && loggedIn.id === event.user_id ?
                <button onClick={()=>handleOnDelete(event)} className="delete-button-resizing">❌  REMOVE</button>
              :null }
              
            </div>
            : null }

        </div>
    )
              }
export default EventCard
