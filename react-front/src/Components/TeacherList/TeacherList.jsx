import React from 'react'
import './TeacherList.css'


const teachers = [
    {
        name: "Prof. John Doe",
        phone: "0677889911",
        competences: "Javascript",
    },
    {
        name: "Prof. Salman Sliman",
        phone: "0677889911",
        competences: "Springboot",
    },
    {
        name: "Prof. Cheknane",
        phone: "0677889911",
        competences: "React",
    },
]

const TeacherList = () => {
  return (
    <div className='teacher--list'>
        <div className="list--header">
            <h2>Formateurs</h2>
            <select>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Arabic">Arabic</option>
            </select>
        </div>
        <div className="list--container">
            {teachers.map((teacher) => (
                <div className="list">
                    <div className="teacher--detail">
                        <h2>{teacher.name}</h2>
                    </div>
                    <span>{teacher.phone}</span>
                    <span>{teacher.competences}</span>
                    <span className="teacher--todo">:</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TeacherList