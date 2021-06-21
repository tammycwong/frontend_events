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
            {/* <h2>Login:</h2> */}
            <form onSubmit={(e) => handleLogin(e) }>
                <label>Username: </label>
                <input 
                name="username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input 
                name="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <p>No Account? <a href="/signup">Sign Up!</a></p>
                <input type="submit" /> 
            </form>
        </div>
    )
}
export default Login
