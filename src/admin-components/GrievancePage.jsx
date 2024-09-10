import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';

export default function GrievancePage() {
  const { id } = useParams();
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [allotedCourse, setAllotedCourse] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:4000/grievance/selectedGrievance/${id}`)
      .then((response) => {
        setSelectedGrievance(response.data.grievanceDoc);
      })
      .catch((error) => {
        console.error("Error fetching grievance:", error);
      });
  }, [id]);

  const callEmail = async () => {
    const emailId = selectedGrievance.postedBy.email;
    await axios.post("http://localhost:4000/auth/mail", { emailId, allotedCourse })
      .then((response) => {
        alert("Student successfully notified and mailed of course allotment");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  if (!selectedGrievance) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminNavBar />
      <main className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Grievance Details</h1>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-gray-700"><strong>Name:</strong> {selectedGrievance.postedBy.username}</p>
              <p className="text-gray-700"><strong>Email Id:</strong> {selectedGrievance.postedBy.email}</p>
              <p className="text-gray-700"><strong>Class:</strong> Comps A</p>
              <p className="text-gray-700"><strong>Sem:</strong> 3</p>
              <p className="text-gray-700"><strong>Grievance:</strong></p>
              <p className="text-gray-600">{selectedGrievance.query}</p>
              <p className="text-gray-500 text-sm mt-2">
                <em>Posted At: {DateTime.fromISO(selectedGrievance.createdAt).toLocaleString(DateTime.DATETIME_MED)}</em>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Allot Course</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="courseName" className="block text-gray-700 font-medium mb-2">
                Enter Course to be Allotted:
              </label>
              <input
                type="text"
                id="courseName"
                placeholder="Course Name ..."
                onChange={ev => setAllotedCourse(ev.target.value)}
                value={allotedCourse}
                className="w-50 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              className="w-50 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition-colors duration-300"
              onClick={callEmail}
            >
              Allot Course
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
