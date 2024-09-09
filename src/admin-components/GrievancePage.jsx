import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';


export default function GrievancePage() {
  const { id } = useParams();
  const [selectedGrievance, setSelectedGrievance] = useState()
  const [allotedCourse, setAllotedCourse] = useState()

  useEffect(() => {
    axios.get(`http://localhost:4000/grievance/selectedGrievance/${id}`)
      .then((response) => {
        setSelectedGrievance(response.data.grievanceDoc)
        console.log(response.data.grievanceDoc)
        console.log(selectedGrievance)
      });
  }, [])

  const callEmail = async () => {
    const emailId = selectedGrievance.postedBy.email
    await axios.post("http://localhost:4000/auth/mail" , { emailId, allotedCourse })
    .then((response) => {
      console.log(response.data)
      alert("Student Successfully Notified and Mailed of Course Allotment")
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  if (!selectedGrievance) {
    return ""
  }

  return (
    <>
      <AdminNavBar />
      <main className="grievancepage--main">
        <div className="grievancepage--div">
          <div className="grievancepage--p-div">
            <p>Name: {selectedGrievance.postedBy.username}</p>
            <p>Email Id : {selectedGrievance.postedBy.email}</p>
            <p>Class: Comps A</p>
            <p>Sem: 3</p>
            <p className="space">Grievance : </p>
            <p className="justify">
              {selectedGrievance.query}
            </p>
            <em className="grievancepage--botom-right">
              Posted At : {DateTime.fromISO(selectedGrievance.createdAt).toLocaleString(DateTime.DATETIME_MED)}
            </em>
          </div>
        </div>

        <div className="grievancepage--form">
          <div>
            <label htmlFor="nameid" className="block">
              Enter Course to be Alloted :
            </label>
            <input
              type="text"
              // name="username"
              id="nameid"
              placeholder="Course Name ... "
              onChange={ev => setAllotedCourse(ev.target.value)}
              value={allotedCourse}
              className="registerstudent--form-input-design"
            />
            <button className="grievancepage--button" onClick={callEmail}>Allot Course</button>
          </div>
        </div>


      </main>
    </>
  );
}
