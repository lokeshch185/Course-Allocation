import React from "react";
import registerImage from "../images/register.png";
import Login from "./Login";
import profileLogo from "../images/user.png";
import headerImage from "../images/header.png";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function RegisterStudent() {

  const navigate = useNavigate()
  // mandatory
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('Student');

  // choice
  const [branch, setBranch] = React.useState('Comps');
  const [uid, setUID] = React.useState('1');

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("http://localhost:4000/auth/register" , { username , email , branch , uid , password , role})
    .then((response) => {
      // console.log(response)
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
        <form
          onSubmit={handleSubmit}
          className="register--form  registerstudent--form"
        >
          <div>
            <img src={profileLogo} alt="Profile Logo" />
            <h4>Register Student</h4>
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
              <label htmlFor="uidid" className="block">
                UID
              </label>
              <input
                type="number"
                // name="uid"
                id="uidid"
                placeholder="UID"
                onChange={ev => setUID(ev.target.value)}
                value={uid}
                className="registerstudent--form-input-design"
              />
            </div>

            <div>
              <label htmlFor="branchid" className="block">
                Branch
              </label>
              <select
                name="branch"
                id="branchid"
                onChange={ev => setBranch(ev.target.value)}
                value={branch}
              >
                <option value="comps">Comps</option>
                <option value="it">IT</option>
                <option value="ds">CSE-DS</option>
                <option value="aiml">CSE-AIML</option>
                <option value="extc">EXTC</option>
                <option value="etrx">ETRX</option>
              </select>
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
              {/* <a href="/allcoursesstudent">SUBMIT</a> */}
              <a>SUBMIT</a>
            </button>

            <p>
              Already registered?
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
