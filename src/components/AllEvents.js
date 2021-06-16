import React from 'react'
import EventCard from './EventCard'
import { useParams, useHistory } from 'react-router-dom'


function AllEvents({events, createEvent, loggedIn, handleNewRsvp, onDeleteEvent}) {
    const {id} = loggedIn
    let history = useHistory()
    const params = useParams()

    if(events) {
    const eventCards = events.map((event) => {
    // console.log(event.id)
        return (
            <EventCard 
            key={event.id}
            event={event}
            createEvent={createEvent}
            handleNewRsvp={handleNewRsvp}
            userId = {id}
            // onDelete={handleDelete}
            loggedIn={loggedIn}
            onDeleteEvent={onDeleteEvent}
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