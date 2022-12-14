import React from 'react'
import {BsPatchCheckFill} from "react-icons/bs"
import "./experience.css"

const Experience = () => {
  return (
    <section id="experience">
      <h5>Skills I have</h5>
      <h2>My Experience</h2>
      <div className="container experience__container">
        {/* Frontend development Skills */}
        <div className="experience__frontend">
          <h3>Frontend Development</h3>
          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>HTML </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>JavaScript </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>CSS3 </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>React </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>React Native </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>Flutter </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div>
        {/* Backend Development Skills */}
        <div className="experience__backend">
          <h3>Backend Development</h3>
          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>Django </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>SQl </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>MongoDB </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>Nodejs </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>Express </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div>
        {/* Cloud and Data */}
        <div className="experience__frontend">
          <h3>Cloud Computing and Data</h3>
          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>AWS </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>GCP </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className="experience__details">
              <BsPatchCheckFill  className="experience__details-icons"/>
              <div>
                <h4>Pyspark </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience