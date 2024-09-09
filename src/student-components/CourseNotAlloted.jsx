import React from "react";
import NavBar from "./NavBar";

export default function CourseNotAlloted() {
  return (
    <>
      <NavBar />

       <h2 className="heading1">You have not been alloted any course</h2>
      <div className="wrapper">
        <div className="container">
          <h2 className="heading2">To Contact Admin</h2>
          <div className="details">
            <h2>Admin Details</h2>
            <p>Name:Prof Trivedi</p>
            <p>Room no:401 Cabin no:4</p>
          </div>
          <button className="grievancepage--button">Fill grievence</button>
        </div>
      </div>
    </>
  );
}
