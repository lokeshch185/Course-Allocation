import React , { useEffect , useState}from "react";
import NavBar from "./NavBar";
import cookingImg from "../images/cooking.png";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Drag from "./Drag";
import { useDrop } from "react-dnd";
import axios from "axios";

export default function FillChoice(props) {
  // const { courses } = props;
  const [courses, setCourses] = useState([])

  useEffect((() => {
    axios.get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs)
      })
  }), [])

  const [preferenceData, setPreferenceData] = React.useState({
    sem: "",
    preference: [],
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "li",
    drop: (item) => addImageToDiv(item._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  //to check courses
  // courses.map((course)=>{
  //   console.log("course: \n courseid "+ course.id + "coursename: "+course.coursename )
  // })

  const addImageToDiv = (_id) => {
    console.log("id " + _id);

    const data = courses.filter((course) => String(_id) === String(course._id));

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
 
 console.log(preferenceData) 

  //get the array from backend
  React.useEffect(function () {
    // console.log("use effect");
  }, []);

  return (
    <>
      <NavBar />

      <div className="fillchoice--outerdiv">
        <aside className="fillchoice--aside">
          <ul className="fillchoice--ul">
            {courses.map((course) => (
              <Drag id={course._id} name={course.name} />
            ))}
          </ul>
        </aside>

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
            <div
              ref={drop}
              className="fillchoice--input preferences"
              onChange={handleChange}
            >
              {/* <label htmlFor="preferenceid" className="fillchoice--label">
                  Enter 3 preferences
                </label>  */}
              {/* <input
                // ref={drop} 
                type="text"
                id="preferenceid"
                name="preference"
                onChange={handleChange}
                value={preferenceData.preference}
                className="fillchoice--input preferences"
              />  */}

              {preferenceData.preference.map((element) => {
                if (preferenceData.preference.length > 0)
                { 
                  return (
                    <Drag
                      key={element._id}
                      id={element._id}
                      name={element.name}
                    />
                  );
                }
              }
              )}

             
            </div>
          </div>
          <button type="submit" className="fillchoice--button">SUBMIT</button>
        </section>
      </div>
    </>
  );
}
