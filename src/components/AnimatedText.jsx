import React from 'react'

// The words animate in with CSS rather than framer-motion.
//
// The previous framer-motion version rendered every word with an inline
// style="opacity:0" on the server, so the heading -- the LCP element and the
// page's primary ranking signal -- stayed invisible until the JS bundle
// downloaded, hydrated and ran the animation, and never appeared at all if JS
// failed. CSS animations run at first paint with no JS, so the text is visible
// regardless of hydration, and this component no longer needs to be a client
// component at all.
//
// `as` keeps this reusable for section headings without minting extra <h1>s.
const AnimatedText = ({text, className="", as="h1"}) => {
  const Heading = as

  return (
    <div className='flex-wrap mx-auto py-2 flex items-center justify-center text-justify overflow-hidden m-4'>
      <Heading className={`${className} inline-block text-dark dark:text-light font-bold capitalize text-[40px] lg:text-[60px] self-center`}>
        {
            text.split(" ").map((word, index) =>
            <span key={word+"-"+index} className='inline-block animate-word-rise'
                style={{animationDelay: `${index * 80}ms`}}
            >
                {word}&nbsp;
            </span>
            )
        }
      </Heading>
    </div>
  )
}

export default AnimatedText
