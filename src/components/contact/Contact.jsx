import {MdOutlineEmail} from "react-icons/md"
import {BsWhatsapp} from "react-icons/bs"
import {ImTwitter} from "react-icons/im"
//emailjs imports
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

import "./contact.css"

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_zejea4b', 'template_d1kc1do', form.current, 'qO3BsJQp9qAyPG6LX')
    e.target.reset()
  };
  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option__icon"/>
            <h4>Email</h4>
            <h5>georgekibew@gmail.com</h5>
            <a href="mailto:georgekibew@gmail.com" target="_blank" rel="noreferrer">Send an Email</a>
          </article>
          <article className="contact__option">
            <ImTwitter className="contact__option__icon"/>
            <h4>Twitter</h4>
            <h5>@GeorgeKibe001</h5>
            <a href="https://twitter.com/GeorgeKibe001" target="_blank" rel="noreferrer">Message me on Twitter</a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option__icon"/>
            <h4>Whatsapp</h4>
            <h5>+254 704 817 466</h5>
            <a href="https://wa.link/rcnr3u" target="_blank" rel="noreferrer">Whatsapp Me</a>
          </article>
        </div>
        {/* Contact form */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Name' />
          <input type="email" name='email' placeholder='Your Email' />
          <textarea name="message" rows="6" placeholder='Your Message'></textarea>
          <button type='submit' className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact