import React from 'react'
import { BiLogoAndroid, BiLogoApple, BiLogoHtml5 } from "react-icons/bi"

const formations = [
    {
        title: "Web Development",
        icon: <BiLogoHtml5 />,
    },
    {
        title: "Android Development",
        icon: <BiLogoAndroid />,
    },
    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },
    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },
    ,    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },
    ,    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },
    ,    {
        title: "iOS Development",
        icon: <BiLogoApple />,
    },
]

const Card = () => {
  return (
    <div className='card--container'>
        {formations.map((item) =>(
            <div className="card">
                <div className="card--cover">
                    {item.icon}
                </div>
                <div className="card--title">
                    <h2>{item.title}</h2>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Card