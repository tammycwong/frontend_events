import React from 'react'

function UserCard({user}) {
    const{image, username, name, age, location, interests}= user

    // function handleDeleteUser() {
    //     fetch(`http://localhost:3000/api/v1/users/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then((r) => r.json())
    //     .then(() => {
    //         deleteUser(id)
    //     })
    // }
    return(
        <div>
            <li className="">
                <h3>{username}</h3>
                <img src={image}/>
                <p>name: {name}</p>
                <p>age: {age}</p>
                <p>location: {location}</p>
                <p>interests: {interests}</p>
                {/* <button onClick={handleDeleteUser} className="delete">Delete</button> */}
            </li>
        </div>
    )
}
export default UserCard