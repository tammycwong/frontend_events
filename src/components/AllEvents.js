import React from 'react'
import EventCard from './EventCard'

function AllEvents({events, createEvent, loggedIn, handleNewRsvp, onDelete}) {
    const {id} = loggedIn

    if(events) {
    const eventCards = events.map((event) => {
    //    console.log(event.user_id)
        return (
            <EventCard 
            key={event.id}
            event={event}
            createEvent={createEvent}
            handleNewRsvp={handleNewRsvp}
            userId = {id}
            onDelete={onDelete}
            loggedIn={loggedIn}
            />
        )
    })
        return (
            <div>
                <p className="cards">{eventCards}</p>
                <button>Add Event</button>
            </div>
        )
    } else {
        return null
    }    
}

export default AllEvents