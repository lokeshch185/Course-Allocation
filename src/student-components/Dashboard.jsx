// import React, { useEffect, useState } from 'react'
// import NavBar from './NavBar'
// import { jwtDecode } from "jwt-decode";
// import axios from 'axios'

// export default function Dashborad(props) {

//   const [userDetails, setUserDetails] = useState()

//   // getting token from browser cookie
//   const tokenCookie = document.cookie.match(/token=([^;]+)/)?.[1];
//   // decoding jwt token to get og payloads
//   const decodedToken = jwtDecode(tokenCookie);
//   // console.log(decodedToken)

//   useEffect((() => {
//     // console.log(decodedToken.username)
//     const username = decodedToken.username
//     axios.post("http://localhost:4000/auth/searchUser", { username })
//       .then((response) => {
//         // console.log(response.data.userDoc)
//         setUserDetails(response.data.userDoc)
//       })
//       .catch((error) => {
//         console.log(error.message)
//       })
//   }), [])

//   if (!userDetails) {
//     return ""
//   }

//   return (
//     <>
//       <NavBar />
// {/* 
//       <div className='dashboard--centre'> */}
//       <main className='dashboard--main'>
//         <div className='dashboard--first-div'>
//           <h4>Name: {decodedToken.username}</h4>
//           <h4>UID: 2021300026</h4>
//           <h4>Email Id: {decodedToken.email}</h4>
//         </div>

//         <div>
//           {
//             userDetails ? (
//               <div className='dashboard--div'>
//                 {
//                   userDetails.prev_Taken_Courses.map((course, i) => (
//                     <div key={i} className='dashboard--second-div'>
//                       <div>
//                         <button>Sem {props.sem}</button>
//                       </div>
//                       <div className='dashboard--course-details'>
//                         <p>Course Name:  {course}</p>
//                         <p>Grade:  {props.grade}</p>
//                         <p>Current Status:  <span className={props.result == "pass" ? "green" : "red"}>{props.result}</span></p>
//                       </div>
//                     </div>
//                   ))
//                 }
//               </div>
//             ) : (
//               <div>Loading User Details .. </div>
//             )}
//         </div>
//       </main>
//         {/* </div> */}

//     </>
//   )
// }

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Dashboard(props) {
  const [userDetails, setUserDetails] = useState(null);

  // getting token from browser cookie
  const tokenCookie = document.cookie.match(/token=([^;]+)/)?.[1];
  // decoding jwt token to get original payloads
  const decodedToken = tokenCookie ? jwtDecode(tokenCookie) : null;

  useEffect(() => {
    if (decodedToken && decodedToken.username) {
      const username = decodedToken.username;
      axios.post("http://localhost:4000/auth/searchUser", { username })
        .then((response) => {
          setUserDetails(response.data.userDoc);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [decodedToken]);

  if (!userDetails) {
    return <div className="flex justify-center items-center h-screen text-gray-500 text-xl">Loading User Details...</div>;
  }

  return (
    <>
      <NavBar />

      <main className="flex flex-col items-center p-8 bg-gray-200 min-h-screen">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg mb-6 w-full max-w-md text-slate-900">
          <h4 className="text-2xl font-bold text-slate-800 mb-2">User Information</h4>
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {decodedToken.username}
          </p>
          <p className="text-lg">
            <span className="font-semibold">UID:</span> 2021300026
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email Id:</span> {decodedToken.email}
          </p>
        </div>

        <div className="w-full max-w-3xl">
          {userDetails.prev_Taken_Courses && userDetails.prev_Taken_Courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {userDetails.prev_Taken_Courses.map((course, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start border-l-4 border-slate-950">
                  <button className="bg-slate-950 text-white py-2 px-6 rounded-md text-sm font-semibold mb-4">Sem {props.sem}</button>
                  <div className="text-gray-700">
                    <p className="text-lg">
                      <span className="font-semibold">Course Name:</span> {course}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Grade:</span> {props.grade}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Current Status:</span> 
                      <span className={props.result === "pass" ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                        {props.result}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No courses found.</div>
          )}
        </div>
      </main>
    </>
  );
}

