import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {deleteEvent} from "../deleteEvent"

function UserCard({userData, rsvps, onDeleteEvent, setUserData, userEvents, setUserEvents, loggedIn, routeToCreateEvent}) {
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
    // const [showRsvp, setShowRsvp] = useState (false)
    // function handleShowRsvp() {
    //     setShowRsvp(!showRsvp)
    // }
    console.log(userData, userEvents)
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

    const rsvpsOnlyArray = userData.rsvps.map((rsvp) => {
        return (
            <div className="div-with-delete">
                <p>{rsvp.event.name}</p>
                <p className="user-hosting-events">{rsvp.event.date} {rsvp.event.time}</p>
            <div>
                <p className="attendee">{rsvp.event.all_attending_users.map((attendee) => {
                    return <Link key={rsvp.id} to={`/userprofile/${attendee.id}`}>
                    <p className="attendee">✔️{attendee.name}</p></Link>
                })
            }
            </p>
            </div>
        </div>
        )
    })
            userEventCards = userEvents.map((event) => {
                const eventDate = event.date
                const eventTime = event.time
                // console.log(event.user_id)
                return (
                    <div key={event.id} className="div-with-delete">
                        <p> {event.name}</p>
                        <p className="user-hosting-events">{eventDate} {eventTime}</p>
                       {loggedIn && loggedIn.id === event.user_id ?
                        <button onClick={()=>handleOnDelete(event)} className="delete" alert={("are you sure?")}> ❌  REMOVE</button>
                        : null}
                        </div>
                    
                    )
            })
            
    return(
        <div className="user-card">
            {/* outer container */}
            <div className="outer-container">
                {/* inner container 1 */}
                <div className="inner-div-1-1">
                    <img src={image} alt={name} className="profile-pic"/>

                    <div className="inner-div-1-2">
                    {/* {loggedIn.id === userData.id ? */}
                    <h3 className="username">@{username}</h3>
                    {loggedIn.id === userData.id ?
                     <button className="edit-profile-button" onClick={handleShowHide}>Edit Profile</button>
                   : null }
                    <p className="profile-description">{name}</p>
                    <p>{location}</p>
                    <p>Interests: {interests}</p>
                    </div> 

                <br/>

            {/* edit form */}
            {showEditForm ? 
            <form onSubmit={handleEdit} className="edit-form">
                <button onClick={!showEditForm} align="right">X CLOSE</button><br/>
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
            </form>
                : null }
                {/* end of form */}
            </div>

            {/* row */}
            <div className="inner-div-2-1">
                <div className="inner-div-2-2">
                  <h4 className="profile-events-type">Hosting:</h4>
                    <ul className="user-events">
                       {userEventCards}
                    </ul>
                </div>

                    <div className="inner-div-2-3">
                       <h4 className="profile-events-type">RSVPS:</h4>
                          <ul className="user-events">
                            {rsvpsOnlyArray}
                          </ul>
                    </div>
            </div>
            
                {/*row  */}
                <div className="inner-div-3-1">
                  <div className="calendar">
                  <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={[...rsvpEventArray, ...userEventArray]}
                  />
                </div>
                </div>
            </div>
            <button className="create-event-button" onClick={routeToCreateEvent}><p className="plus">+</p></button>
        </div>
    )
}
export default UserCard