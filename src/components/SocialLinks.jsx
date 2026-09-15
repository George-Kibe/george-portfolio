import { SocialIcon } from 'react-social-icons'
import { SOCIAL_LINKS } from '@/lib/site'

// Brand colours, with one treatment for every network so none of them looks
// like a special case: each mark carries the same light ring, which is what
// keeps the black GitHub and X glyphs from disappearing into the dark page.
//
// The ring sits outside the anchor rather than padding it inwards, so the whole
// `sizeClass` box stays clickable.
const SocialLinks = ({sizeClass}) => (
  <>
    {SOCIAL_LINKS.map(({url, label}) => (
      <span key={url} className={`${sizeClass} inline-flex`}>
        <SocialIcon
          url={url}
          label={label}
          target="_blank"
          rel="noopener noreferrer"
          style={{width: "100%", height: "100%"}}
          className="rounded-full ring-2 ring-light transition-opacity hover:opacity-80"
        />
      </span>
    ))}
  </>
)

export default SocialLinks
