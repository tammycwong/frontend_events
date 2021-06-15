import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import UserCard from './UserCard'

function UserProfile({rsvps}) {

    const [userData, setUserData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
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
            setIsLoaded(true)
        });
    },[params.id]);

    if(isLoaded) {
        return (
            <div>
                <UserCard userData={userData} rsvps={rsvps}/>
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }

}

export default UserProfile