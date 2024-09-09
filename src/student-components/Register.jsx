import React from "react";
import registerImage from "../images/register.png";
import Login from "./Login";
import profileLogo from "../images/user.png";
import headerImage from "../images/header.png";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Register() {
  
  const navigate = useNavigate()
  // mandatory
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('Admin');


  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("http://localhost:4000/auth/register" , { username , email , password , role})
    .then((response) => {
      alert("successfully registered !!" , response)
      navigate("/")
    })
    .catch((error) => {
      alert("Error While Registering " , error.message)
    })
  }

  return (
    <>
      <header className="login--header">
        <img src={headerImage} alt="header" />
        <div className="navbar--div login--seva-satva">
          <h1>Course Allocation </h1>
          <p>Your Pathway to success</p>
        </div>
      </header>

      <section className="register--section">
        <form onSubmit={handleSubmit} className="register--form">
          <div>
            <img src={profileLogo} alt="Profile Logo" />
            <h4>Register Admin</h4>
          </div>

          <div className="register--div">
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
              <label htmlFor="emailid" className="block">
                Email
              </label>
              <input
                type="email"
                // name="email"
                id="emailid"
                placeholder="Email"
                onChange= {ev => setEmail(ev.target.value)}
                value={email}
                className="registerstudent--form-input-design"
              />
            </div>

            <div>
              <label htmlFor="passwordid" className="block">
                Password
              </label>
              <input
                type="password"
                // name="password"
                id="passwordid"
                placeholder="Password"
                onChange={ev => setPassword(ev.target.value)}
                value={password}
                className="registerstudent--form-input-design"
              />
            </div>

            <button className="nodecor submit">
              {/* {" "} */}
              {/* <a href="/allcourses">SUBMIT</a> */}
              <a>SUBMIT</a>
            </button>

            <p>
              Already registered?{" "}
              <a href="/" className="nodecor">
                Login here
              </a>
            </p>
          </div>
        </form>

        <img
          src={registerImage}
          alt="registerImage"
          className="register--img"
        />
      </section>
    </>
  );
}
