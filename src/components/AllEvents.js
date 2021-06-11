import React from 'react'
import EventCard from './EventCard'

function AllEvents({events, deleteEvent, addEvent}) {
    const eventCards = events.map((event) => {
        return (
            <EventCard 
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
            addEvent={addEvent}
            />
        )
        })

    return (
        <div>
        <ul className="cards">{eventCards}</ul>
        </div>
    )
}

export default AllEvents