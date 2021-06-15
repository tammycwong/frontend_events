import React, {useState} from 'react'
import {useParams, useHistory} from "react-router-dom"


function EventCard({event, deleteEvent, addEvent, loggedIn}) {
    const {id, name, price, date, time, location, image, description, category} = event
    const params = useParams();
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
    return (
        <div>
        <li className="card">
            <h3>{name}</h3>
            <img src={image}/>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Location: {location}</p>
            <p>Description: {description}</p>
            <button onClick={handleDelete} className="delete">Delete</button>
            <button>Add</button>
            {/* {loggedIn} */}
        </li>
        </div>
        

    )
}
export default EventCard