import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import UserCard from './UserCard'

function UserProfile({rsvps, onDelete}) {

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
            setUserData(userData.user)
            setIsLoaded(true)
        });
    },[params.id]);

    if(isLoaded) {
        return (
            <div>
                <UserCard 
                userData={userData} 
                rsvps={rsvps} 
                onDelete={onDelete}
                />
            </div>
        )
    } else {
        return (
            <p>Please <a href="/">Login</a> or <a href="/signup">Sign Up</a>to view your profile</p>
        )
    }

}

export default UserProfile