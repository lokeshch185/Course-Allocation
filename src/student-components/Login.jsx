import React from 'react'
import Register from './Register'
import RegisterInstructor from './RegisterInstructor';
import RegisterStudents from './RegisterStudent';
import loginImage from '../images/login.png';
import headerImage from '../images/header.png'
import AllCourses from '../admin-components/AllCourses';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate()
    const [redirect , setRedirect] = React.useState(false)
    const [username , setUsername] = React.useState("")
    const [formData, setFormData] = React.useState({

        role: "Student",
        password: "",
        forget: false

    })


    function handleChange(event) {
        const { type, value, checked, name } = event.target

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type == "checkbox" ? checked : value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const role = formData.role
        const password = formData.password

        console.log(username, password, role)

        await axios.post("http://localhost:4000/auth/login", { username, password, role  } ,{withCredentials : true })
            .then((response) => {
                alert("User LoggedIn Successfully")
                setRedirect(true)
                console.log(redirect)
            })
            .catch((error) => {
                alert("Error While Logginin ", error.message)
            })

            if(redirect && role === "Admin") {
                navigate("/allcourses")
            }
            if(redirect && role === "Student") {
                navigate("/dashboard")
                console.log("redircet")
            }
    }


    let nextpage;

    if (formData.role == "Student") {
        nextpage = "registerstudent"
    }
    else if (formData.role == "Admin") {
        nextpage = "register"
    }
    else {
        nextpage = "registerinstructor"
    }

    return (

        <>

            <header className='login--header'>
                <img src={headerImage} alt="header" />
                <div className="navbar--div login--seva-satva" >
                    <h1>Course Allocation System</h1>
                    <p>Your Pathway to success</p>
                </div>
            </header>

            <section className='login--section'>
                <form onSubmit={handleSubmit} className="login--form">

                    <div>
                        <h4 className='form-h4'>Sign in</h4>
                    </div>

                    <div className='login--div'>

                        <div>
                            <label htmlFor="roleid" className='block'>Role</label>
                            <select
                                name="role"
                                id="roleid"
                                onChange={handleChange}
                                value={formData.role}>

                                <option value="Student">Student</option>
                                {/* <option value="Instructor">Instructor</option> */}
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="nameid" className="block">
                                Name
                            </label>
                            <input
                                type="text"
                                // name="username"
                                id="nameid"
                                placeholder="Name"
                                onChange={ev => setUsername(ev.target.value)}
                                value={username}
                                className="registerstudent--form-input-design"
                            />
                        </div>

                        <div>
                            <label htmlFor="passwordid" className='block'>Password</label>
                            <input type="password"
                                name="password"
                                id="passwordid"
                                placeholder='Password'
                                onChange={handleChange}
                                value={formData.password}
                                className='login--form-input-design'
                            />
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                id="forget"
                                name="forget"
                                checked={formData.forget}
                                onChange={handleChange}
                            />

                            <label className="login--forget-label" htmlFor="forget">Forget password</label>
                        </div>

                        {/* <button><a href="/allcourses" className='nodecor'>Sign in</a></button> */}
                        <button><a className='nodecor'>Sign in</a></button>

                        <p>Don't have an account? <a href={nextpage} className='nodecor'>Register Here</a></p>
                    </div>


                </form>

                <img src={loginImage} alt="loginImage" className='login--img' />
            </section>
        </>
    )
}
