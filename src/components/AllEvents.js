import React from 'react'
import EventCard from './EventCard'


function AllEvents({events, createEvent, loggedIn, handleNewRsvp, onDeleteEvent}) {
    const {id} = loggedIn
    // console.log(id)
    // console.log(events)

    if(events) {
    const eventCards = events.map((event) => {
        // console.log(event)
        return (
            <EventCard 
            key={event.id}
            event={event}
            createEvent={createEvent}
            handleNewRsvp={handleNewRsvp}
            userId = {id}
            loggedIn={loggedIn}
            onDeleteEvent={onDeleteEvent}
            />
        )
    })

        return (
            <div>
                <p className="cards">{eventCards}</p>
            </div>
        )
    } else {
        return null
    }    
}

export default AllEvents