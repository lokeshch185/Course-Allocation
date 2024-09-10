import React, { useEffect, useState } from "react"
import AdminNavBar from "./AdminNavbar"
import axios from "axios"
import { DateTime } from 'luxon'
import { useNavigate } from "react-router-dom"
import './styles.css' // Make sure to include this CSS file

export default function AdminGrievance() {
    const [allGrievance, setAllGrievance] = useState([])
    const [hoveredId, setHoveredId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:4000/grievance/allGrievance")
            .then((response) => {
                setAllGrievance(response.data.grievanceDocs)
            })
            .catch((error) => {
                alert("Error while fetching all grievances")
            })
    }, [])

    function handleClick(id) {
        navigate(`/grievancepage/${id}`)
    }

    return (
        <>
            <AdminNavBar />
            <div className="p-6 bg-gray-200 min-h-screen">
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allGrievance.map((each) => (
                        <div
                            key={each._id}
                            className={`bg-white rounded-lg shadow-lg p-4 transition-transform duration-300 ease-in-out transform ${
                                hoveredId === each._id ? "scale-105 z-10" : "hover:scale-95"
                            } ${hoveredId !== null && hoveredId !== each._id ? "slight-blur" : ""}`}
                            onClick={() => handleClick(each._id)}
                            onMouseEnter={() => setHoveredId(each._id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="flex flex-col h-full">
                                <p className="text-gray-800 mb-2">{each.query}</p>
                                <div className="flex flex-col mt-auto">
                                    <h5 className="text-gray-600 text-sm mb-1">
                                        <em>Posted By: {each.postedBy.username}</em>
                                    </h5>
                                    <h5 className="text-gray-500 text-xs">
                                        <em>Posted At: {DateTime.fromISO(each.createdAt).toLocaleString(DateTime.DATETIME_MED)}</em>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
