import React, {useState, useEffect} from 'react'
import UserCard from './UserCard'

function UserProfile() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/users")
        .then((r) => r.json())
        .then((usersArray) => {
            setUsers(usersArray);
        });
    },[]);

    const userCards = users.map((user) => {
        return <UserCard 
        key={user.id}
        user={user}
        />

    })
    // function handleDeleteUser(id) {
    //     const newUsersArray = users.filter(user=>user.id !==id)
    //     setUsers(newUsersArray)
    // }

    return (
        <div>
        <h1>User Profile:</h1>
        <ul className="">{userCards}</ul>
        {/* <UserCard deleteUser={handleDeleteUser}/> */}
        </div>
    )
}

export default UserProfile