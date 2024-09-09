import React, { useState, useEffect } from 'react'

import './App.css'
import { Routes, Route, Link, useNavigate } from "react-router-dom"

import Login from './student-components/Login'
import Register from './student-components/Register'
import RegisterInstructor from './student-components/RegisterInstructor'
import RegisterStudent from './student-components/RegisterStudent'

import NavBar from './student-components/NavBar'
import Dashboard from './student-components/Dashboard'
import AllCourses from './admin-components/AllCourses'
import FillChoice from './student-components/FillChoice'
import Grievance from './student-components/Grievance'
import Alloted from './student-components/Alloted'
import CourseNotAlloted from './student-components/CourseNotAlloted'
import Recommender from './student-components/Recommender'

import AdminNavBar from './admin-components/AdminNavbar'
import EditCourse from './admin-components/EditCourse'
import NotAlloted from './admin-components/NotAlloted'
import AdminGrievance from './admin-components/AdminGrievance'

import CreateCourse from './admin-components/CreateCourse'
import Course from './admin-components/Course'
import StudentsEnrolled from './admin-components/StudentsEnrolled'

import { nanoid } from "nanoid"

import cookingImg from "./images/cooking.png"
import AllCoursesStudent from './student-components/AllCoursesStudent'
import GrievancePage from './admin-components/GrievancePage'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

const navigate= useNavigate();
const [input, setInput] = React.useState({
    coursename: "",
    intake: "",
    instructor: "",
    image: "",
})

   
    const [courses, setCourses] = React.useState([])
    const [editToggle, setEditToggle] = React.useState(null)


        console.log(courses)
        
        // console.log(input)
        const editHandler = (id, coursename, intake, instructor, image) => {
            setEditToggle(id)
            setInput((prevInput)=> (
             
                   {
                ...prevInput,
                coursename:input.coursename,
                intake:input.intake,
                instructor:input.instructor,
                image:input.image
                }

            ))
        }
        
        const saveHandler = () => {
            if(editToggle) {
                setCourses(courses.map((course) => (
                    course.id === editToggle ?
                    {...course, 
                        coursename:input.coursename,
                        intake:input.intake,
                        instructor:input.instructor,
                        image:input.image
                    }
                    : course
                )))
            } 
            
            else {
                setCourses((prevCourses) => [
                    ...prevCourses, {
                        id: nanoid(),
                        coursename:input.coursename,
                        intake:input.intake,
                        instructor:input.instructor,
                        image:input.image
                    }
                ])

        }

        setInput("")
        setEditToggle(null)
    }

    const deleteHandler = (id) => {
        const newcourses = courses.filter(n => n.id !== id)
        setCourses(newcourses)
        
    }

    console.log("after deleting: "+ courses);

        //you made this function
        function handleClick(id)
        {
            courses.map((course)=>
            {
                if(course.id==id)
               { 

                <StudentsEnrolled
                    id={course.id}
                    name={course.coursename} />
                return navigate('/studentsenrolled/')
            }
        }
        )
    }

    // backend
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("courses"));
        if (data) {
            setCourses(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);



    return (

        <DndProvider backend={HTML5Backend}>
            <div>

                <div>
                    <Routes>
                        <Route path="/" element={< Login />} />
                        <Route path="/recommend" element={<Recommender />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/registerinstructor" element={<RegisterInstructor />} />
                        <Route path="/registerstudent" element={<RegisterStudent />} />
                        <Route path="/studentsenrolled/:id" element={<StudentsEnrolled />} />
                        <Route path="/grievancepage/:id" element={<GrievancePage />} />
                        <Route path="/dashboard" element={<Dashboard 
                            sem = {5}
                            grade = {"AA"}
                            result = {"pass"}
                            />}/>

                        <Route path="/fillChoice" element={<FillChoice
                            courses={courses} />} />

                        <Route path="/grievance" element={<Grievance />} />


                        <Route path='/studentsenrolled' element={<StudentsEnrolled />} />
                        <Route path='/alloted' element={<Alloted />} />
                        <Route path='/coursenotalloted' element={<CourseNotAlloted />} />

                        {/* <Route path='/grievancepage' element={<GrievancePage />} /> */}


                        <Route path="/allcourses" element={<AllCourses
                            courses={courses}
                            handleClick={handleClick}
                        />}
                        />

                        <Route path="/allcoursesstudent" element={<AllCoursesStudent
                            courses={courses}
                        />} />

         <Route  path="/editcourse" element={<EditCourse
                                             
                                             courses={courses}
                                             setCourses={setCourses}
                                             input={input}
                                             setInput={setInput}
                                             editToggle={editToggle}
                                             setEditToggle={setEditToggle}
                                             editHandler={editHandler}
                                             saveHandler={saveHandler}
                                             deleteHandler={deleteHandler}


                        />} />
                        <Route path="/notalloted" element={<NotAlloted />} />
                        <Route path="/admingrievance" element={<AdminGrievance />} />

                    </Routes>
                </div>


            </div>

        </DndProvider>

    )
}

export default App
