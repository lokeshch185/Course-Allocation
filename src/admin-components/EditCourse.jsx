import React, { useEffect, useState } from 'react'
import CreateCourse from './CreateCourse'
import { nanoid } from 'nanoid'
import deleteImg from '../images/delete.png'
import Course from './Course'
import cookingImg from "../images/cooking.png"
import AllCourses from './AllCourses'
import AdminNavBar from './AdminNavbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export default function EditCourse({ editToggle, input, saveHandler, setInput, editHandler }) {

    const [courses, setCourses] = useState([])
    const navigate = useNavigate()
    const {tusiKyaKrRaheHo} = useParams()

    useEffect((() => {
        axios.get("http://localhost:4000/course/allCourse")
            .then((response) => {
                setCourses(response.data.courseDocs)
            })
    }), [])

    const allotCourseHandle = async (courseName) => {
        const name = courseName
        await axios.post("http://localhost:4000/course/allotCourse", { name })
            .then((response) => {
                console.log(response)
                alert(`Students Alloted Course ${courseName} Successfully !!`)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const deleteHandler = async (id) => {
        const tusiKyaKrRaheHo = id 
        await axios.post(`http://localhost:4000/course/deleteCourse/${tusiKyaKrRaheHo}`)
        .then((response) => { 
            alert(`${response.data.courseDoc.name} Course Deleted Successfully !`)
            const newCourseList = courses.filter((c) => c._id !== id) 
            setCourses(newCourseList)
            // console.log(response)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }


    return (
        <>
            < AdminNavBar />
            
            <main className="allcourse--main">
                {/* {
            courses.map((course) => (
                editToggle === course.id ?
                <CreateCourse 
                input ={input}
                setInput  = {setInput} 
                saveHandler = {saveHandler}
                />
                :
                
                <Course
                    key={course.id}
                    id={course.id}
                    coursename={course.coursename}
                    intake={course.intake}
                    instructor={course.instructor}
                    image={course.image}
                    editHandler = {editHandler}
                    deleteHandler= {deleteHandler}
                >
                </Course>
               
            ))
        }


        {
            editToggle === null ? 
            <CreateCourse 
            input ={input}
            setInput  = {setInput } 
            saveHandler = {saveHandler}
        /> : <></>
        } */}
                {
                    courses.map((course) => (
                        <div className="allcourse--div" key={course._id}>
                            <img className="allcourse--div-img" src={'http://localhost:4000/' + course.Imagefile || cookingImg} alt="course cover image" />
                            <div className="allcourse--innerdiv">
                                <p className="bold">{course.name}</p>
                                <p>Intake capacity: {course.intake_Capacity}</p>
                                {/* <p>Current Enrolled : {course.current_Enrolled_Count}</p>  */}
                                <p>Incharge: {course.prof_Incharge}</p>
                                <hr/>
                                <button><Link to={`/studentsenrolled/${course._id}`}>Details</Link></button>

                                <button onClick={() => allotCourseHandle(course.name)}>Allot</button>
                            </div>
                                <div className="allcourse--bottom--div">
                                    <button className="allcourse--delete-button" onClick={() => deleteHandler(course._id)}><img src={deleteImg} /></button>
                                </div>
                        </div>
                    ))}
            </main>

            <CreateCourse />
        </>
    )
}

