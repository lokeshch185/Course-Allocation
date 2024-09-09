import React from "react";
import registerImage from "../images/register.png";
import Login from "./Login";
import profileLogo from "../images/user.png";
import headerImage from "../images/header.png";

export default function RegisterInstructor() {
  const [instructorData, setInstructorData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  //console.log(instructorData)
  function handleChange(event) {
    console.log("rendered once");
    const { type, value, checked, name } = event.target;

    setInstructorData((prevadminData) => {
      return {
        ...prevadminData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // submittoApi(instructorData)
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
            <h4>Register Instructor</h4>
          </div>

          <div className="register--div">
            <div>
              <label htmlFor="nameid" className="block">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="nameid"
                placeholder="Name"
                onChange={handleChange}
                value={instructorData.name}
                className="login--form-input-design"
              />
            </div>

            <div>
              <label htmlFor="emailid" className="block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="emailid"
                placeholder="Email"
                onChange={handleChange}
                value={instructorData.email}
                className="register--form-input-design"
              />
            </div>

            <div>
              <label htmlFor="passwordid" className="block">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="passwordid"
                placeholder="Password"
                onChange={handleChange}
                value={instructorData.password}
                className="register--form-input-design"
              />
            </div>

            <button className="nodecor submit">SUBMIT</button>

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
