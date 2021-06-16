import React, {useState} from 'react'

function UserCard({userData, rsvps, handleOnDelete, onUpdatedUserData}) {
    let userEventCards = []
    const{image, username, name, age, location, interests, password, id}= userData
    const [updatedUsername, updatedSetUserName] = useState(username);
    const [updatedPassword, updatedSetPassword] = useState(password);
    const [updatedName, updatedSetName] = useState(name);
    const [updatedInterests, updatedSetInterests] = useState(interests);
    const [updatedImage, updatedSetImage] = useState(image);
    const [updatedLocation, updatedSetLocation] = useState(location);

    function handleEdit(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/userprofile/${id}`, {
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
            });      
        }
    const rsvpEventArray = rsvps.map((rsvp) => rsvp.event)
    const rsvpArray = rsvpEventArray.map((event) => {
        return <p>{event.name}<button>Edit Status</button></p>
    })
        if(!userData.events) {
            return null
        } else {
            userEventCards = userData.events.map((event) => {
            return <p key={event.id}> {event.name} <button onClick={(event)=>handleOnDelete(event.id)}>Delete</button></p>
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

                <h2>Edit Profile</h2>
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
                <input 
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
        </div>
    )
}
export default UserCard