import React from "react";
import cookingImg from "../images/cooking.png";
import { useDrag } from "react-dnd";

export default function Drag(props) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "li",
        item: { id: props.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    // console.log("coursename "+props.name + " id " +props.id)
    console.log(props.name + props.name.split(" ").length)

    return (
        // <li key={props.id} className="fillchoice--li" ref={drag} style={{border: isDragging? "2px solid red": "0px"}}>
        <li key={props.i} className="fillchoice--li" ref={drag} >
        <img className={props.name.split(" ").length<2? "fillchoice--li-img":"fillchoice--li-img-two" } src={cookingImg} alt="course-img" />
        <span className={props.name.split(" ").length<2? "fillchoice--li-span":"fillchoice--li-span-two" } >{props.name}</span>
      </li>
    )
}