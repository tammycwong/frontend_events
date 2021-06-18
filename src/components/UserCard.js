import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function UserCard({userData, rsvps, handleOnDelete, onUpdatedUserData}) {
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
                onUpdatedUserData(updatedUserData);
                history.go(0)
            });      
        }
    const rsvpEventArray = rsvps.map((rsvp) => rsvp.event)
    const rsvpArray = rsvpEventArray.map((event) => {
        return (
        <div>
            {event.name}<button>Edit Status</button>
            <p>Attendees: 
            <select>
                {event.all_attending_users.map((attendee) => {
                    return <option>{attendee}</option>
                })}
            </select>    
            </p>
        </div>
        )
    })
            userEventCards = userData.events.map((event) => {
            const eventDate = event.date
            const eventTime = event.time

                return (
                    <div>
                        <p key={event.id}> {event.name} <button onClick={(event)=>handleOnDelete(event.id)}>Delete</button></p>
                       {eventDate}<br/>
                       {eventTime}
                       {/* <p>id: {event.id}</p>
                        <p>event: `${userData.event}`</p> 
                        <p>date: {new Date(eventDate)}</p>
                        <p>time: new Date{(eventTime)}</p> */}
                     
                    </div>
                    )
            })
    return(
        <div className="">
                <h3>{username}</h3>
                <img src={image} alt={name}/>
                <p>{name}</p>
                <p>{location}</p>
                <p>interests: {interests}</p>
                <button onClick={handleShowHide}>Edit Profile</button>

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

                <label>location</label>
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
            : null}

                <h4>Hosting:</h4>
                <ul>
                    {userEventCards}
                </ul>
                <h4>RSVPs:</h4>
                <ul>
                    {rsvpArray}
                </ul>
                <button>Add Friend:</button>

                <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin]}
                userData={userData}
                weekends={true}
                default={false}
                />
        </div>
    )
}
export default UserCard