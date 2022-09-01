import React from 'react'
import {BiCheck} from "react-icons/bi"

import "./services.css"

const Services = () => {
  return (
    <section id="services">
      <h5>What I offer</h5>
      <h2>Services </h2>

      <div className="container services__container">
        {/* Web Development */}
        <article className="service">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Variety of websites ranging from single-page websites, blogs, portals, and e-commerce websites</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Professional development and designs</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Business Dashboards and Company Profiles</p>
            </li>
          </ul>
        </article>
        {/* Mobile Development */}
        <article className="service">
          <div className="service__head">
            <h3>Mobile Development</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Chat based applications, Payment integration-stripe and paypal, Map-based tracking and google maps API, Calendar based applications</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Firebase and AWS amplify for backend, Camera-based applications, Service Based apps.</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>E-commerce based applications and Push notifications</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Tasks automation</p>
            </li>
          </ul>
        </article>
        {/* Data Engineering */}
        <article className="service">
          <div className="service__head">
            <h3>Data Engineering</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Setting up data pipelines</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Data cleaning, Data mining and website scrapping</p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/> 
              <p>Data analysis, visualization and modelling</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Services