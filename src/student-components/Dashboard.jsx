import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

export default function Dashborad(props) {

  const [userDetails, setUserDetails] = useState()

  // getting token from browser cookie
  const tokenCookie = document.cookie.match(/token=([^;]+)/)?.[1];
  // decoding jwt token to get og payloads
  const decodedToken = jwtDecode(tokenCookie);
  // console.log(decodedToken)

  useEffect((() => {
    // console.log(decodedToken.username)
    const username = decodedToken.username
    axios.post("http://localhost:4000/auth/searchUser", { username })
      .then((response) => {
        // console.log(response.data.userDoc)
        setUserDetails(response.data.userDoc)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }), [])

  if (!userDetails) {
    return ""
  }

  return (
    <>
      <NavBar />
{/* 
      <div className='dashboard--centre'> */}
      <main className='dashboard--main'>
        <div className='dashboard--first-div'>
          <h4>Name: {decodedToken.username}</h4>
          <h4>UID: 2021300026</h4>
          <h4>Email Id: {decodedToken.email}</h4>
        </div>

        <div>
          {
            userDetails ? (
              <div className='dashboard--div'>
                {
                  userDetails.prev_Taken_Courses.map((course, i) => (
                    <div key={i} className='dashboard--second-div'>
                      <div>
                        <button>Sem {props.sem}</button>
                      </div>
                      <div className='dashboard--course-details'>
                        <p>Course Name:  {course}</p>
                        <p>Grade:  {props.grade}</p>
                        <p>Current Status:  <span className={props.result == "pass" ? "green" : "red"}>{props.result}</span></p>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div>Loading User Details .. </div>
            )}
        </div>
      </main>
        {/* </div> */}

    </>
  )
}