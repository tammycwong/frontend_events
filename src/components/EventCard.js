import React from 'react'


function EventCard({event, deleteEvent, addEvent}) {
    const {id, name, price, date, time, location, image, description, category} = event

    function handleDelete() {
        fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => {
            deleteEvent(id)
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
        </li>
        </div>
        

    )
}
export default EventCard