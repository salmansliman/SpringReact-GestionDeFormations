import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>Landing Page
        <Link to="/login" className="item active">LOGIN</Link>
    </div>
  )
}

export default Landing