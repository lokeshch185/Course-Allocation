
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/login.png'; // Background image

export default function Login() {
    const navigate = useNavigate();
    const [redirect, setRedirect] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [formData, setFormData] = React.useState({
        role: "Student",
        password: "",
        forget: false,
    });

    function handleChange(event) {
        const { type, value, checked, name } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const { role, password } = formData;

        console.log(username, password, role);

        await axios
            .post(
                "http://localhost:4000/auth/login",
                { username, password, role },
                { withCredentials: true }
            )
            .then((response) => {
                alert("User Logged In Successfully");
                setRedirect(true);
            })
            .catch((error) => {
                alert("Error While Logging in", error.message);
            });

        if (redirect && role === "Admin") {
            navigate("/allcourses");
        }
        if (redirect && role === "Student") {
            navigate("/dashboard");
        }
    }

    let nextpage;
    if (formData.role === "Student") {
        nextpage = "registerstudent";
    } else if (formData.role === "Admin") {
        nextpage = "register";
    } else {
        nextpage = "registerinstructor";
    }

    return (
        <section className="flex items-center justify-between min-h-screen bg-cover bg-center relative"
                 style={{ backgroundImage: `url(${loginImage})` }}>
            <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for better contrast */}
            
            {/* Left Side Title */}
            <div className="relative z-10 text-white px-12 lg:px-24 w-2/3">
                <h1 className="text-6xl font-bold mb-5">COURSE ALLOCATION SYSTEM</h1>
                <h1 className="text-2xl mb-10">Streamline your course allocation with ease</h1>
            </div>
            
            {/* Sign In Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-90 shadow-xl rounded-xl px-8 py-10 z-10 w-full max-w-lg mx-20 relative backdrop-blur-md"
            >
                <div className="text-center mb-6">
                    <h4 className="text-4xl font-semibold text-gray-800">Sign in</h4>
                </div>

                <div className="mb-4">
                    <label htmlFor="roleid" className="block text-gray-700 text-sm font-medium mb-2">
                        Role
                    </label>
                    <select
                        name="role"
                        id="roleid"
                        onChange={handleChange}
                        value={formData.role}
                        className="shadow-md appearance-none border rounded-lg w-full py-3 px-3 text-gray-300 focus:outline-none focus:shadow-outline"
                    >
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="nameid" className="block text-gray-700 text-sm font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="nameid"
                        placeholder="Name"
                        onChange={(ev) => setUsername(ev.target.value)}
                        value={username}
                        className="shadow-md appearance-none border rounded-lg w-full py-3 px-3 text-gray-200 focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="passwordid" className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="passwordid"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password}
                        className="shadow-md appearance-none border rounded-lg w-full py-3 px-3 text-gray-200 focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="forget"
                        name="forget"
                        checked={formData.forget}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-sm text-gray-800" htmlFor="forget">
                        Forget password
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline"
                >
                    Sign in
                </button>

                <p className="mt-6 text-center text-gray-700">
                    Don't have an account?{" "}
                    <a href={nextpage} className="text-blue-500 hover:underline">
                        Register Here
                    </a>
                </p>
            </form>
        </section>
    );
}

