import React from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function AdminNavBar(){

    const navigate = useNavigate()

    async function logout() {
        await axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
            .then((response) => {
                navigate("/")
            })
    }

    return(
        <nav className="navbar--nav">

            <div className="navbar--div">
                <h1>Course Allocation </h1>
                <p>Your Pathway to success</p>
            </div>
            <ul className="navbar--ul admin-navbar--ul">
                <li><Link to="/allcourses">All Courses</Link></li>
                <li><Link to="/editcourse">Edit Course</Link></li>
                {/* <li><Link to="/notalloted">Not Alloted</Link></li> */}
                <li><Link to="/admingrievance">Grievance</Link></li>
                <LogoutIcon 
                    onClick={logout}
                    sx ={{
                        alignItems : "center" ,
                        justifyContent : "flex-end" ,
                        padding : "10"
                    }}
                />
            </ul>
        </nav>
    )
}