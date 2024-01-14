import React from 'react'
import ContentHeader from './ContentHeader'
import Card from './Card'
import './Content.css'
import TeacherList from '../TeacherList/TeacherList'

const Content = () => {
  return (
    <div className="content">
        <ContentHeader/>
        <Card/>
        <TeacherList />
    </div>
  )
}

export default Content