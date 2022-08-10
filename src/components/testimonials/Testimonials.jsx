import React from 'react'
import Client1 from "../../assets/george_kibe1.jpg"
import Client2 from "../../assets/george_kibe1.jpg"
import Client3 from "../../assets/george_kibe1.jpg"
import Client4 from "../../assets/george_kibe1.jpg"
// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import "./testimonials.css"

const data =[
  {
    id:1,
    avatar:Client1,
    name:"Albert Kibiero",
    review:" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laboriosam optio reprehenderit amet repudiandae distinctio repellat provident rem porro veniam."
  },
  {
    id:2,
    avatar:Client2,
    name:"Albert Kibiero",
    review:" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laboriosam optio reprehenderit amet repudiandae distinctio repellat provident rem porro veniam."
  },
  {
    id:3,
    avatar:Client3,
    name:"Kibe George",
    review:" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laboriosam optio reprehenderit amet repudiandae distinctio repellat provident rem porro veniam."
  },
  {
    id:4,
    avatar:Client4,
    name:"Albert Kibiero",
    review:" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laboriosam optio reprehenderit amet repudiandae distinctio repellat provident rem porro veniam."
  },
]

const Testimonials = () => {
  return (
    <section id='testimonials'>
      <h5>Reviews from my Clients</h5>
      <h2>Testimonials</h2>

      <Swiper className="container testimonials__container"
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}>
        {
          data.map(({id, avatar, name, review}) =>{
            return(
              <SwiperSlide className="testimonial" key={id}>
                <div className="client__avatar"><img src={avatar} alt={name} /></div>
                <h5 className='client__name'>{name}</h5>
                <small className="client__review">{review}</small>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  )
}

export default Testimonials