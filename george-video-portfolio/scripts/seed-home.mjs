// Home page content for `npm run seed`.

// DRAFTS, seeded hidden (published: false). They show the layout and the kind
// of feedback worth collecting, but they are not real client quotes. Replace
// each with a real client's words (and their permission), then tick "Show on
// the site" in /admin/testimonials.
export const TESTIMONIALS = [
  {
    name: 'Brian M.',
    role: 'Marketing Lead, consumer brand',
    quote: 'Our product ads finally look as good as the product. Fast turnaround, sharp cuts and a grade that matched our brand perfectly.',
    rating: 5,
    order: 1,
  },
  {
    name: 'Wanjiru K.',
    role: 'YouTube creator',
    quote: 'Retention on my videos went up once George took over the edit. The pacing is tighter and the captions make the shorts work without sound.',
    rating: 5,
    order: 2,
  },
  {
    name: 'Kevin O.',
    role: 'Recording artist',
    quote: 'He cut the music video right on the beat and the colour gave it exactly the moody look we wanted. Easy to work with from brief to final export.',
    rating: 5,
    order: 3,
  },
  {
    name: 'Faith A.',
    role: 'Bride',
    quote: 'Our wedding film made us cry all over again. Every important moment is there, and the sound of the speeches is crystal clear.',
    rating: 5,
    order: 4,
  },
  {
    name: 'Daniel N.',
    role: 'Communications Manager, NGO',
    quote: 'Clear, professional and on schedule. The documentary told our story better than we could have, and the subtitles made it work for every audience.',
    rating: 4,
    order: 5,
  },
]

// The placeholder projects the site used to show (stock Unsplash images, no
// real videos). Seeded HIDDEN so stock footage isn't presented as real work;
// replace them with real projects in /admin/projects.
export const PROJECT_DRAFTS = [
  { title: 'Neon Dreams', category: 'Music Video', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1280&h=720&fit=crop', duration: '3:45', year: 2024, description: 'A vibrant music video featuring dynamic editing and colour grading.', order: 1 },
  { title: 'Tech Forward', category: 'Commercial', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1280&h=720&fit=crop', duration: '1:30', year: 2024, description: 'High-energy commercial for a tech brand launch.', order: 2 },
  { title: 'Urban Stories', category: 'Documentary', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1280&h=720&fit=crop', duration: '15:00', year: 2023, description: 'Documentary exploring urban culture and community narratives.', order: 3 },
  { title: 'Brand Evolution', category: 'Corporate', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&h=720&fit=crop', duration: '2:00', year: 2023, description: 'Corporate brand story highlighting company transformation.', order: 4 },
  { title: 'Midnight Jazz', category: 'Music Video', thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1280&h=720&fit=crop', duration: '4:20', year: 2023, description: 'Atmospheric jazz performance with moody cinematography.', order: 5 },
  { title: 'Product Launch', category: 'Commercial', thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1280&h=720&fit=crop', duration: '0:45', year: 2024, description: 'Fast-paced product reveal with motion graphics.', order: 6 },
]
