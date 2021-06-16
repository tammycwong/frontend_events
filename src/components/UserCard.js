import React from 'react'

function UserCard({userData, rsvps, onDeleteEvent}) {
    let userEventCards = []
    const{image, username, name, age, location, interests}= userData

    console.log(onDeleteEvent)

    // console.log(userData)
    const rsvpEventArray = rsvps.map((rsvp) => rsvp.event)
    const rsvpArray = rsvpEventArray.map((event) => {
        return <p>{event.name}<button>Edit Status</button></p>
    })
        if(!userData.events) {
            return null
        } else {
            userEventCards = userData.events.map((event) => {
            return <p key={event.id}> {event.name} <button onClick={onDeleteEvent}>Delete</button></p>
            })
        }


    return(
        <div className="">
                <h3>{username}</h3>
                <img src={image} alt={name}/>
                <p>name: {name}</p>
                <p>age: {age}</p>
                <p>location: {location}</p>
                <p>interests: {interests}</p>
                <button>Edit Profile</button>
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