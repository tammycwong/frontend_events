import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

function CreateEvent({createEvent, loggedIn}) {
    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[date, setDate] = useState("");
    const[time, setTime] = useState("");
    const[location, setLocation] = useState("");
    const[image, setImage] = useState("");
    const[description, setDescription] = useState("");
    const[category, setCategory] = useState("");

    const history = useHistory();
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/events", {
            // /${localStorage.event.id}
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.token}`
            },
            body: JSON.stringify({
                name: name,
                price: price,
                date: date,
                time: time,
                location: location,
                image: image,
                description: description,
                category: category,
                
            }),
        })
        .then((r) => r.json())
        .then((newEvent) => {
            console.log(newEvent)
            createEvent(newEvent)
            history.push("/allevents");
        })
    }


    return (
        <div className="new-event-form">
            <h1>Create Event</h1>
              <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Event title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>

                <input
                    type="number"
                    name="price"
                    step="0.01"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    name="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    name="image"
                    placeholder="Event Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <br/>

                <button type="submit">Create</button>
              </form>
        </div>

    );
}

export default CreateEvent