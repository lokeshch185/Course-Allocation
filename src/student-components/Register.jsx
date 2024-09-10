// import React from "react";
// import registerImage from "../images/login.png";
// import Login from "./Login";
// import profileLogo from "../images/user.png";
// import headerImage from "../images/header.png";
// import axios from "axios"
// import { useNavigate } from "react-router-dom";

// export default function Register() {
  
//   const navigate = useNavigate()
//   // mandatory
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [role, setRole] = React.useState('Admin');


//   async function handleSubmit(event) {
//     event.preventDefault();
//     await axios.post("http://localhost:4000/auth/register" , { username , email , password , role})
//     .then((response) => {
//       alert("successfully registered !!" , response)
//       navigate("/")
//     })
//     .catch((error) => {
//       alert("Error While Registering " , error.message)
//     })
//   }

//   return (
//     <>
//       <section className="register--section">
//         <form onSubmit={handleSubmit} className="register--form">
//           <div>
//             <h4>Register Admin</h4>
//           </div>

//           <div className="register--div">
//           <div>
//               <label htmlFor="nameid" className="block">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 // name="username"
//                 id="nameid"
//                 placeholder="Name"
//                 onChange={ev => setUsername(ev.target.value)}
//                 value={username}
//                 className="registerstudent--form-input-design"
//               />
//             </div>

//             <div>
//               <label htmlFor="emailid" className="block">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 // name="email"
//                 id="emailid"
//                 placeholder="Email"
//                 onChange= {ev => setEmail(ev.target.value)}
//                 value={email}
//                 className="registerstudent--form-input-design"
//               />
//             </div>

//             <div>
//               <label htmlFor="passwordid" className="block">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 // name="password"
//                 id="passwordid"
//                 placeholder="Password"
//                 onChange={ev => setPassword(ev.target.value)}
//                 value={password}
//                 className="registerstudent--form-input-design"
//               />
//             </div>

//             <button className="nodecor submit">
//               {/* {" "} */}
//               {/* <a href="/allcourses">SUBMIT</a> */}
//               <a>SUBMIT</a>
//             </button>

//             <p>
//               Already registered?{" "}
//               <a href="/" className="nodecor">
//                 Login here
//               </a>
//             </p>
//           </div>
//         </form>

//         <img
//           src={registerImage}
//           alt="registerImage"
//           className="register--img"
//         />
//       </section>
//     </>
//   );
// }


import React, { useState } from "react";
import registerImage from "../images/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('Admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true); // State to control form visibility for smooth transition

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    await axios.post("http://localhost:4000/auth/register", { username, email, password, role })
      .then((response) => {
        alert("Successfully registered!", response);
        setIsSubmitting(false);
        navigate("/");
      })
      .catch((error) => {
        alert("Error While Registering", error.message);
        setIsSubmitting(false);
      });
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${registerImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for better contrast */}

      {/* Title Section */}
      <div className="relative z-10 text-white px-12 lg:px-24 w-2/3">
          <h1 className="text-6xl font-bold mb-10">COURSE ALLOCATION SYSTEM</h1>
          <h1 className="text-2xl mb-10">Streamline your course allocation with ease</h1>
      </div>

      {/* Registration Form with smooth transition */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className={`relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl p-10 backdrop-blur-md w-full max-w-lg mx-20 transition-all duration-700 ease-in-out ${isSubmitting ? 'translate-x-full opacity-0' : 'opacity-100'}`}
        >
          <h4 className="text-3xl font-semibold text-gray-800 text-center mb-6">Register Admin</h4>

          <div className="space-y-4">
            {/* Form Inputs */}
            <div>
              <label htmlFor="nameid" className="block text-gray-700 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="nameid"
                placeholder="Name"
                onChange={ev => setUsername(ev.target.value)}
                value={username}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="emailid" className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="emailid"
                placeholder="Email"
                onChange={ev => setEmail(ev.target.value)}
                value={email}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="passwordid" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="passwordid"
                placeholder="Password"
                onChange={ev => setPassword(ev.target.value)}
                value={password}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'SUBMIT'}
            </button>

            <p className="text-center text-gray-700 mt-4">
              Already registered?{" "}
              <a
                href="/"
                className="text-blue-500 hover:underline transition-all duration-300"
                onClick={() => {
                  setShowForm(false); // Hide the form smoothly
                  setTimeout(() => navigate("/"), 300); // Add delay before navigation
                }}
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
