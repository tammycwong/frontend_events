// import React from 'react'
// import { useHistory } from 'react-router-dom'

// function EditUserForm() {
//     let history = useHistory();

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
//                 history.push(`/userprofile/${id}`)
//           })
//           )}
//     return (
//         <h1>Edit User</h1>
//     )
// }

// export default EditUserForm