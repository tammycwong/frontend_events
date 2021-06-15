import React from 'react'
import EventCard from './EventCard'

function AllEvents({events, deleteEvent, createEvent, loggedIn, handleNewRsvp}) {
    const {id} = loggedIn

    if(events) {
    const eventCards = events.map((event) => {
        console.log(event.id)
        return (
            <EventCard 
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
            createEvent={createEvent}
            handleNewRsvp={handleNewRsvp}
            userId = {id}
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