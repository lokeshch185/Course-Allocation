import React, { useEffect, useState } from "react"
import AdminNavBar from "./AdminNavbar"
import Grievance from "../student-components/Grievance"
import axios from "axios"
import { DateTime } from 'luxon';
import { useNavigate, Link } from "react-router-dom"


export default function AdminGrievance() {

    const [allGrievance, setAllGrievance] = useState([])
    const navigate = useNavigate()

    useEffect((() => {

        axios.get("http://localhost:4000/grievance/allGrievance")
            .then((response) => {
                setAllGrievance(response.data.grievanceDocs)
                // console.log(response.data.grievanceDocs)
                // console.log(allGrievance)
            })
            .catch((error) => {
                alert("error while fetching all grievances ")
            })
    }), [])

    function handleClick(id)
    {
        navigate(`/grievancepage/${id}`)
    }

    return (

        <>
            <AdminNavBar />
            <div className="admingrievance--outermost-div">
            <div className="admingrievance--main-div" >
            {allGrievance.map((each, i) => (
                    <div className="admingrievance--sub-div"  onClick={()=>handleClick(each._id)}>
                        <div className="admingrievance--p-div">
                            <div>
                                <p>{each.query}</p>
                                {/* <h5><em>ID : {each._id}</em></h5> */}
                                <h5><em>Posted By : {each.postedBy.username}</em></h5>
                                <h5><em>Posted At : {DateTime.fromISO(each.createdAt).toLocaleString(DateTime.DATETIME_MED)}</em></h5>
                            </div>
                        </div>
                    </div>
                    //  <button><Link to={`/grievancepage/${each._id}`}>Expand Grievance</Link></button> 

                    ))}

            </div>
            </div>
        </>
    )
}