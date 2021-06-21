import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

function SignUp({onLogin}) {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); 
    const [interests, setInterests] = useState("");
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");

    let history = useHistory();

    let signUp= (e) => {
        e.preventDefault()

         fetch("http://localhost:3000/users", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                interests: interests,
                image: image,
                location: location,
                }),
         })
            .then(res => res.json())
            .then((userInfo) => {
                localStorage.token = userInfo.token;
                onLogin(userInfo)
                history.push('/')

            })
    }

    return (
        <div>
        <h2>Sign Up:</h2>
            <form onSubmit={(e) => signUp(e)} className="user-info">
                <label>Username: </label>
                <input 
                name="username" 
                type="text" 
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <label>Password: </label>
                <input 
                name="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <label>Name: </label>
                <input 
                name="name" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                
                <br />
                <label>Location:</label>
                <input 
                name="location" 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
                <br />

                <label>Interests:</label>
                <input 
                name="interests" 
                type="text" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                />
                <br />
                <label>Profile Picture:</label>
                <input 
                name="image" 
                type="text" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}

export default SignUp
