import React from 'react'
import WebImage from "../../assets/comparables-website-map.PNG"
import MobileImage from "../../assets/mobile_image.png"
import EcommerceImage from "../../assets/ecommerce.png"


import "./portfolio.css"

//To be customized later on
const data = [
  {
    id:1,
    image:EcommerceImage,
    title:"E-Commerce Mobile Application",
    github:"https://github.com",
    demo:"https://comparables.co.ke"
  },
  {
    id:2,
    image:WebImage,
    title:"Django Website for Comparables Kenya",
    github:"https://github.com",
    demo:"https://comparables.co.ke"
  },
  {
    id:3,
    image:MobileImage,
    title:"React, Node E-commerce Website",
    github:"https://github.com",
    demo:"https://comparables.co.ke"
  },
]

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio </h2>

      <div className="container portfolio__container">
        {
          data.map(({id, image, title, github, demo}) =>{
            return(
              <article className="portfolio__item" key={id}>
                <div className="portfolio__item-image"><img src={image} alt={title} /></div>
                <h3>{title}</h3>
                <div className="portfolio__item-cta">          
                  <a href={github} className="btn" target="_blank" rel="noreferrer">Github</a>
                  <a href={demo} className='btn btn-primary' target="_blank" rel="noreferrer">LIVE DEMO</a>
                </div>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio