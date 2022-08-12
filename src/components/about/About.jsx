import React from 'react'
import GeorgeAbout from "../../assets/george_kibe1.jpg"
import {FaAward} from "react-icons/fa"
import {FiUsers} from "react-icons/fi"
import {VscFolderLibrary} from "react-icons/vsc"

import "./about.css"

const About = () => {
  return (
    <section id="about">
      <h5>Get to Know me</h5>
      <h2>About me</h2>
      <div className="container about__container">
        <div className="about_me">
          <div className="about__me-image">
            <img src={GeorgeAbout} alt='George Avatar'/>
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className='about__icon' />
              <h5>Experience</h5>
              <small>3+ Years Working</small>
            </article>
            <article className="about__card">
              <FiUsers className='about__icon' />
              <h5>Clients</h5>
              <small>20+ Worldwide</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className='about__icon' />
              <h5>Projects</h5>
              <small>80+ Completed</small>
            </article>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptates vitae blanditiis iure illum quisquam, tempore eos cupiditate, obcaecati libero enim repudiandae et perferendis unde aperiam placeat neque illo laboriosam?
          </p>
          <a href='#contact' className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About