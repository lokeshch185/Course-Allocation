import React, { useState } from 'react'
import cookingImg from '../images/cooking.png'
import uploadImg from '../images/uploadImg.png'
import updateImg from '../images/update.png'
import deleteImg from '../images/delete.png'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import loginImage from "../images/login.png"

// const CreateCourse = ({ input, setInput, saveHandler }) => {
const CreateCourse = () => {

  const [courseName, setCourseName] = useState([])
  const [intake, setIntake] = useState()
  const [profName, setProfName] = useState()
  const [image, setImage] = useState("")
  const [redirect, setRedirect] = useState(false)

  const navigate = useNavigate()

  // // const {coursename, intake, instructor, image}= input
  // const inputRef = useRef(null);



  // const handleImageClick = () => {
  //   inputRef.current.click();
  // }



  // const handleImageChange = (event) =>
  // {
  //    const file=event.target.files[0];
  //    const imageUrl = URL.createObjectURL(file)

  //    console.log(file);
  //   setInput(prevInputText =>(
  //     {
  //       ...prevInputText,
  //       image: imageUrl
  //     }
  //   )
  //   )
  // }


  // function handleChange(event) {
  //   const { name, value, type } = event.target
  //   setInput(prevInputText => ({
  //     ...prevInputText,
  //     [name]: value,

  //   }))

  // }

  const saveHandler = async (event) => {
    const data = new FormData();

    // dbNames , useState state name 
    data.set('name', courseName);
    data.set('intake_Capacity', intake);
    data.set('prof_Incharge', profName);
    data.set('Imagefile', image[0]);

    console.log("Files uploaded are [from CreateCourse]: ")
    console.log(image[0].name)
    console.log(data)

    event.preventDefault();

    await axios.post('http://localhost:4000/course/addCourse', data)
      .then((response) => {
        alert("Course created successfully !! ")
        console.log(response.data)
        setRedirect(true)
      })
      .catch((error) => {
        alert("error !! Error encountered while creating post !! ")
        console.log(error.message)
      })
  }

  if (redirect) {
    navigate("/allcourses")
  }


  return (

    // <div className='create-course_bg'>
    <div>
      <div className='create-course__flex'>
        <form className="allcourse--main">
          <div className="editcourses--div">

            {/* <div onClick={handleImageClick} style={{ border: "2px solid red" }}> */}
            <div >

              {image ? <img src={"../images/" + image[0].name} alt="" /> : <img src={uploadImg} alt="" />}
              {image && console.log("../images/" + image[0].name)}

              {/* <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} /> */}
              {/* <input type="file" style={{ display: "none" }} /> */}
            </div>

            <div className="allcourse--innerdiv">
              <hr />

              <input type="text"
                placeholder='Course Name ...'
                value={courseName}
                // name="courseName"
                onChange={ev => setCourseName(ev.target.value)}
              />

              <input type="text"
                placeholder='Intake Capacity ...'
                value={intake}
                // name="intake"
                onChange={ev => setIntake(ev.target.value)}
              />


              <input type="text"
                placeholder='Instructor Name ...'
                value={profName}
                // name="profName"
                onChange={ev => setProfName(ev.target.value)}
              />
            </div>

            {/* coverImage */}
            <input type="file"
              onChange={ev => setImage(ev.target.files)} />


            <div>
              <button className="createcourse--button" onClick={saveHandler}>Save Course</button>
            </div>

          </div>

        </form>
        {/* <img src={loginImage} alt="loginImage" className='login--img' /> */}
      </div>
    </div>

  )
}

export default CreateCourse