import React from 'react'
import CTA from './CTA'
import MyImage from "../../assets/george_kibe.jpg"
import HeaderSocials from './HeaderSocials'

import "./header.css"

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>George Kibe</h1>
        <h5 className="text-light">Full Stack Mobile and Web Developer | Data Engineer</h5>
        <CTA />
        <HeaderSocials />        
        <img  src={MyImage} alt='George Kibe' className='img myimage'/>        
        <a href='#contact' className='scroll__down'>Scroll Down</a>        
      </div>
    </header>
  )
}

export default Header