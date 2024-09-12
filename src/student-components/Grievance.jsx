import React from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Grievance() {
  const [grievanceData, setGrievanceData] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/grievance/addGrievance", { grievance: grievanceData }, { withCredentials: true });
      alert("Grievance form submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Error While Submitting Grievance");
    }
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center bg-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Submit Your Grievance</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                placeholder="Enter your grievance here..."
                name="grievance"
                onChange={(ev) => setGrievanceData(ev.target.value)}
                value={grievanceData}
                className="w-full h-40 p-3 border border-gray-300 bg-gray-100 text-black rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
