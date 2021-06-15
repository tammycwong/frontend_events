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
                    // console.log(userInfo)
                    alert("Invalid Username or Password")
                    return null
                } else {
                localStorage.token = userInfo.token;
                onLogin(userInfo)
                // localStorage.setItem(`userId`, `${userInfo.user.id}`);
                history.push(`/userprofile/${userInfo.user.id}`)
                }
            })
            )}
    
    return (
        <div className="login-form">
            <h2>LogIn:</h2>
            <form onSubmit={(e) => handleLogin(e) }>
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