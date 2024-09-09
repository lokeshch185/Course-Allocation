import React from "react";
import NavBar from "./NavBar";
import { nanoid } from "nanoid";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Grievance() {
  const [grievanceData, setGrievanceData] = React.useState([]);
  const nav = useNavigate()

  async function handleSubmit(event) {
      event.preventDefault();
      console.log(grievanceData)
      const query = grievanceData
      await axios.post("http://localhost:4000/grievance/addGrievance" , {query} , {withCredentials : true})
      .then((response) => {
        alert("Grievance form submitted successfully")
        nav("/dashboard")
      })
      .catch((error) => {
        alert("Error While Submitting Grievance")
      })
  }

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit} className="grievance--form">
        <h4>Grievance form</h4>
        <div className="grievance--div">
          <textarea
            placeholder="Enter your grievance"
            name="grievance"
            onChange={ev => setGrievanceData(ev.target.value)}
            value={grievanceData}
          />
          <button>SUBMIT</button>
        </div>
      </form>
    </>
  );
}
