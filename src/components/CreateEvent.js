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
            <h3>Create Event:</h3>
            <br/>
            <br/>
              <form className="new-event-form" onSubmit={handleSubmit}>
                  <label>Title: </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Event title"
                    value={name}
                    autocomplete="off"
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <label>Price: </label>
                <input
                    type="number"
                    name="price"
                    step="1"
                    placeholder="Price"
                    value={price}
                    autocomplete="off"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br/>
                <label>Date: </label>
                <input
                    type="text"
                    name="date"
                    placeholder="Date"
                    value={date}
                    autocomplete="off"
                    onChange={(e) => setDate(e.target.value)}
                />
                <br/>

                <label>Time: </label>
                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={time}
                    autocomplete="off"
                    onChange={(e) => setTime(e.target.value)}
                />
                <br/>

                <label>Location: </label>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={location}
                    autocomplete="off"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br/>

                <label>Image: </label>
                <input
                    type="text"
                    name="image"
                    placeholder="Event Image"
                    value={image}
                    autocomplete="off"
                    onChange={(e) => setImage(e.target.value)}
                />
                <br/>
                <br/>

                <label>Description: </label>
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    autocomplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br/>
                <br/>

                <label>Select Category: </label>
                <select
                    className=""
                    name="category"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option>Workout</option>
                    <option>Nightlife</option>
                    <option>Free</option>
                    <option>Games</option>
                    <option>Class</option>
                    <option>Outdoors</option>
                    <option>Personal</option>
                    <option>Food</option>
                    <option>Entertainment</option>
                </select>

                <br/>
                <button type="submit" className="button-resizing"> Create</button>
              </form>
        </div>

    );
}

export default CreateEvent