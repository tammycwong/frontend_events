import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import UserCard from './UserCard'

function UserProfile({rsvps, onDeleteEvent, onUpdatedUserData}) {

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

    function handleUpdatedUserData(updatedUserData) {
        console.log(userData)
        // onUpdatedUserData(updatedUserData)
        // console.log(updatedUserData)
        // const updatedUserDataArray = userData.map(data => {
        //     if (data.id === updatedUserData.id) {
        //         return updatedUserData;
        //     } else {
        //         return userData;
        //     };
        // })
        // console.log(updatedUserDataArray)
        const objToArray = Object.values(userData)
        console.log(objToArray)
        const updatedUserDataArray = objToArray.map(data => {
            if (data.id === updatedUserData.id) {
                return updatedUserData;
            } else {
                return userData;
            };
        })
    }

    if(isLoaded) {
        return (
            <div>
                <UserCard 
                userData={userData} 
                rsvps={rsvps} 
                onDeleteEvent={onDeleteEvent}
                onUpdatedUserData={handleUpdatedUserData}
                />
            </div>
        )
    } else {
        return (
            <div>
            <p>Please <a href="/">Login</a> or <a href="/signup">Sign Up</a>to view your profile</p>
            </div>
        )
    }

}

export default UserProfile