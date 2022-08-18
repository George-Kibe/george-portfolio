import React from 'react'
import {BsLinkedin} from "react-icons/bs"
import {BsGithub} from "react-icons/bs"
import {SiTwitter} from "react-icons/si"
import {FaDribbbleSquare} from "react-icons/fa"

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href='https://www.linkedin.com/in/george-kibe-17b431110/' target="_blank" rel="noreferrer"><BsLinkedin size={25} /></a>
        <a href='https://dribble.com' target="_blank" rel="noreferrer"><FaDribbbleSquare size={25} /></a>
        <a href='https://twitter.com/GeorgeKibe001' target="_blank" rel="noreferrer"><SiTwitter size={25} /></a>
        <a href='https://github.com/George-Kibe' target="_blank" rel="noreferrer"><BsGithub size={25} /></a>
    </div>
  )
}

export default HeaderSocials