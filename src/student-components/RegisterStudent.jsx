// import React, { useState } from "react";
// import registerImage from "../images/login.png";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// export default function RegisterStudent() {
//   const navigate = useNavigate();
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [role, setRole] = React.useState('Student');
//   const [branch, setBranch] = React.useState('Comps');
//   const [uid, setUID] = React.useState('1');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setIsSubmitting(true);
//     await axios.post("http://localhost:4000/auth/register", { username, email, branch, uid, password, role })
//       .then((response) => {
//         alert("Successfully registered!", response);
//         setIsSubmitting(false);
//         navigate("/");
//       })
//       .catch((error) => {
//         alert("Error While Registering", error.message);
//         setIsSubmitting(false);
//       });
//   }

//   return (
//     <section
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${registerImage})` }}
//     >
//       <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for better contrast */}
      
//       {/* Title Section */}
//       <div className="relative z-10 text-white px-12 lg:px-24 w-2/3">
//                 <h1 className="text-6xl font-bold mb-10">COURSE ALLOCATION SYSTEM</h1>
//                 <h1 className="text-2xl mb-10">Streamline your course allocation with ease</h1>
//             </div>

//       {/* Registration Form */}
//       <form
//         onSubmit={handleSubmit}
//         className={`relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl p-10 backdrop-blur-md w-full max-w-lg mx-20 transition-transform duration-700 ease-in-out ${isSubmitting ? 'translate-x-full' : ''}`}
//       >
//         <h4 className="text-3xl font-semibold text-gray-800 text-center mb-6">Register Student</h4>

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="nameid" className="block text-gray-700 text-sm font-medium mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="nameid"
//               placeholder="Name"
//               onChange={ev => setUsername(ev.target.value)}
//               value={username}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="emailid" className="block text-gray-700 text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="emailid"
//               placeholder="Email"
//               onChange={ev => setEmail(ev.target.value)}
//               value={email}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="uidid" className="block text-gray-700 text-sm font-medium mb-1">
//               UID
//             </label>
//             <input
//               type="number"
//               id="uidid"
//               placeholder="UID"
//               onChange={ev => setUID(ev.target.value)}
//               value={uid}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="branchid" className="block text-gray-700 text-sm font-medium mb-1">
//               Branch
//             </label>
//             <select
//               name="branch"
//               id="branchid"
//               onChange={ev => setBranch(ev.target.value)}
//               value={branch}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="comps">Comps</option>
//               <option value="it">IT</option>
//               <option value="ds">CSE-DS</option>
//               <option value="aiml">CSE-AIML</option>
//               <option value="extc">EXTC</option>
//               <option value="etrx">ETRX</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="passwordid" className="block text-gray-700 text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="passwordid"
//               placeholder="Password"
//               onChange={ev => setPassword(ev.target.value)}
//               value={password}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'SUBMIT'}
//           </button>

//           <p className="text-center text-gray-700 mt-4">
//             Already registered?{" "}
//             <a href="/" className="text-blue-500 hover:underline transition-all duration-300">
//               Login here
//             </a>
//           </p>
//         </div>
//       </form>
//     </section>
//   );
// }

import React, { useState } from "react";
import registerImage from "../images/login.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('Student');
  const [branch, setBranch] = React.useState('Comps');
  const [uid, setUID] = React.useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true); // New state to handle form visibility

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    await axios.post("http://localhost:4000/auth/register", { username, email, branch, uid, password, role })
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
          <h4 className="text-3xl font-semibold text-gray-800 text-center mb-6">Register Student</h4>

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
            <label htmlFor="uidid" className="block text-gray-700 text-sm font-medium mb-1">
              UID
            </label>
            <input
              type="number"
              id="uidid"
              placeholder="UID"
              onChange={ev => setUID(ev.target.value)}
              value={uid}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="branchid" className="block text-gray-700 text-sm font-medium mb-1">
              Branch
            </label>
            <select
              name="branch"
              id="branchid"
              onChange={ev => setBranch(ev.target.value)}
              value={branch}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="comps">Comps</option>
              <option value="it">IT</option>
              <option value="ds">CSE-DS</option>
              <option value="aiml">CSE-AIML</option>
              <option value="extc">EXTC</option>
              <option value="etrx">ETRX</option>
            </select>
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
