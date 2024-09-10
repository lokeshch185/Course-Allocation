import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar() {
    const navigate = useNavigate();

    async function logout() {
        await axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
            .then((response) => {
                navigate("/");
            });
    }

    return (
        <nav className="bg-gray-200 shadow shadow-gray-300 w-full border-none">
            <div className="h-28 md:h-16 md:px-10 w-full flex items-center justify-between flex-wrap md:flex-nowrap">
                {/* Logo */}
                <div className="text-indigo-500 md:order-1 flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                    </svg>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold">Course Allocation</h1>
                        <p className="text-sm">Your Pathway to Success</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="text-gray-500 order-3 w-full md:w-auto md:order-2 flex font-semibold justify-between md:space-x-4">
                    <li className="md:px-4 md:py-2 hover:text-indigo-400 transition duration-200">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="md:px-4 md:py-2 hover:text-indigo-400 transition duration-200">
                        <Link to="/allcoursesstudent">All Courses</Link>
                    </li>
                    <li className="md:px-4 md:py-2 hover:text-indigo-400 transition duration-200">
                        <Link to="/recommend">Recommend Books</Link>
                    </li>
                    <li className="md:px-4 md:py-2 hover:text-indigo-400 transition duration-200">
                        <Link to="/fillChoice">Fill Choice</Link>
                    </li>
                    <li className="md:px-4 md:py-2 hover:text-indigo-400 transition duration-200">
                        <Link to="/grievance">Grievance</Link>
                    </li>
                </ul>

                {/* Logout Button */}
                <div className="order-2 md:order-3">
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <LogoutIcon className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
