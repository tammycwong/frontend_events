import React from 'react'
import EventCard from './EventCard'


function AllEvents({events, createEvent, loggedIn, handleNewRsvp, onDeleteEvent, onEventChange, resetFilter, routeToCreateEvent}) {
    const {id} = loggedIn

    function handleCategory(e) {
        onEventChange(e.target.value)
    }

    function resetFilter() {
        onEventChange("All")
    }

    if(events) {
    const eventCards = events.map((event) => {
        return (
            <EventCard 
            key={event.id}
            event={event}
            createEvent={createEvent}
            handleNewRsvp={handleNewRsvp}
            userId = {id}
            loggedIn={loggedIn}
            onDeleteEvent={onDeleteEvent}
            onEventChange={onEventChange}
            routeToCreateEvent={routeToCreateEvent}
            />
        )
    })

        return (
            <div>
                <select onChange={handleCategory} className="filter">
                <option value="All" onClick={resetFilter}>All</option>
                <option value="Class">Class</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Free">Free</option>
                <option value="Games">Games</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Personal">Personal</option>
                <option value="Workout">Workout</option>
                </select>

                <button onClick={resetFilter} className="reset-button">Reset</button>
                <br/>

                {eventCards}

                {loggedIn ? 
                <button className="create-event-button" onClick={routeToCreateEvent}><p className="plus">+</p></button>
                : null}
            </div>
        )
    } else {
        return null
        
    } 
}

export default AllEvents