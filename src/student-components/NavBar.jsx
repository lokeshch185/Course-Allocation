import React from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar() {

    const navigate = useNavigate()

    async function logout() {
        await axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
            .then((response) => {
                navigate("/")
            })
    }

    return (
        <nav className="navbar--nav">

            <div className="navbar--div">
                <h1>Course Allocation </h1>
                <p>Your Pathway to success</p>
            </div>
            <ul className="navbar--ul">
                
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/allcoursesstudent">All Courses</Link></li>
                <li><Link to="/recommend">Recommend Books</Link></li>
                <li><Link to="/fillChoice">Fill Choice</Link></li>
                <li><Link to="/grievance">Grievance</Link></li>
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