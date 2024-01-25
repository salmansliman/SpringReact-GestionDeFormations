import React from 'react'
import ContentHeader from './ContentHeader'
import Card from './Card'
import './Content.css'
import TeacherList from '../TeacherList/TeacherList'

const Content = ({ allFormations }) => {
  return (
    <div className="content">
        <ContentHeader/>
        <Card allFormations={allFormations} />
        <TeacherList />
    </div>
  )
}

export default Content