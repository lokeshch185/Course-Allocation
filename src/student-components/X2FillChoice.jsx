import React from "react";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import cookingImg from "../images/cooking.png";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Drag from "./Drag";
import { useDrop } from "react-dnd";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export default function FillChoice(props) {

  // const { courses } = props;
  // const { courses } = props;
  const [courses, setCourses] = useState([])
  const [preferenceData, setPreferenceData] = useState({
    sem: "",
    preference: [],
  });

  useEffect((() => {
    axios.get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs)
      })
  }), [])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "li",
    drop: (item) => addImageToDiv(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  //to check courses
  // courses.map((course)=>{
  //   console.log("course: \n courseid "+ course.id + "coursename: "+course.coursename )
  // })

  const addImageToDiv = (id) => {
    console.log("id " + id);

    const data = courses.filter((course) => String(id) === String(course.id));

    setPreferenceData((prevPreferenceData) => ({
      ...prevPreferenceData,
      preference: [...prevPreferenceData.preference, data[0]],
    }));
  };




  function handleChange(event) {
    const { value, name } = event.target;

    setPreferenceData((prevpreferenceData) => {
      return {
        ...prevpreferenceData,
        [name]: value,

      };
    });
  }

  //  console.log(preferenceData) 

  //   //get the array from backend
  //   React.useEffect(function () {
  //     // console.log("use effect");
  //   }, []);

  return (
    <>
      <NavBar />

      <div className="fillchoice--outerdiv">
        <DragDropContext onDragEnd={() => { }}>

          <Droppable droppableId="courses">

            {(provided) => (
              <aside className="fillchoice--aside" {...provided.droppableProps} ref={provided.innerRef}>
                <ul className="fillchoice--ul">
                  {courses.map((course, index) => (

                    // console.log('hello')
                    <Draggable  draggableId={course._id} index={index}>
                      {(provided) => {
                        <li className="fillchoice--li" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >

                          <img src={cookingImg} alt="course-img" />
                          <span>{course.name}</span>   

                        </li>
                      }}
                    </Draggable> 

                  ))}
                  {provided.placeholder}
                </ul>
              </aside>  
            )}

          </Droppable>

          <section className="fillchoice--section">
            <p className="block">
              Courses will be alloted on first come, first serve basis
            </p>

            <div className="fillchoice--div">
              <h4>Preference form</h4>

              <div>
                <label htmlFor="semid" className="fillchoice--label">
                  Sem
                </label>
                <input
                  type="number"
                  id="semid"
                  name="sem"
                  onChange={handleChange}
                  value={preferenceData.sem}
                  placeholder="SEM"
                  className="fillchoice--input"
                />
              </div>

              {/* <p className="fillchoice--label">Enter 3 preferences</p> */}

              <Droppable droppableId="courses">
                {(provided) => (
                  <div className="fillchoice--input preferences" onChange={handleChange} {...provided.droppableProps} ref={provided.innerRef}>

                    {preferenceData.preference.map((element) => {
                      if (preferenceData.preference.length > 0) {
                        return (
                          <Drag
                            key={element.id}
                            id={element.id}
                            name={element.coursename}
                          />
                        );
                      }
                    }
                    )}

                  </div>
                )}
              </Droppable>
            </div>
            <button type="submit" className="fillchoice--button">SUBMIT</button>
          </section>
        </DragDropContext>
      </div>
    </>
  );
}
