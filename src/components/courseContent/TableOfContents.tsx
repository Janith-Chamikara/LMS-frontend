import { FC } from "react"
import CustomAccordion from "../CustionAccordion";

const contents = [
 {
   title: "JavaScript Fundamentals",
   description: "Learn the basics of JavaScript, including variables, data types, operators, and control flow.",
 },
 {
   title: "Arrays in JavaScript",
   subTopics: ["Creating arrays", "Accessing elements", "Modifying arrays", "Array methods"],
 },
 {
   title: "Object-Oriented Programming in JavaScript",
   description: "Explore object-oriented concepts like classes, objects, inheritance, and polymorphism.",
 },
 {
   title: "Asynchronous Programming in JavaScript",
   subTopics: ["Callbacks", "Promises", "Async/await"],
 },
 {
   title: "Building Web Applications with React",
   description: "Learn how to create dynamic and interactive user interfaces using React.",
 },
];

type Props = {
  contents:[object]
}


const TableOfContents:FC<Props> = ({contents}) => {
 return <CustomAccordion contents={contents}/>
}

export default TableOfContents;