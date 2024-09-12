import React, { useState } from 'react'
import uploadImg from '../images/uploadImg.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('')
  const [intake, setIntake] = useState('')
  const [profName, setProfName] = useState('')
  const [image, setImage] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const navigate = useNavigate()

  const saveHandler = async (event) => {
    event.preventDefault()
    const data = new FormData()
    data.set('name', courseName)
    data.set('intake_Capacity', intake)
    data.set('prof_Incharge', profName)
    if (image) data.set('Imagefile', image[0])

    try {
      await axios.post('http://localhost:4000/course/addCourse', data)
      alert('Course created successfully !!')
      setRedirect(true)
    } catch (error) {
      alert('Error encountered while creating course !!')
      console.log(error.message)
    }
  }

  if (redirect) {
    navigate('/allcourses')
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
        <h1 className="text-5xl font-bold text-center mb-6 text-black">Create Course</h1>
        <form onSubmit={saveHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="courseName">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              placeholder="Enter course name"
              value={courseName}
              onChange={(ev) => setCourseName(ev.target.value)}
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="intake">
              Intake Capacity
            </label>
            <input
              type="text"
              id="intake"
              placeholder="Enter intake capacity"
              value={intake}
              onChange={(ev) => setIntake(ev.target.value)}
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="profName">
              Instructor Name
            </label>
            <input
              type="text"
              id="profName"
              placeholder="Enter instructor name"
              value={profName}
              onChange={(ev) => setProfName(ev.target.value)}
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image">
              Course Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(ev) => setImage(ev.target.files)}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <div className="mt-4 flex justify-center">
                <img
                  src={URL.createObjectURL(image[0])}
                  alt="Course Preview"
                  className="w-32 h-32 object-cover rounded-md shadow-lg"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse
