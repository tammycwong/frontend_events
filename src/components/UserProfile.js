import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import UserCard from './UserCard'

function UserProfile() {

    const [userData, setUserData] = useState({})
    const params = useParams()
    useEffect(() => {
        fetch(`http://localhost:3000/users/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
            
        })
        .then((r) => r.json())
        .then((userData) => {
            console.log(userData)
            setUserData(userData.user)
        });
    },[params.id]);

    return (
        <div>
            <UserCard userData={userData}/>
            {/* {rsvps} */}
        </div>
    )
}

export default UserProfile