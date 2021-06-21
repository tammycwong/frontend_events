import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import v4 from 'uuid/v4'
import {deleteEvent} from "../deleteEvent"

function UserCard({userData, rsvps, onDeleteEvent, setUserData, userEvents, setUserEvents}) {
    let userEventCards = []
    let history = useHistory()

    const{image, username, name, location, interests, password, id}= userData
    const [updatedUsername, updatedSetUserName] = useState(username);
    const [updatedPassword, updatedSetPassword] = useState(password);
    const [updatedName, updatedSetName] = useState(name);
    const [updatedInterests, updatedSetInterests] = useState(interests);
    const [updatedImage, updatedSetImage] = useState(image);
    const [updatedLocation, updatedSetLocation] = useState(location);

    const [showEditForm, setShowEditForm] = useState(false)

    function handleShowHide() {
        setShowEditForm(!showEditForm)
    }

    function handleOnDelete(deletedEvent) {
        setUserEvents([...userEvents].filter((event)=> event.id !== deletedEvent.id))
        deleteEvent(deletedEvent.id).then(()=>onDeleteEvent(deletedEvent.id))
    }

    function handleEdit(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.token,
            },
            body: JSON.stringify({
                username: updatedUsername,
                password: updatedPassword,
                name: updatedName,
                interests: updatedInterests,
                image: updatedImage,
                location: updatedLocation }),
        })
            .then((r) => r.json())
            .then((updatedUserData) => {
                setUserData(updatedUserData)
                history.go(0)
            });      
        }
    const rsvpEventArray = rsvps.map((rsvp) => {
        rsvp.event.date = new Date(rsvp.event.date)
        rsvp.event.title = rsvp.event.name
        return rsvp.event
    })

    const userEventArray = userData.events.map((event) => {
        return {
            ...event,
            date: new Date(event.date),
            title: event.name
        }
    })

    // console.log(rsvpEventArray)
    const rsvpArray = rsvpEventArray.map((event) => {
        return (
        <div key={event.id}>
            {event.name}
            <p className="rsvp-attendees">Attendees: 
                {event.all_attending_users.map((attendee) => {
                    console.log(attendee.id)
                    return <Link key={v4()} to={`/userprofile/${attendee.id}`}><li>{attendee.name}</li></Link>
                })
                }

            <br/>
            {/* <button>Edit Status</button>   */}
            </p>
        </div>
        )
    })
        // console.log(userData.events)
        if(userData.events) {
            userEventCards = userEvents.map((event) => {
                const eventDate = event.date
                const eventTime = event.time
                return (
                    <div key={event.id}>
                        <p className="user-events"> {event.name}</p>
                        {/* <button>Delete</button> */}
                       {eventDate}
                       <br/>
                       {eventTime}
                       {/* <p>name: {event.name}</p>
                        <p>date: {eventDate}</p>
                        <p>time: {eventTime}</p>  */}
                        <button onClick={()=>handleOnDelete(event)} className="delete">❌  REMOVE</button>
                     
                    </div>
                    )
            })
        }
    return(
        <main className="user-card">
          <div className="flex-container">
            <div className="profile-info">
                <h3>{username}</h3>
                <img src={image} alt={name} className="profile-pic"/>
                <p>{name}</p>
                <p>{location}</p>
                <p>Interests: {interests}</p>
                <br/>
                <button className="edit-profile-button" onClick={handleShowHide}>Edit Profile</button>
            </div>

            {showEditForm ? 
            <form onSubmit={handleEdit} className="edit-form">
            <label>Username: </label>
                <input 
                name="username" 
                type="text" 
                value={updatedUsername}
                onChange={(e) => updatedSetUserName(e.target.value)}
                />
                <br />
                <label>Password: </label>
                <input 
                name="password" 
                type="password" 
                value={updatedPassword}
                onChange={(e) => updatedSetPassword(e.target.value)}
                />
                <br />
                <label>Name: </label>
                <input 
                name="name" 
                type="text" 
                value={updatedName}
                onChange={(e) => updatedSetName(e.target.value)}
                />
                <br />

                <label>Location:</label>
                <input 
                name="location" 
                type="text" 
                value={updatedLocation}
                onChange={(e) => updatedSetLocation(e.target.value)}
                />
                <br />

                <label>Interests:</label>
                <textarea
                name="interests" 
                type="text" 
                value={updatedInterests}
                onChange={(e) => updatedSetInterests(e.target.value)}
                />
                <br />
                <label>Profile Picture:</label>
                <input 
                name="image" 
                type="text" 
                value={updatedImage}
                onChange={(e) => updatedSetImage(e.target.value)}
                />
                <br />
                <input type="submit" />
                <button onClick={!showEditForm}>Close</button>
            </form>
                : null }
            </div>

                <div className="user-hosting-events">
                  <h4 className="">Hosting:</h4>
                    <ul className="user-events">
                       {userEventCards}
                    </ul>

                    <div className="user-hosting-events">
                       <h4 className="">RSVPS:</h4>
                          <ul className="user-rsvp">
                            {rsvpArray}
                           </ul>
                    </div>
                </div> 
                {/* <button>Add Friend:</button> */}
                
                <div className="calendar">
                  <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={[...rsvpEventArray, ...userEventArray]}
                    // eventClick={
                    //     function(rsvps) {
                    //         alert(arg.event.title)
                    //     }
                    // }
                  />
                </div>
        </main>
    )
}
export default UserCard