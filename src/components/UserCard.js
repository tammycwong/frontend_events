import React, {useState} from 'react'
import {useParams} from 'react-router-dom'

function UserCard({userData, handleNewRsvp, rsvps}) {
    let userEventCards = []
    
    const{image, username, name, age, location, interests, event_id}= userData
    const rsvpEventArray = rsvps.map((rsvp) => rsvp.event)
    const rsvpArray = rsvpEventArray.map((event) => {
        return <p>{event.name}</p>
    })
        if(!userData.events) {
            return null
        } else {
            userEventCards = userData.events.map((event) => {
            return <p key={event.id}> {event.name} <button>Delete</button></p>
            })
        }
    return(
        <div className="">
                <h3>{username}</h3>
                <img src={image}/>
                <p>name: {name}</p>
                <p>age: {age}</p>
                <p>location: {location}</p>
                <p>interests: {interests}</p>
                <h4>Hosting:</h4>
                <ul>
                    {userEventCards}
                </ul>
                <h4>RSVPs:</h4>
                <ul>
                    {rsvpArray}
                </ul>
                <button>Add Event</button>
        </div>
    )
}
export default UserCard