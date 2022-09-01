import React from 'react'
import GeorgeAbout from "../../assets/george_kibe1.jpg"
import {FaAward} from "react-icons/fa"
import {FiUsers} from "react-icons/fi"
import {VscFolderLibrary} from "react-icons/vsc"
import {FaUniversity} from "react-icons/fa"

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
            <article className="about__card">
              <FaUniversity className='about__icon' />
              <h5>Education</h5>
              <ul>
                <li><small>University of Nairobi</small></li>
                <li><small>EDSA</small></li>
              </ul>
            </article>
          </div>
          <p>
            Hola! I'm George Kibe. I am a tech enthusiast. 
            I enjoy coming up with tech solutions and automation, especially the boring stuff.
            I am a graduate of the University of Nairobi-Kenya. Am also an expert in Mobile and website development, data engineering and data science.
            I am passionate about innovatie startups. 
            If you are interested in any of the solutions above, I got you.
            I also enjoy creative reading and writing, playing chess and traveling, just in case you don't find me online.
          </p>
          <p>Thank you, George Kibe</p>
          <a href='#contact' className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About