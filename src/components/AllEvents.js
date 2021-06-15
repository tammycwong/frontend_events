import React from 'react'
import EventCard from './EventCard'

function AllEvents({events, deleteEvent, addEvent, loggedIn}) {
    if(events) {
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
            {/* {loggedIn} */}
            </div>
        )
    } else {
        return null
    }

    
}

export default AllEvents