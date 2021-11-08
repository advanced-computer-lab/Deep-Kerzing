// import { useState } from "react";
// import {  FaUser, FaAt, FaLock, FaUnlock } from "react-icons/fa";
// import "../searchFlight/adminSearchFlight.css";

// const Profile = (props) => {
//   const Name = "George";
//   const Email = "georgesherif999@gmail.com";
//   const Password = "123";
//   const [visible, setVisibility] = useState(true);
//   const showPassword = () => {
//     setVisibility(!visible);
//   };
//   return (
//     <div className="containerCard">
//       <form>
//         <h1>
//           <FaUser />
//         </h1>
//         <h1>Profile</h1>

//         <div class="input-group input-group-icon">
//           <input
//             //   onChange={(event) => setName(event.target.value)}
//             type="text"
//             placeholder="Name"
//             defaultValue={Name}
//             required
//           />
//           <div class="input-icon">
//             <FaUser></FaUser>
//           </div>
//         </div>
//         <div class="input-group input-group-icon">
//           <input
//             //   onChange={(event) => setEmail(event.target.value)}
//             type="email"
//             value={Email}
//             disabled
//           />
//           <div class="input-icon">
//             <FaAt></FaAt>
//           </div>
//         </div>
//         {visible && (
//           <div>
//             <div class="input-group input-group-icon">
//               <input
//                 //   onChange={(event) => setName(event.target.value)}
//                 type="password"
//                 placeholder="Password"
//                 defaultValue={Password}
//               />
//               <div class="input-icon">
//                 <FaLock></FaLock>
//               </div>
//             </div>
//             <input type="checkbox" onClick="showPassword"></input>
//           </div>
//         )}
//         {!visible && (
//           <div>
//             <div class="input-group input-group-icon">
//               <input
//                 //   onChange={(event) => setName(event.target.value)}
//                 type="text"
//                 placeholder="Password"
//                 defaultValue={Password}
//               />
//               <div class="input-icon">
//                 <FaUnlock></FaUnlock>
//               </div>
//             </div>
//             <button type="checkbox" onClick="showPassword">
//               Show Password
//             </button>
//           </div>
//         )}
//         <div>
//           {/* <button onClick={addAdminHandler} className="button">
//               Add
//             </button> */}
//         </div>
//       </form>
//     </div>
//   );
// };
// export default Profile;
