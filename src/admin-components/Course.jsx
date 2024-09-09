import React from 'react'
import cookingImg from '../images/cooking.png'
import updateImg from '../images/update.png'
import deleteImg from '../images/delete.png'
const Course = ({id, coursename,image, intake, instructor, editHandler, deleteHandler}) => {
 
 return (
         
  <div className="editcourses--div">
      <img src={image || cookingImg} alt="cooking image" />
      <div className="allcourse--innerdiv">
        <hr />
        <p className="bold">{coursename}</p>
        <p>Intake capacity: {intake}</p>
        <p>{instructor}</p>
      </div>
      <div className="allcourse--bottom--div">
        {/* <button><img src={addImg}/></button> */}
        <button onClick={() => editHandler(id, coursename, intake, instructor)}><img src={updateImg} /></button>
        <button onClick={() => deleteHandler(id)}><img src={deleteImg} /></button>
      </div>
    </div>



  )
}

export default Course