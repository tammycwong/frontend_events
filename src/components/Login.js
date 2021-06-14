import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function Login() {

    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    let jwt_token = localStorage.getItem("token")

        function handleLogin(e) {
            e.preventDefault()
            fetch("http://localhost:3000/login", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 Authorization: `bearer ${jwt_token}`
             },
             body: JSON.stringify({
                 username: username,
                 password: password,           
                }),
         })
            .then((res) => res.json())
            .then((userInfo => {
                if(!userInfo.token){
                    console.log(userInfo)
                    // alert("Invalid Username or Password")
                    return null
                }
                localStorage.token = userInfo.token;
                localStorage.setItem(`userId`, `${userInfo.user.id}`);
                history.push("/myevents")
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