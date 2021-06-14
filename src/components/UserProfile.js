import React, {useState, useEffect} from 'react'
import UserCard from './UserCard'

function UserProfile() {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/users/${localStorage.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
            
        })
        .then((r) => r.json())
        .then((userData) => {
            console.log(userData)
            setUserData(userData)
        });
    },[]);

    return (
        <div>
            <UserCard userData={userData} />
        </div>
    )
}

export default UserProfile