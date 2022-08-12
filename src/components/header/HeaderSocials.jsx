import React from 'react'
import {BsLinkedin} from "react-icons/bs"
import {BsGithub} from "react-icons/bs"
import {SiTwitter} from "react-icons/si"
import {FaDribbbleSquare} from "react-icons/fa"

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href='https://linkedin.com' target="_blank" rel="noreferrer"><BsLinkedin /></a>
        <a href='https://dribble.com' target="_blank" rel="noreferrer"><FaDribbbleSquare /></a>
        <a href='https://twitter.com' target="_blank" rel="noreferrer"><SiTwitter /></a>
        <a href='https://github.com' target="_blank" rel="noreferrer"><BsGithub /></a>
    </div>
  )
}

export default HeaderSocials