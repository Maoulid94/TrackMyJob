// import React from "react";
// import { FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";

// export const Card = () => {
//   return (
//     <div key={item.id} className="card-item">
//       <div className="EllipsisH-icon">
//         <FaEllipsisH
//           size={16}
//           onClick={() => {
//             handleMenuClick(item.id);
//           }}
//         />
//       </div>

//       {/* Dropdown Menu for updated and deleted */}
//       {openMenuItem === item.id && (
//         <div className="dropdown-menu">
//           <button onClick={() => handleEdit(item.id)}>
//             <FaEdit style={{ marginRight: "8px" }} />
//             Edit
//           </button>
//           <button
//             onClick={() => {
//               handleDelete(item.id);
//             }}
//           >
//             <FaTrash style={{ marginRight: "8px" }} />
//             Delete
//           </button>
//         </div>
//       )}

//       <div className="card-logo-title">
//         <img src={item.logo} alt="logo of company" />
//         <h3 className="job-title">{item.title}</h3>
//       </div>
//       <p>{item.company}</p>
//       <p>{item.location}</p>
//       <p className="card-status-time">
//         <strong>{item.status}</strong> <br />
//         <small>{item.time}</small>
//       </p>
//     </div>
//   );
// };
