import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function Login({onLogin}) {

    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

        function handleLogin(e) {
            e.preventDefault()
            fetch("http://localhost:3000/login", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 username: username,
                 password: password,           
                }),
         })
            .then((res) => res.json())
            .then((userInfo => {
                if(!userInfo.token){
                    alert("Invalid Username or Password")
                    return null
                } else {
                localStorage.token = userInfo.token;
                onLogin(userInfo)
                history.push(`/userprofile/${userInfo.user.id}`)
                }
            })
            )}
    
    return (
        <div className="login-form">
            <form onSubmit={(e) => handleLogin(e) }>
                <label>Username: </label>
                <input 
                name="username" 
                type="text" 
                value={username}
                autocomplete="off"
                onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input 
                name="password" 
                type="password" 
                value={password}
                autocomplete="off"
                onChange={(e) => setPassword(e.target.value)}
                />
                <br/>

                <input type="submit" /> 
                <p className="signup-link">Not a member? <a href="/signup">Sign up now</a></p>
            </form>
        </div>
    )
}
export default Login
