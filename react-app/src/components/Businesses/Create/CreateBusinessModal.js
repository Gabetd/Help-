// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom'
// import { createBusinessThunk } from "../../../store/business";
// import { getAllBusinessesThunk } from "../../../store/business";
// import { getSingleBusinessThunk } from "../../../store/business";



// export default function CreateABusiness({ setShowModal }) {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const User = useSelector(state => state.session.user)
//     const currUser = currentUser.user
//     const [name, setName] = useState('');
//     // const [imageUrl, setImageUrl] = useState(
//     //     'https://moodlehub.ca/pluginfile.php/6842/mod_book/chapter/9131/group2.jpg'
//     // );
//     const [validationErrors, setValidationErrors] = useState([])

//     /* Validation errors for form */
//     useEffect(() => {
//         const validationErrors = [];
//         if (!name) validationErrors.push('Please Provide a name');
//         if (name.length > 40) validationErrors.push('Please provide a group name less than 50 characters');
//         // if (name.length < 4) validationErrors.push('Please provide a longer group name')
//         if (!imageUrl) validationErrors.push('Please provide an image url');
//         setValidationErrors(validationErrors);
//     }, [name, imageUrl]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const group = {
//             name,
//             image_url: imageUrl,
//             owner_id: currUser.id
//         }
//         await dispatch(createGroupThunk(group))
//             dispatch(getGroupsThunk())
//             setShowModal(false)
//             history.push('/dashboard')
//     }


//     return (
//         <form onSubmit={handleSubmit} className='createAGroupForm'>
//             <div className="errorsDiv">
//         {validationErrors.map((error, ind) => (
//           <div key={ind}>{error}</div>
//         ))}
//       </div>
//             <h2>Create A Group</h2>
//             <label>
//                 <input
//                     className="createGroupInput"
//                     placeholder="Name"
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>

//                 <input
//                     className="createGroupInput"
//                     placeholder="Add image url"
//                     type="url"
//                     value={imageUrl}
//                     onChange={(e) => setImageUrl(e.target.value)}
//                     required
//                 />
//             </label>
//             <div className="outer-sub-create-div">
//             <button type="submit" className="logout-butt btn-1" disabled={validationErrors.length}>Create</button>
//             </div>
//         </form>

//     )
// }
