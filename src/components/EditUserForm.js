// import React, {useState} from 'react'
// import { useHistory } from 'react-router-dom'

// function EditUserForm() {
//     let history = useHistory();
//     const [username, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const [age, setAge] = useState("");
//     const [interests, setInterests] = useState("");
//     const [image, setImage] = useState("");
//     const [location, setLocation] = useState("");

//     function handleEdit(event) {
//         event.preventDefault();
//         fetch(`http://localhost:3000/userprofile/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `${localStorage.token}`,
//             },
//             body: JSON.stringify({
//                 name: name,
//                 age: age,
//                 location: location,
//                 interests: interests,
//                 image: image,
//             }),
//         })
//           .then(res => res.json())
//           .then((updatedInfo => {
//               console.log(updatedInfo)
//                 history.push(`/userprofile/${id}`)
//           })
//           )}
//     return (
//         <div>
//             <h2>Edit Profile</h2>
//             <form onSubmit={handleEdit} className="edit-form">
//             <label>Username: </label>
//                 <input 
//                 name="username" 
//                 type="text" 
//                 value={username}
//                 onChange={(e) => setUserName(e.target.value)}
//                 />
//                 <br />
//                 <label>Password: </label>
//                 <input 
//                 name="password" 
//                 type="password" 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <br />
//                 <label>Name: </label>
//                 <input 
//                 name="name" 
//                 type="text" 
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 />
//                 <br />
//                 <label>Age: </label>
//                 <input 
//                 name="age" 
//                 type="number" 
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 />
//                 <br />
//                 <label>location</label>
//                 <input 
//                 name="location" 
//                 type="text" 
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 />
//                 <br />

//                 <label>Interests:</label>
//                 <input 
//                 name="interests" 
//                 type="text" 
//                 value={interests}
//                 onChange={(e) => setInterests(e.target.value)}
//                 />
//                 <br />
//                 <label>Profile Picture:</label>
//                 <input 
//                 name="image" 
//                 type="text" 
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 />
//                 <br />
//                 <input type="submit" />
//             </form>

//         </div>
//     )
// }

// export default EditUserForm