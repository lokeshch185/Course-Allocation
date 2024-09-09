import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function StudentsEnrolled() {
    const { id } = useParams();
    const [requiredCourse, setRequiredCourse] = useState()


    useEffect(() => {
        axios.get(`http://localhost:4000/course/selectedCourse/${id}`)
            .then((response) => {
                setRequiredCourse(response.data.courseDocs)
                console.log(response.data.courseDocs)
                // console.log("Successfully set Required Course")
            });
    }, [])

    if (!requiredCourse) {
        return (
            <div>No Courses Here !!</div>
        )
    }

    return (
        <div style={{color:"black"}}>
            <h1>{requiredCourse.name} Classroom 👨🏼‍🏫👩🏼‍🏫 </h1>
            <h2>Course Incharge : Prof. {requiredCourse.prof_Incharge}</h2>
            <h2>Course Intake Capacity : {requiredCourse.intake_Capacity}</h2>
            <h2>Number of Students Currently Enrolled : {requiredCourse.current_Enrolled_Count}</h2>
            <h2>Sr. No. , Student Name , Student Email</h2>
            {
            requiredCourse.enrolled.map((student , i) => (
                <div key ={i}>
                    <span>{i+1} - </span>
                    <span>{student.username} - </span>
                    <span>{student.email}</span>
                </div>
            ))
            }  
        </div>
    )
}

