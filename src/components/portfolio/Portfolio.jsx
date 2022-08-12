import React from 'react'
import WebImage from "../../assets/website_image.jpg"
import MobileImage from "../../assets/mobile_image.png"



import "./portfolio.css"

//To be customized later on
const data = [
  {
    id:1,
    image:WebImage,
    title:"This a just a test Title",
    github:"https://github.com",
    demo:"https://comparables.co.ke"
  },
  {
    id:2,
    image:MobileImage,
    title:"This is a portfolio item title",
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