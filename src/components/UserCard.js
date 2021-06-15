import React from 'react'

function UserCard({userData}) {
    const{image, username, name, age, location, interests}= userData

        // const userEventCards = userData.events.map((event) => {
        //     return <p key={event.id}> {event.name}</p>
        // })
        // console.log(userEventCards)
        // console.log(userData)
    return(
        <div className="">
                <h3>{username}</h3>
                <img src={image}/>
                <p>name: {name}</p>
                <p>age: {age}</p>
                <p>location: {location}</p>
                <p>interests: {interests}</p>
                <p>Events:
                    <ul>
                        {/* <MyEvents userEventCards ={userEventCards}
                    /> */}
                    {/* {userEventCards} */}
                    </ul> 
                </p> 
        </div>
    )
}
export default UserCard