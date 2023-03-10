import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'



const Course = ({course}) => {
  return (
    <>
    <Header course={course.name} key={course.id} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

export default Course