import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function Login() {

    const history = useHistory();
    const [errors, setErrors] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

        let logIn= (e) => {
            e.preventDefault()
            fetch("http://localhost:3000/api/v1/login", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                 username: username,
                 password: password,           
                }),
         })
            .then((res) => res.json())
            .then(message => {
                if (message.error) {
                    setErrors(message.error);
                } else {
                localStorage.token = message.token
                history.push("/myevents");
                }
            })
        }
    
    return (
        <div className="login-form">
            <h2>LogIn:</h2>
            <form onSubmit={(e) => logIn(e) }>
                <label>Username: </label>
                <input 
                name="username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password: </label>
                <input 
                name="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" /> 
            </form>
        </div>
    )
}
export default Login