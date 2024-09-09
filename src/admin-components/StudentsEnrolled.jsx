import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminNavBar from "./AdminNavbar";
import DataTable from "react-data-table-component"

export default function StudentsEnrolled() {
    const { id } = useParams();
    const [requiredCourse, setRequiredCourse] = useState([])
    
    
    const column=[
        {
            name:" Sr. No.",
            selector: (row, index)=> index+1,
            sortable: true
        },

        {
            name: "Name",
            selector: row=> row.username,
            sortable: true
        },

        {
            name:"Email",
            selector:row=> row.email,
            sortable: true
        }

    ]

    useEffect(() => {
        axios.get(`http://localhost:4000/course/selectedCourse/${id}`)
            .then((response) => {
                setRequiredCourse(response.data.courseDocs)
                console.log(response.data.courseDocs)
                // console.log("Successfully set Required Course")
            });
    }, [])

    console.log("required" +requiredCourse)

    if (!requiredCourse) {
        return (
            <div>No Courses Here !!</div>
        )
    }

    

    return (
        <>
        <AdminNavBar/>
        {/* <div style={{color:"black"}}>
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
        </div> */}

         


            
          <div style={{padding: "51px 195px"}}>     
          <DataTable 
              columns={column}
              data={requiredCourse.enrolled}
            
              ></DataTable>
          </div>  
                
        </>
    )
}

