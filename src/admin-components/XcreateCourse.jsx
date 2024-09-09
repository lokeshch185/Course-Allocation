import React, { useState } from 'react'
import cookingImg from '../images/cooking.png'
import uploadImg from '../images/uploadImg.png'
import updateImg from '../images/update.png'
import deleteImg from '../images/delete.png'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// const CreateCourse = ({ input, setInput, saveHandler }) => {
const CreateCourse = () => {

  const [courseName, setCourseName] = useState([])
  const [intake, setIntake] = useState()
  const [profName, setProfName] = useState()
  const [image, setImage] = useState("")
  const [redirect , setRedirect] = useState(false)

  const navigate = useNavigate()

  // // const {coursename, intake, instructor, image}= input
  // const inputRef = useRef(null);



  // const handleImageClick = () => {
  //   inputRef.current.click();
  // }



  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(file)

  //   console.log(file);
  //   //  setImage(event.target.files[0]);
  //   setInput(prevInputText => (
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

    data.set('CourseName', courseName);
    data.set('Intake', intake);
    data.set('ProfName', profName);
    data.set('Imagefile', image[0]);

    console.log("Files uploaded are [from CreateCourse]: ")
    console.log(image)

    event.preventDefault();

    // await axios.post('http://localhost:4000/postBlog', data, { withCredentials: true })
    //   .then((response) => {
    //     alert("Post is created")
    //     console.log("response is from postBlog page : ")
    //     console.log(response.data)
    //     setRedirect(true)
    //   })
    //   .catch((error) => {
    //     alert("error !! Error encountered while creating post !! ")
    //     console.log(error)
    //   })
  }

  if (redirect) {
    navigate("/allcourses")
  }


  return (

    <main className="allcourse--main">
      <div>Hello</div>
      <div className="editcourses--div">

        {/* <div onClick={handleImageClick} style={{ border: "2px solid red" }}> */}
        <div style={{ border: "2px solid red" }}>

          {image ? <img src={image.name} alt="" /> : <img src={uploadImg} alt="" />}

          {/* <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} /> */}
          <input type="file" style={{ display: "none" }} />
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

    </main>

  )
}

export default CreateCourse