import type {
  Child,
  Home,
  Program,
  Campaign,
  Testimonial,
  FAQ,
  ImpactStat,
} from './types'

// Impact Statistics
export const impactStats: ImpactStat[] = [
  {
    label: 'Children Supported',
    value: '2,847',
    description: 'Children receiving care and resources through HavenBridge',
    target: 2847,
  },
  {
    label: 'Licensed Homes Funded',
    value: '156',
    description: 'Verified foster and transitional homes in our network',
    target: 156,
  },
  {
    label: 'Donations Delivered',
    value: '$4.2M',
    description: 'Total funds delivered to children and programs',
    target: 4.2,
    prefix: '$',
    suffix: 'M',
    decimals: 1,
  },
  {
    label: 'Programs Sponsored',
    value: '89',
    description: 'Educational, therapeutic, and enrichment programs',
    target: 89,
  },
  {
    label: 'Volunteer Advocates',
    value: '412',
    description: 'Active caseworkers and community volunteers',
    target: 412,
  },
  {
    label: 'Communities Served',
    value: '37',
    description: 'Cities and counties across our network',
    target: 37,
  },
]

// Privacy-Safe Children Profiles
export const children: Child[] = [
  {
    id: 'child-1',
    firstName: 'Marcus',
    initials: 'M.J.',
    ageRange: '11',
    region: 'Pacific Northwest',
    image: '/children/child-1.jpg',
    supportSummary: 'Thriving in school, needs support for extracurricular activities and therapy sessions.',
    needs: ['Education Supplies', 'Art Therapy', 'Sports Equipment'],
    goals: ['Join a basketball team', 'Improve reading skills', 'Learn guitar'],
    talents: ['Drawing', 'Math', 'Basketball'],
    votes: 234,
    fundsRaised: 1847.35,
    fundingGoal: 3000,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u1', date: '2024-03-15', title: 'Academic Progress', content: 'Marcus received an A on his science project!' },
    ],
    relatedPrograms: ['prog-1', 'prog-3'],
    activeCampaigns: ['camp-2'],
    story: [
      {
        id: 's1-1',
        chapter: 'A quiet start',
        pullQuote: 'Marcus was the kid who drew on everything — napkins, cereal boxes, the backs of receipts.',
        body: 'He spent his early years in a small apartment with his mother, who worked two jobs and did her best. Things were never easy, but Marcus remembers good moments — Saturday pancakes, library trips, a stray cat he named after a basketball player.',
      },
      {
        id: 's1-2',
        chapter: 'How he came to us',
        body: 'When his mother\'s health declined and no extended family could step in, a caseworker placed Marcus in a licensed foster home. He arrived with a backpack, two sketchbooks, and a basketball his mom had saved up to buy him.',
      },
      {
        id: 's1-3',
        chapter: 'Who he is today',
        pullQuote: 'Kind to a fault. Obsessed with how things work.',
        body: 'Marcus is sharp in math, funny when he lets himself be, and the quiet kid at school who always helps the new student find their seat. He\'s still processing a lot, but his teachers say he shows up every day and tries.',
      },
      {
        id: 's1-4',
        chapter: 'What he dreams about',
        body: 'He wants to make the middle-school basketball team. He wants to keep drawing. He wants to learn guitar so he can play at the foster family\'s Sunday dinners. Small dreams that, stacked together, look a lot like a future.',
      },
      {
        id: 's1-5',
        chapter: 'How you help',
        body: 'Your support funds art therapy sessions, basketball league fees, and the school supplies his foster family stretches hard to provide. Every dollar you give becomes something Marcus can practice, create, or play with this month.',
      },
    ],
  },
  {
    id: 'child-2',
    firstName: 'Lily',
    initials: 'L.R.',
    ageRange: '8',
    region: 'Southwest',
    image: '/children/child-2.jpg',
    supportSummary: 'Recently placed in a loving foster home, transitioning well with therapy support.',
    needs: ['Trauma Therapy', 'School Supplies', 'Winter Clothing'],
    goals: ['Feel safe and happy', 'Make new friends', 'Learn to swim'],
    talents: ['Singing', 'Helping others', 'Puzzles'],
    votes: 412,
    fundsRaised: 2183.75,
    fundingGoal: 2500,
    urgencyLevel: 'high',
    recentUpdates: [
      { id: 'u2', date: '2024-03-18', title: 'Milestone', content: 'Lily made her first friend at her new school!' },
    ],
    relatedPrograms: ['prog-2'],
    activeCampaigns: ['camp-1', 'camp-3'],
    story: [
      {
        id: 's2-1',
        chapter: 'A singing kid',
        pullQuote: 'She hummed before she could talk, her grandmother used to say.',
        body: 'Lily grew up moving between family members\' homes — sometimes a week, sometimes a few months. Through all of it, she sang. Cartoon theme songs, lullabies she barely remembered, songs she made up herself in the back seat of unfamiliar cars.',
      },
      {
        id: 's2-2',
        chapter: 'How she came to us',
        body: 'When the relative she was staying with could no longer safely care for her, Lily entered the foster system. Her placement with a loving foster family was stable from day one — and so began the work of rebuilding her sense of safety.',
      },
      {
        id: 's2-3',
        chapter: 'Who she is today',
        body: 'Lily is cautious around new people, but once she trusts you, she will show you every drawing in her notebook and explain each one. She helps her foster sister with homework. She knows every lyric to Encanto.',
      },
      {
        id: 's2-4',
        chapter: 'What she dreams about',
        body: 'She wants to learn to swim. She wants to invite a friend over — a real one, from school — for the first time. She wants to sing in the school talent show in May.',
      },
      {
        id: 's2-5',
        chapter: 'How you help',
        body: 'Trauma-informed therapy is helping Lily feel safe. Winter clothes and school supplies give her the quiet dignity of showing up like every other kid. Your donation keeps both of those things going.',
      },
    ],
  },
  {
    id: 'child-3',
    firstName: 'Daniel',
    initials: 'D.K.',
    ageRange: '15',
    region: 'Midwest',
    image: '/children/child-3.jpg',
    supportSummary: 'Preparing for independent living, focused on education and job skills.',
    needs: ['Tutoring', 'Life Skills Training', 'College Prep'],
    goals: ['Graduate high school', 'Get a part-time job', 'Learn to drive'],
    talents: ['Writing', 'Computer skills', 'Leadership'],
    votes: 189,
    fundsRaised: 3094.20,
    fundingGoal: 5000,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u3', date: '2024-03-10', title: 'Achievement', content: 'Daniel was accepted into a summer coding program!' },
    ],
    relatedPrograms: ['prog-4', 'prog-5'],
    activeCampaigns: ['camp-4'],
    story: [
      {
        id: 's3-1',
        chapter: 'The long version',
        pullQuote: 'He has been in foster care longer than he hasn\'t.',
        body: 'Daniel entered the system at seven, after the adults in his life made a series of choices he did not have the vocabulary to understand at the time. He has been in three placements since. The current one, a transitional group home, has lasted the longest.',
      },
      {
        id: 's3-2',
        chapter: 'The turning point',
        body: 'A caseworker in his last placement gave him an old laptop. Daniel taught himself Python from YouTube tutorials at night. Something about the way code did exactly what you told it to — no more, no less — felt like the first kind of control he had ever had.',
      },
      {
        id: 's3-3',
        chapter: 'Who he is today',
        body: 'Daniel writes. He keeps a notebook of ideas for short stories and half-finished apps. He\'s careful with his words and fiercely loyal to the younger kids in his house. He is also tired, sometimes, in a way a sixteen-year-old shouldn\'t be.',
      },
      {
        id: 's3-4',
        chapter: 'What he dreams about',
        pullQuote: 'I want to be the one who leaves and comes back, not the one who just leaves.',
        body: 'Graduate high school. Get into a community college, then a four-year. Learn to drive. Work, save, and mentor the kids coming up behind him.',
      },
      {
        id: 's3-5',
        chapter: 'How you help',
        body: 'Tutoring closes the academic gaps years of upheaval created. College prep and life-skills programs turn "someday" into "next year." A little support now compounds for the rest of his life.',
      },
    ],
  },
  {
    id: 'child-4',
    firstName: 'Sofia',
    initials: 'S.M.',
    ageRange: '5',
    region: 'Southeast',
    image: '/children/child-4.jpg',
    supportSummary: 'Young learner with a bright smile, needs early childhood development support.',
    needs: ['Early Learning Materials', 'Speech Therapy', 'Healthy Meals'],
    goals: ['Learn to read', 'Make friends at preschool', 'Express feelings'],
    talents: ['Dancing', 'Imagination', 'Kindness'],
    votes: 567,
    fundsRaised: 1392.65,
    fundingGoal: 2000,
    urgencyLevel: 'critical',
    recentUpdates: [
      { id: 'u4', date: '2024-03-20', title: 'Progress', content: 'Sofia is now recognizing letters and numbers!' },
    ],
    relatedPrograms: ['prog-1'],
    activeCampaigns: ['camp-1'],
    story: [
      {
        id: 's4-1',
        chapter: 'The smile first',
        pullQuote: 'The kind of smile that rearranges a room.',
        body: 'Sofia is five. Before anything else about her, there is the smile — bright and full and given freely to strangers, nurses, bus drivers, the dog at the park. She came into the system this past winter under circumstances her caseworkers speak carefully about.',
      },
      {
        id: 's4-2',
        chapter: 'A gentle landing',
        body: 'She was placed with a foster family experienced in caring for young children recovering from neglect. There was a private bedroom waiting for her. There were new pajamas folded at the foot of the bed. There was a stuffed elephant she named Elsie on the first night.',
      },
      {
        id: 's4-3',
        chapter: 'Who she is today',
        body: 'She is a dancer. She is an imaginer of elaborate tea parties. She is learning that raising her voice doesn\'t make the grown-ups leave. She is learning that hungry is a thing that goes away when you eat.',
      },
      {
        id: 's4-4',
        chapter: 'What she dreams about',
        body: 'She wants to read a whole book by herself. She wants to go to a "real school." She wants to know the words for how she feels so she can tell her foster mom without crying.',
      },
      {
        id: 's4-5',
        chapter: 'How you help',
        body: 'Speech therapy gives her those words. Early learning materials catch her up on what she missed. Healthy meals build a body that her preschool years didn\'t get to. Every dollar is a door she walks through.',
      },
    ],
  },
  {
    id: 'child-5',
    firstName: 'Jayden',
    initials: 'J.T.',
    ageRange: '13',
    region: 'Northeast',
    image: '/children/child-5.jpg',
    supportSummary: 'Athletic and creative, looking for mentorship and enrichment opportunities.',
    needs: ['Sports Programs', 'Music Lessons', 'Mentorship'],
    goals: ['Try out for soccer team', 'Learn piano', 'Find a mentor'],
    talents: ['Soccer', 'Music', 'Storytelling'],
    votes: 298,
    fundsRaised: 2756.40,
    fundingGoal: 4000,
    urgencyLevel: 'low',
    recentUpdates: [
      { id: 'u5', date: '2024-03-12', title: 'Achievement', content: 'Jayden scored his first goal in the community league!' },
    ],
    relatedPrograms: ['prog-3', 'prog-5'],
    activeCampaigns: ['camp-2', 'camp-5'],
    story: [
      {
        id: 's5-1',
        chapter: 'The middle brother',
        pullQuote: 'The kind of kid who made everyone laugh so nobody noticed he was also watching out for his siblings.',
        body: 'Jayden grew up the middle of three. His older sister looked after him; he looked after his younger brother. That\'s how it went for eleven years — kids raising kids, doing a better job of it than the adults around them.',
      },
      {
        id: 's5-2',
        chapter: 'How he came to us',
        body: 'When the siblings had to be removed from their home, the county was able to place Jayden with a licensed foster home close enough that he still sees his brother every weekend. He\'ll tell you that\'s the most important part of all of this.',
      },
      {
        id: 's5-3',
        chapter: 'Who he is today',
        body: 'He plays soccer like he has something to prove. He\'s learning piano because a teacher at school noticed he could sight-read rhythm better than kids twice his age. He is polite, funny, and a quietly excellent older brother even from a distance.',
      },
      {
        id: 's5-4',
        chapter: 'What he dreams about',
        body: 'Make the school soccer team. Find an adult mentor — a real one — who sticks around. Play a piece at a recital his brother can come watch.',
      },
      {
        id: 's5-5',
        chapter: 'How you help',
        body: 'League fees, piano lessons, and the mentorship program that pairs kids like Jayden with vetted volunteer adults. Small investments that give a great kid a wider runway.',
      },
    ],
  },
  {
    id: 'child-6',
    firstName: 'Emma',
    initials: 'E.W.',
    ageRange: '9',
    region: 'Mountain West',
    image: '/children/child-6.jpg',
    supportSummary: 'Creative soul who loves art and nature, healing through creative expression.',
    needs: ['Art Supplies', 'Outdoor Programs', 'Counseling'],
    goals: ['Have an art show', 'Go camping', 'Feel confident'],
    talents: ['Painting', 'Nature exploration', 'Poetry'],
    votes: 345,
    fundsRaised: 1587.80,
    fundingGoal: 2500,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u6', date: '2024-03-14', title: 'Creative Growth', content: 'Emma\'s artwork was displayed at the community center!' },
    ],
    relatedPrograms: ['prog-1', 'prog-3'],
    activeCampaigns: ['camp-3'],
    story: [
      {
        id: 's6-1',
        chapter: 'A small town',
        pullQuote: 'She knew the names of every bird in her backyard before she learned to tie her shoes.',
        body: 'Emma grew up in a small mountain town. Her mother loved her deeply and struggled deeply. There were good years and hard years, in that order, until the hard years became all of them.',
      },
      {
        id: 's6-2',
        chapter: 'The transition',
        body: 'Emma entered foster care at seven. The first months were quiet — too quiet, her therapist said. She wasn\'t crying or acting out. She was disappearing into herself. Art therapy was what finally brought her back.',
      },
      {
        id: 's6-3',
        chapter: 'Who she is today',
        body: 'She paints. She writes poems with the earnestness only a nine-year-old can bring. She notices things other people miss — the color of the sky before rain, the exact moment a room gets quieter.',
      },
      {
        id: 's6-4',
        chapter: 'What she dreams about',
        body: 'Have a real art show at school. Go camping with her foster family. Feel, someday, the way she used to feel when her mom would braid her hair on the porch.',
      },
      {
        id: 's6-5',
        chapter: 'How you help',
        body: 'Art supplies, outdoor programs, and the counseling that turned her quiet into words. Emma\'s healing is slow and real, and it costs what it costs.',
      },
    ],
  },
  {
    id: 'child-7',
    firstName: 'Ethan',
    initials: 'E.B.',
    ageRange: '8',
    region: 'Pacific Northwest',
    image: '/children/child-7.jpg',
    supportSummary: 'Adventurous spirit who loves exploring and learning new things every day.',
    needs: ['School Supplies', 'Winter Clothing', 'Tutoring'],
    goals: ['Learn to ride a bike', 'Read chapter books', 'Join Cub Scouts'],
    talents: ['Curiosity', 'Building things', 'Telling jokes'],
    votes: 178,
    fundsRaised: 1178.15,
    fundingGoal: 2500,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u7', date: '2024-03-22', title: 'Milestone', content: 'Ethan finished his first chapter book on his own!' },
    ],
    relatedPrograms: ['prog-1'],
    activeCampaigns: ['camp-2'],
    story: [
      {
        id: 's7-1',
        chapter: 'A curious kid',
        pullQuote: 'Why? is his favorite word, and he uses it well.',
        body: 'Ethan is eight. He has been asking "why?" since he could form the word, and the adults in his early life did not always have patience for that. He learned young to keep the questions in his head.',
      },
      {
        id: 's7-2',
        chapter: 'How he came to us',
        body: 'Ethan entered foster care after a domestic incident made his home unsafe. His foster parents, both teachers, noticed on day one that he lit up around books. They stocked his nightstand. He\'s still working through it.',
      },
      {
        id: 's7-3',
        chapter: 'Who he is today',
        body: 'He builds things — Legos, cardboard robots, a "machine" he assembled out of rubber bands and spoons. He tells jokes that don\'t always land but that he laughs at himself. He asks his questions again.',
      },
      {
        id: 's7-4',
        chapter: 'What he dreams about',
        body: 'Ride a bike without training wheels. Read a book thicker than his hand. Join Cub Scouts so he can go camping with the other kids on his block.',
      },
      {
        id: 's7-5',
        chapter: 'How you help',
        body: 'Winter clothes. Tutoring to close a reading gap that trauma, not ability, created. A bike, eventually. The small stuff that adds up to a normal childhood.',
      },
    ],
  },
  {
    id: 'child-8',
    firstName: 'Noah',
    initials: 'N.C.',
    ageRange: '3',
    region: 'Southeast',
    image: '/children/child-8.jpg',
    supportSummary: 'Energetic toddler full of wonder, needs early development support and a stable home.',
    needs: ['Early Learning Materials', 'Healthy Meals', 'Childcare Support'],
    goals: ['Learn new words', 'Play with other kids', 'Feel safe'],
    talents: ['Running', 'Laughing', 'Exploring'],
    votes: 421,
    fundsRaised: 1794.50,
    fundingGoal: 2000,
    urgencyLevel: 'high',
    recentUpdates: [
      { id: 'u8', date: '2024-03-19', title: 'Progress', content: 'Noah is learning new words every day and loves storytime!' },
    ],
    relatedPrograms: ['prog-1'],
    activeCampaigns: ['camp-1'],
    story: [
      {
        id: 's8-1',
        chapter: 'Born into uncertainty',
        pullQuote: 'He weighed four pounds the day he came home. He weighs more than that in giggles now.',
        body: 'Noah arrived early and small, to a mother who was herself still a child in many ways. She tried. The village around her was too thin to catch them both when things fell.',
      },
      {
        id: 's8-2',
        chapter: 'A safe place',
        body: 'At eighteen months, Noah was placed with a foster family who had been waiting for a toddler. Their older son, adopted from foster care himself, calls Noah his "little man." The house is loud, warm, and full of goldfish crackers.',
      },
      {
        id: 's8-3',
        chapter: 'Who he is today',
        body: 'Noah is all motion. He runs full-speed toward people he loves and toward squirrels, which is most of his day. He just learned "please" and is deploying it with devastating effectiveness.',
      },
      {
        id: 's8-4',
        chapter: 'What he needs next',
        body: 'The early years set the rest. Stable meals, early learning time, and the kind of boring consistency that builds a confident three-year-old.',
      },
      {
        id: 's8-5',
        chapter: 'How you help',
        body: 'Diapers, developmental toys, and a childcare subsidy that lets his foster parents keep their jobs while Noah gets the attention he deserves.',
      },
    ],
  },
  {
    id: 'child-9',
    firstName: 'Miguel',
    initials: 'M.R.',
    ageRange: '5',
    region: 'Southwest',
    image: '/children/child-9.jpg',
    supportSummary: 'Bright and social boy adjusting to a new home, thrives with structure and encouragement.',
    needs: ['Preschool Supplies', 'Speech Therapy', 'Sports Programs'],
    goals: ['Make friends at school', 'Learn to write his name', 'Play soccer'],
    talents: ['Sharing', 'Building blocks', 'Dancing'],
    votes: 267,
    fundsRaised: 932.25,
    fundingGoal: 2000,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u9', date: '2024-03-17', title: 'Achievement', content: 'Miguel wrote his first name all by himself!' },
    ],
    relatedPrograms: ['prog-1', 'prog-3'],
    activeCampaigns: ['camp-2'],
    story: [
      {
        id: 's9-1',
        chapter: 'Two languages',
        pullQuote: 'He dreams in Spanish and argues in English.',
        body: 'Miguel spent his first years in his grandmother\'s apartment. Spanish at the breakfast table, English on the TV. She was his whole world. When she fell ill and no other family could step in, he entered the system.',
      },
      {
        id: 's9-2',
        chapter: 'A new rhythm',
        body: 'His foster family is bilingual — intentional placement by a caseworker who fought for it. It was the difference between a scared four-year-old and one who could ask for "agua" on the first night.',
      },
      {
        id: 's9-3',
        chapter: 'Who he is today',
        body: 'He loves blocks and dancing and the ritual of being the one who sets the table. He\'s social, direct, and has opinions on everything — especially what snack gets packed in his preschool lunch.',
      },
      {
        id: 's9-4',
        chapter: 'What he dreams about',
        body: 'Make a best friend at preschool. Write his full name — first and last. Play soccer on the team his older cousin plays on.',
      },
      {
        id: 's9-5',
        chapter: 'How you help',
        body: 'Speech therapy supports his bilingual development. Preschool supplies, books in both languages, and sports program fees give him the scaffolding his confidence deserves.',
      },
    ],
  },
  {
    id: 'child-10',
    firstName: 'Kai',
    initials: 'K.L.',
    ageRange: '4',
    region: 'Pacific Northwest',
    image: '/children/child-10.jpg',
    supportSummary: 'Resilient little one who loves rain puddles and animals, healing with play therapy.',
    needs: ['Play Therapy', 'Winter Gear', 'Healthy Meals'],
    goals: ['Feel comfortable at daycare', 'Learn colors and shapes', 'Have a pet friend'],
    talents: ['Imagination', 'Animal love', 'Bravery'],
    votes: 389,
    fundsRaised: 1642.90,
    fundingGoal: 2500,
    urgencyLevel: 'high',
    recentUpdates: [
      { id: 'u10', date: '2024-03-21', title: 'Breakthrough', content: 'Kai had his first full week at daycare without tears!' },
    ],
    relatedPrograms: ['prog-2'],
    activeCampaigns: ['camp-1', 'camp-3'],
    story: [
      {
        id: 's10-1',
        chapter: 'Rain-puddle kid',
        pullQuote: 'Put him in boots and he will find every puddle within a mile.',
        body: 'Kai is four. He came into foster care after instability at home made it unsafe for a child who was already small, already sensitive, already paying close attention to everything.',
      },
      {
        id: 's10-2',
        chapter: 'The first months',
        body: 'Daycare was too loud. Transitions were too fast. A play therapist trained in attachment began seeing him twice a week. It has taken time, but the first full week without tears came in March. His foster mom cried when she heard.',
      },
      {
        id: 's10-3',
        chapter: 'Who he is today',
        body: 'He loves animals — dogs especially, and the neighbor\'s cat who has finally let him pet her. He is learning colors, shapes, and that adults come back when they say they\'ll come back.',
      },
      {
        id: 's10-4',
        chapter: 'What he dreams about',
        body: 'Have a pet of his own someday. Keep feeling comfortable at daycare. Learn the names for feelings that used to just be storms inside him.',
      },
      {
        id: 's10-5',
        chapter: 'How you help',
        body: 'Play therapy sessions are the engine of his progress. Winter gear and steady meals build the rest. Every contribution is a week of weekly appointments he won\'t have to miss.',
      },
    ],
  },
  {
    id: 'child-11',
    firstName: 'Liam',
    initials: 'L.P.',
    ageRange: '7',
    region: 'Midwest',
    image: '/children/child-11.jpg',
    supportSummary: 'Smart and eager learner in a new school, needs support to catch up academically.',
    needs: ['Tutoring', 'School Supplies', 'After-School Programs'],
    goals: ['Catch up in reading', 'Make the honor roll', 'Join a sports team'],
    talents: ['Math', 'Running', 'Kindness'],
    votes: 312,
    fundsRaised: 2084.60,
    fundingGoal: 3500,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u11', date: '2024-03-16', title: 'Academic Win', content: 'Liam improved two reading levels this semester!' },
    ],
    relatedPrograms: ['prog-1', 'prog-5'],
    activeCampaigns: ['camp-2'],
    story: [
      {
        id: 's11-1',
        chapter: 'A bright mind, a rough start',
        pullQuote: 'He does math in his head while everyone else is still writing it down.',
        body: 'Liam is seven. He was pulled out of school often in his early years — to move, to help look after younger siblings, to cover for adults who couldn\'t. He missed whole chunks of first grade.',
      },
      {
        id: 's11-2',
        chapter: 'How he came to us',
        body: 'A neighbor\'s concern triggered the call that led to Liam\'s placement. His foster parents sat with him the first night and just listened — to a kid who had more inside him than anyone had stopped to hear.',
      },
      {
        id: 's11-3',
        chapter: 'Who he is today',
        body: 'He is quick at math and gaining fast at reading. He runs. He is kind to the younger kids in his foster family in a way that suggests he\'s done this before. He\'s a softer version of himself now than when he arrived.',
      },
      {
        id: 's11-4',
        chapter: 'What he dreams about',
        body: 'Catch up to grade level in reading. Make the honor roll. Join the school track team — his gym teacher has been telling him all year that he\'s fast.',
      },
      {
        id: 's11-5',
        chapter: 'How you help',
        body: 'Weekly tutoring, after-school programs, and supplies that let his foster family focus on his emotional world, not on figuring out how to afford new sneakers.',
      },
    ],
  },
  {
    id: 'child-12',
    firstName: 'Oliver',
    initials: 'O.H.',
    ageRange: '5',
    region: 'Southeast',
    image: '/children/child-12.jpg',
    supportSummary: 'Gentle and loving boy who bonds deeply with animals, thriving in a nature-based care setting.',
    needs: ['Animal Therapy', 'Outdoor Programs', 'Early Learning'],
    goals: ['Care for animals', 'Start kindergarten', 'Feel confident'],
    talents: ['Animal care', 'Gentleness', 'Outdoor play'],
    votes: 245,
    fundsRaised: 1088.45,
    fundingGoal: 2000,
    urgencyLevel: 'low',
    recentUpdates: [
      { id: 'u12', date: '2024-03-13', title: 'Connection', content: 'Oliver helped name the new therapy dog at Peaceful Pines!' },
    ],
    relatedPrograms: ['prog-3'],
    activeCampaigns: ['camp-4'],
    story: [
      {
        id: 's12-1',
        chapter: 'A soft-spoken kid',
        pullQuote: 'He whispers to the dog, and the dog listens.',
        body: 'Oliver is five. He doesn\'t talk much — not with people, at least. Early in his life, adult voices in his home were often loud and often angry. Quiet became his armor.',
      },
      {
        id: 's12-2',
        chapter: 'A different kind of home',
        body: 'Oliver\'s current placement is with a family who runs a small nature-based care program. Chickens. A donkey named Clover. An old retriever who has decided Oliver is his person. Something in Oliver eased when he arrived here.',
      },
      {
        id: 's12-3',
        chapter: 'Who he is today',
        body: 'He is gentle. He carries eggs back to the kitchen like they are glass. He is starting to speak more — first to the animals, then to his foster brother, then, last week, to the kindergarten teacher on the first day of school.',
      },
      {
        id: 's12-4',
        chapter: 'What he dreams about',
        body: 'Help take care of the animals for real, not just pretend. Start kindergarten and not be scared. Have a best friend the way the older kids do.',
      },
      {
        id: 's12-5',
        chapter: 'How you help',
        body: 'Animal-assisted therapy sessions. Outdoor program fees. Early learning support so his first classroom experience is a good one.',
      },
    ],
  },
  {
    id: 'child-13',
    firstName: 'Mason',
    initials: 'M.W.',
    ageRange: '6',
    region: 'Northeast',
    image: '/children/child-13.jpg',
    supportSummary: 'Active and imaginative boy who loves climbing and outdoor adventures.',
    needs: ['Sports Equipment', 'Counseling', 'School Supplies'],
    goals: ['Join a climbing club', 'Learn to swim', 'Make lasting friendships'],
    talents: ['Climbing', 'Imagination', 'Energy'],
    votes: 198,
    fundsRaised: 792.35,
    fundingGoal: 2000,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u13', date: '2024-03-11', title: 'Adventure', content: 'Mason completed his first outdoor obstacle course!' },
    ],
    relatedPrograms: ['prog-3', 'prog-5'],
    activeCampaigns: ['camp-6'],
    story: [
      {
        id: 's13-1',
        chapter: 'Never standing still',
        pullQuote: 'He climbed the bookshelf before he could read the books on it.',
        body: 'Mason is six. He has been in motion his whole short life — bouncing, running, climbing anything tall enough to be a challenge. What looked to some adults like trouble was really a kid trying to outrun a complicated home.',
      },
      {
        id: 's13-2',
        chapter: 'How he came to us',
        body: 'When the instability at home tipped over into something a caseworker could no longer ignore, Mason was placed with a foster family close to a state park. They took him hiking on day two. He slept the whole way home.',
      },
      {
        id: 's13-3',
        chapter: 'Who he is today',
        body: 'His imagination is enormous. He invents elaborate games with complicated rules. He is learning that some feelings are bigger than climbing, and he is learning what to do with those — in counseling, twice a week, with a therapist he really likes.',
      },
      {
        id: 's13-4',
        chapter: 'What he dreams about',
        body: 'Join a climbing club. Learn to swim. Have a school friend over for a sleepover — the first of his life.',
      },
      {
        id: 's13-5',
        chapter: 'How you help',
        body: 'Counseling, sports equipment, and the school supplies that let him show up ready instead of stressed. All of it turns a wired kid into a thriving one.',
      },
    ],
  },
  {
    id: 'child-14',
    firstName: 'Lucas',
    initials: 'L.D.',
    ageRange: '5',
    region: 'Mountain West',
    image: '/children/child-14.jpg',
    supportSummary: 'Curious and joyful boy who lights up every room, needs support for speech development.',
    needs: ['Speech Therapy', 'Early Education', 'Healthy Meals'],
    goals: ['Communicate clearly', 'Start pre-K', 'Make friends'],
    talents: ['Smiling', 'Sharing snacks', 'Dancing'],
    votes: 456,
    fundsRaised: 1891.75,
    fundingGoal: 2500,
    urgencyLevel: 'high',
    recentUpdates: [
      { id: 'u14', date: '2024-03-20', title: 'Speech Progress', content: 'Lucas said his first full sentence in therapy this week!' },
    ],
    relatedPrograms: ['prog-2'],
    activeCampaigns: ['camp-3'],
    story: [
      {
        id: 's14-1',
        chapter: 'All smiles',
        pullQuote: 'If you walk past his classroom at pickup, you will hear his laugh before you see him.',
        body: 'Lucas is five and a half. He hasn\'t yet found all the words he needs, but he has found the laugh — a huge one, inherited from a mother he doesn\'t get to see as often as either of them would like.',
      },
      {
        id: 's14-2',
        chapter: 'A careful plan',
        body: 'Lucas\' case is a kinship placement, with a working plan toward reunification. His aunt is his foster parent. The family is doing the slow, patient work of building back what an earlier chapter took.',
      },
      {
        id: 's14-3',
        chapter: 'Who he is today',
        body: 'He dances to any song with a beat. He shares his snacks unprompted. He just said his first complete sentence in speech therapy — his SLP recorded it on her phone to play for his aunt.',
      },
      {
        id: 's14-4',
        chapter: 'What he dreams about',
        body: 'Talk clearly enough that grownups understand him the first time. Start pre-K with the kids down the street. Hug his mom at a family visit without needing to be told it\'s okay.',
      },
      {
        id: 's14-5',
        chapter: 'How you help',
        body: 'Speech therapy sessions are expensive, and they are the single biggest lever for his development right now. Plus early education supplies and healthy meals for a growing boy.',
      },
    ],
  },
  {
    id: 'child-15',
    firstName: 'Jake',
    initials: 'J.R.',
    ageRange: '5',
    region: 'Southeast',
    image: '/children/child-15.jpg',
    supportSummary: 'Playful and loyal boy who loves dogs and the outdoors, adjusting to a new foster family.',
    needs: ['Animal Therapy', 'Play Therapy', 'Clothing'],
    goals: ['Bond with foster family', 'Start school confidently', 'Have a pet'],
    talents: ['Animal love', 'Laughter', 'Hugging'],
    votes: 334,
    fundsRaised: 1443.20,
    fundingGoal: 2500,
    urgencyLevel: 'medium',
    recentUpdates: [
      { id: 'u15', date: '2024-03-18', title: 'Bonding', content: 'Jake is settling in beautifully with his foster family and their golden retriever!' },
    ],
    relatedPrograms: ['prog-2', 'prog-3'],
    activeCampaigns: ['camp-1'],
    story: [
      {
        id: 's15-1',
        chapter: 'A loyal heart',
        pullQuote: 'He hugs hello and he hugs goodbye and he does not let go halfway.',
        body: 'Jake is five. His early home was unpredictable in the quiet way — not loud, not violent, just often empty of the adult who was supposed to be there. He got good at keeping himself company.',
      },
      {
        id: 's15-2',
        chapter: 'A dog named Biscuit',
        body: 'Jake\'s foster family has a golden retriever named Biscuit, who on the first afternoon decided Jake was his. They nap together. Jake reads his picture books out loud to him. His caseworker says she hasn\'t seen him this relaxed in months.',
      },
      {
        id: 's15-3',
        chapter: 'Who he is today',
        body: 'He laughs with his whole body. He will hug anyone who seems like they need one. He is learning to trust that the adults in his life right now are not going to disappear.',
      },
      {
        id: 's15-4',
        chapter: 'What he dreams about',
        body: 'Start kindergarten with his foster brother. Go to the dog park every weekend. Have a pet dog of his own someday.',
      },
      {
        id: 's15-5',
        chapter: 'How you help',
        body: 'Animal-assisted therapy, play therapy, and seasonal clothing for a kid whose growth spurt is overdue. Your support builds the world he\'s starting to believe he gets to have.',
      },
    ],
  },
  {
    id: 'child-16',
    firstName: 'Ryan',
    initials: 'R.M.',
    ageRange: '3',
    region: 'Southwest',
    image: '/children/child-16.jpg',
    supportSummary: 'Sweet toddler with a big heart, needs early intervention and a loving stable environment.',
    needs: ['Early Intervention', 'Diapers & Essentials', 'Childcare'],
    goals: ['Hit developmental milestones', 'Feel secure', 'Learn through play'],
    talents: ['Cuddling', 'Stacking blocks', 'Belly laughs'],
    votes: 512,
    fundsRaised: 2386.55,
    fundingGoal: 3000,
    urgencyLevel: 'critical',
    recentUpdates: [
      { id: 'u16', date: '2024-03-22', title: 'Growth', content: 'Ryan started walking independently this month!' },
    ],
    relatedPrograms: ['prog-1'],
    activeCampaigns: ['camp-1', 'camp-5'],
    story: [
      {
        id: 's16-1',
        chapter: 'Tiny hands',
        pullQuote: 'He fell asleep on the ride home holding his caseworker\'s thumb.',
        body: 'Ryan is three. He is the youngest child currently on our platform. He came into the system after a medical incident revealed the full picture of what his earliest years had looked like.',
      },
      {
        id: 's16-2',
        chapter: 'Where he is now',
        body: 'Ryan is in a licensed foster home that specializes in early intervention for toddlers with developmental delays. He has a team — pediatrician, physical therapist, early learning specialist — and he has a foster mom who sings to him through every appointment.',
      },
      {
        id: 's16-3',
        chapter: 'Who he is today',
        body: 'He just started walking this month, six months later than most kids but with all the triumph in the world. He has a belly laugh that the household lives for. He stacks blocks. He hands you things with a very serious expression.',
      },
      {
        id: 's16-4',
        chapter: 'What he dreams about',
        body: 'He can\'t tell us yet, not in words. But the milestones ahead are clear: more words, more steps, more confidence, and a permanency plan that gives him a family for the long haul.',
      },
      {
        id: 's16-5',
        chapter: 'How you help',
        body: 'Early intervention is the single biggest gift a child like Ryan can receive. Your support funds specialists, developmental toys, and the quiet essentials — diapers, formula, childcare — that let his foster family focus on him, not on logistics.',
      },
    ],
  },
]

// Licensed Homes
export const homes: Home[] = [
  {
    id: 'home-1',
    name: 'Sunrise Family Home',
    type: 'foster',
    city: 'Portland',
    state: 'OR',
    isVerified: true,
    mission: 'Creating a warm, nurturing environment where every child can heal and grow.',
    description: 'Sunrise Family Home has been providing loving foster care for over 15 years. Our trauma-informed approach ensures every child receives personalized attention and care.',
    services: ['24/7 Care', 'Trauma-Informed Support', 'Educational Assistance', 'Family Therapy'],
    currentNeeds: ['Winter clothing', 'School supplies', 'Therapy funding'],
    childrenSupported: 4,
    capacity: 6,
    donationProgress: 8500,
    donationGoal: 12000,
    votes: 423,
    teamMembers: [
      { name: 'Sarah Johnson', role: 'Lead Caregiver', yearsExperience: 15 },
      { name: 'Michael Johnson', role: 'Support Caregiver', yearsExperience: 12 },
    ],
    licensingInfo: 'Oregon State Licensed Foster Home - License #FH-2019-4521',
    recentUpdates: [
      { id: 'h1u1', date: '2024-03-18', title: 'Home Improvement', content: 'New study room completed for homework and tutoring!' },
    ],
    fundingAllocation: [
      { category: 'Daily Care', percentage: 40 },
      { category: 'Education', percentage: 25 },
      { category: 'Therapy', percentage: 20 },
      { category: 'Activities', percentage: 15 },
    ],
  },
  {
    id: 'home-2',
    name: 'Harbor House',
    type: 'transitional',
    city: 'Seattle',
    state: 'WA',
    isVerified: true,
    mission: 'Preparing young adults for successful independent living through structured support.',
    description: 'Harbor House specializes in helping teens aged 16-21 transition to independent living with life skills training, job placement assistance, and continued education support.',
    services: ['Life Skills Training', 'Job Placement', 'Financial Literacy', 'Counseling'],
    currentNeeds: ['Job training materials', 'Kitchen equipment', 'Computer access'],
    childrenSupported: 8,
    capacity: 10,
    donationProgress: 15200,
    donationGoal: 20000,
    votes: 567,
    teamMembers: [
      { name: 'David Chen', role: 'Program Director', yearsExperience: 10 },
      { name: 'Lisa Park', role: 'Life Coach', yearsExperience: 7 },
    ],
    licensingInfo: 'Washington State Licensed Transitional Housing - License #TH-2020-8834',
    recentUpdates: [
      { id: 'h2u1', date: '2024-03-15', title: 'Success Story', content: 'Two residents secured full-time employment this month!' },
    ],
    fundingAllocation: [
      { category: 'Housing', percentage: 35 },
      { category: 'Life Skills', percentage: 30 },
      { category: 'Education', percentage: 20 },
      { category: 'Emergency Fund', percentage: 15 },
    ],
  },
  {
    id: 'home-3',
    name: 'Meadowbrook Care Home',
    type: 'group',
    city: 'Denver',
    state: 'CO',
    isVerified: true,
    mission: 'Specialized therapeutic care for children with complex needs in a home-like setting.',
    description: 'Meadowbrook provides round-the-clock therapeutic care with on-site counselors, specialized education support, and a calm, structured environment.',
    services: ['Therapeutic Care', 'On-site Counseling', 'Special Education', 'Medical Coordination'],
    currentNeeds: ['Sensory equipment', 'Art therapy supplies', 'Outdoor play equipment'],
    childrenSupported: 12,
    capacity: 14,
    donationProgress: 22000,
    donationGoal: 30000,
    votes: 712,
    teamMembers: [
      { name: 'Dr. Amanda Roberts', role: 'Clinical Director', yearsExperience: 18 },
      { name: 'James Wilson', role: 'House Manager', yearsExperience: 9 },
    ],
    licensingInfo: 'Colorado State Licensed Group Home - License #GH-2018-2234',
    recentUpdates: [
      { id: 'h3u1', date: '2024-03-20', title: 'New Program', content: 'Launched animal-assisted therapy program!' },
    ],
    fundingAllocation: [
      { category: 'Therapeutic Care', percentage: 45 },
      { category: 'Medical', percentage: 25 },
      { category: 'Education', percentage: 20 },
      { category: 'Recreation', percentage: 10 },
    ],
  },
  {
    id: 'home-4',
    name: 'Peaceful Pines Foster Home',
    type: 'foster',
    city: 'Austin',
    state: 'TX',
    isVerified: true,
    mission: 'Every child deserves peace, love, and the chance to discover their potential.',
    description: 'A rural foster home offering children the healing power of nature, animals, and a tight-knit family environment.',
    services: ['Nature-Based Healing', 'Animal Care Programs', 'Tutoring', 'Art Therapy'],
    currentNeeds: ['Animal feed', 'Garden supplies', 'Educational materials'],
    childrenSupported: 3,
    capacity: 4,
    donationProgress: 4200,
    donationGoal: 8000,
    votes: 289,
    teamMembers: [
      { name: 'Maria Garcia', role: 'Lead Caregiver', yearsExperience: 11 },
    ],
    licensingInfo: 'Texas State Licensed Foster Home - License #FH-2021-6678',
    recentUpdates: [
      { id: 'h4u1', date: '2024-03-16', title: 'Spring Garden', content: 'Kids planted their first vegetable garden!' },
    ],
    fundingAllocation: [
      { category: 'Daily Care', percentage: 50 },
      { category: 'Animal Program', percentage: 20 },
      { category: 'Education', percentage: 20 },
      { category: 'Activities', percentage: 10 },
    ],
  },
]

// Programs
export const programs: Program[] = [
  {
    id: 'prog-1',
    name: 'Bright Futures Tutoring',
    type: 'education',
    city: 'Multiple',
    state: 'Nationwide',
    isVerified: true,
    mission: 'Closing the educational gap for children in foster care through personalized learning.',
    description: 'One-on-one and small group tutoring for children of all ages, with special focus on reading, math, and building confidence.',
    services: ['One-on-One Tutoring', 'Homework Help', 'Test Preparation', 'Learning Assessments'],
    currentNeeds: ['Textbooks', 'Tablets', 'Tutor training'],
    childrenSupported: 156,
    donationProgress: 18500,
    donationGoal: 25000,
    votes: 834,
    recentUpdates: [
      { id: 'p1u1', date: '2024-03-19', title: 'Impact', content: 'Students showed 40% improvement in reading scores!' },
    ],
  },
  {
    id: 'prog-2',
    name: 'Healing Hearts Therapy',
    type: 'therapy',
    city: 'Multiple',
    state: 'Nationwide',
    isVerified: true,
    mission: 'Providing trauma-informed mental health support for children healing from adversity.',
    description: 'Licensed therapists offer individual, group, and family therapy sessions tailored to the unique needs of foster children.',
    services: ['Individual Therapy', 'Group Sessions', 'Family Therapy', 'Crisis Support'],
    currentNeeds: ['Therapy materials', 'Telehealth equipment', 'Training funds'],
    childrenSupported: 234,
    donationProgress: 32000,
    donationGoal: 40000,
    votes: 1023,
    recentUpdates: [
      { id: 'p2u1', date: '2024-03-17', title: 'Expansion', content: 'Added telehealth services in 5 new states!' },
    ],
  },
  {
    id: 'prog-3',
    name: 'Creative Expressions',
    type: 'enrichment',
    city: 'Chicago',
    state: 'IL',
    isVerified: true,
    mission: 'Helping children discover their voice through art, music, and creative expression.',
    description: 'Weekly art, music, and drama classes that provide emotional outlets and build confidence and creativity.',
    services: ['Art Classes', 'Music Lessons', 'Drama Club', 'Creative Writing'],
    currentNeeds: ['Art supplies', 'Musical instruments', 'Performance space'],
    childrenSupported: 89,
    donationProgress: 11200,
    donationGoal: 15000,
    votes: 445,
    recentUpdates: [
      { id: 'p3u1', date: '2024-03-14', title: 'Event', content: 'Spring art showcase featured 30 student pieces!' },
    ],
  },
  {
    id: 'prog-4',
    name: 'Ready for Life',
    type: 'life-skills',
    city: 'Phoenix',
    state: 'AZ',
    isVerified: true,
    mission: 'Preparing teens aging out of foster care with essential life skills for independence.',
    description: 'Comprehensive life skills program covering financial literacy, job readiness, cooking, and independent living.',
    services: ['Financial Literacy', 'Job Training', 'Cooking Classes', 'Apartment Living Skills'],
    currentNeeds: ['Training materials', 'Kitchen supplies', 'Job placement partnerships'],
    childrenSupported: 67,
    donationProgress: 9800,
    donationGoal: 18000,
    votes: 378,
    recentUpdates: [
      { id: 'p4u1', date: '2024-03-13', title: 'Achievement', content: '15 graduates secured stable housing this quarter!' },
    ],
  },
  {
    id: 'prog-5',
    name: 'Mentors Matter',
    type: 'mentorship',
    city: 'Multiple',
    state: 'Nationwide',
    isVerified: true,
    mission: 'Connecting foster children with caring adult mentors for lasting relationships.',
    description: 'Trained volunteer mentors provide consistent, positive relationships and guidance to children in foster care.',
    services: ['One-on-One Mentoring', 'Group Activities', 'Career Guidance', 'College Prep'],
    currentNeeds: ['Mentor training', 'Activity funds', 'Background checks'],
    childrenSupported: 312,
    donationProgress: 21500,
    donationGoal: 30000,
    votes: 756,
    recentUpdates: [
      { id: 'p5u1', date: '2024-03-11', title: 'Milestone', content: 'Matched our 500th mentor-mentee pair!' },
    ],
  },
]

// Campaigns have been consolidated — all donations flow through child profiles.
// This empty array remains so legacy selectors that still import `campaigns`
// (e.g. getCampaignById) continue to type-check, while producing no results.
export const campaigns: Campaign[] = []

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'HavenBridge helped us provide the support our foster children needed when we couldn\'t do it alone. The community that rallied around us changed everything.',
    author: 'Sarah & Michael Johnson',
    role: 'Foster Parents',
    location: 'Portland, OR',
    image: '/testimonials/test-1.jpeg',
  },
  {
    id: 'test-2',
    quote: 'As a program director, I\'ve seen firsthand how donor support transforms children\'s lives. One therapy session can be the turning point a child needs.',
    author: 'Dr. Amanda Roberts',
    role: 'Clinical Director, Meadowbrook Care',
    location: 'Denver, CO',
    image: '/testimonials/test-2.jpeg',
  },
  {
    id: 'test-3',
    quote: 'I aged out of foster care, and programs like Ready for Life gave me the skills to succeed. Now I mentor other teens through their transition.',
    author: 'Marcus T.',
    role: 'Program Graduate & Mentor',
    location: 'Phoenix, AZ',
    image: '/testimonials/test-3.jpeg',
  },
  {
    id: 'test-4',
    quote: 'Every month I give a little, and every month I see exactly where it went. That transparency is rare — and it\'s why I keep coming back.',
    author: 'Priya Shah',
    role: 'Monthly Donor',
    location: 'Austin, TX',
    image: '/testimonials/test-4.jpeg',
  },
  {
    id: 'test-5',
    quote: 'Our caseload is heavy, but HavenBridge closes gaps we couldn\'t close ourselves — tutoring, winter coats, the little things that make a huge difference.',
    author: 'James Ellis',
    role: 'Licensed Caseworker',
    location: 'Atlanta, GA',
    image: '/testimonials/test-5.jpeg',
  },
  {
    id: 'test-6',
    quote: 'I voted on a campaign for a little girl\'s therapy. Six weeks later I got an update that she\'d started her first session. That\'s real impact.',
    author: 'Rebecca Liu',
    role: 'Community Supporter',
    location: 'Seattle, WA',
    image: '/testimonials/test-6.jpeg',
  },
  {
    id: 'test-7',
    quote: 'My classroom partners with a HavenBridge home. My students write letters, raise money, and learn that their kindness travels further than they think.',
    author: 'Mr. Daniel Ortiz',
    role: '5th Grade Teacher',
    location: 'Chicago, IL',
    image: '/testimonials/test-7.jpeg',
  },
  {
    id: 'test-8',
    quote: 'I was one of those kids once. Now I\'m on the other side, advocating. HavenBridge is how I pay it forward — and keep showing up.',
    author: 'Tasha M.',
    role: 'Volunteer Advocate',
    location: 'Boston, MA',
    image: '/testimonials/test-8.jpeg',
  },
  {
    id: 'test-9',
    quote: 'Running a small transitional home is expensive. The community funding we received last quarter kept our doors open and three teens stable.',
    author: 'Carmen Reyes',
    role: 'House Director, Bridge House',
    location: 'Albuquerque, NM',
    image: '/testimonials/test-9.jpeg',
  },
  {
    id: 'test-10',
    quote: 'The platform is privacy-safe but still deeply human. I know who I\'m helping without ever compromising a child\'s safety. That balance matters.',
    author: 'Dr. Evan Park',
    role: 'Pediatric Psychologist',
    location: 'Minneapolis, MN',
    image: '/testimonials/test-10.jpeg',
  },
]

// FAQs
export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How does HavenBridge work?',
    answer: 'HavenBridge connects donors with licensed foster homes, verified programs, and specific support campaigns. Your donations directly fund care, education, therapy, and enrichment for children in foster care. We work only with licensed partners and ensure transparent impact tracking.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'Can I donate without creating an account?',
    answer: 'Yes! You can make one-time donations without an account. However, creating an account allows you to track your impact, vote on community priorities, save causes you care about, and manage recurring donations.',
    category: 'donations',
  },
  {
    id: 'faq-3',
    question: 'Why do I need an account to vote?',
    answer: 'Voting helps our community identify and prioritize urgent needs. Account verification ensures fair voting and prevents abuse. Votes influence which campaigns and homes receive increased visibility, helping direct community attention to the most pressing needs.',
    category: 'voting',
  },
  {
    id: 'faq-4',
    question: 'Why is a payment method required for voting?',
    answer: 'Adding a payment method during signup helps verify your identity and streamlines future support actions. You will NOT be charged automatically. The payment method is stored securely for when you choose to donate.',
    category: 'voting',
  },
  {
    id: 'faq-5',
    question: 'Will I be charged automatically?',
    answer: 'No. Your payment method is stored securely but never charged automatically. You control every donation. Recurring donations require explicit opt-in and can be canceled at any time.',
    category: 'donations',
  },
  {
    id: 'faq-6',
    question: 'Do votes decide where children are placed?',
    answer: 'Absolutely not. Votes only affect visibility and help prioritize support needs within our platform. All placement decisions are made by licensed caseworkers and child welfare professionals. HavenBridge never influences or controls placement decisions.',
    category: 'voting',
  },
  {
    id: 'faq-7',
    question: 'How are homes and programs vetted?',
    answer: 'We only partner with state-licensed foster homes and accredited programs. Our team verifies licensing, conducts background checks, reviews safety protocols, and monitors ongoing compliance. Every partner in our network meets strict child welfare standards.',
    category: 'trust',
  },
  {
    id: 'faq-8',
    question: 'How are donations used?',
    answer: 'Donations fund specific campaigns, programs, or homes you choose. We provide transparent allocation breakdowns for every recipient. Funds cover essentials, education, therapy, enrichment, and emergency support. We maintain minimal overhead to maximize impact.',
    category: 'donations',
  },
  {
    id: 'faq-9',
    question: 'Is child information kept private?',
    answer: 'Yes. We use privacy-safe profiles showing only first names or initials, age ranges, regions, and support needs. No identifying information, photos, or placement details are ever shared publicly. Privacy and safety are our top priorities.',
    category: 'privacy',
  },
  {
    id: 'faq-10',
    question: 'Are donations tax deductible?',
    answer: 'HavenBridge is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law. You will receive a receipt for your records, and annual tax summaries are available in your dashboard.',
    category: 'donations',
  },
]

// Helper functions
export function getChildById(id: string): Child | undefined {
  return children.find(c => c.id === id)
}

// Derive a URL slug from a child's first name (lowercased, stripped).
// All current first names are unique — if a collision is ever introduced,
// disambiguate by appending the child's numeric id suffix.
export function childSlug(child: Child): string {
  return child.firstName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function getChildBySlug(slug: string): Child | undefined {
  const normalized = slug.toLowerCase()
  // First try exact slug match (pretty URLs), then fall back to id for
  // backward compatibility with any /child-N links that still exist.
  return (
    children.find(c => childSlug(c) === normalized) ||
    children.find(c => c.id === normalized)
  )
}

export function getHomeById(id: string): Home | undefined {
  return homes.find(h => h.id === id)
}

export function getProgramById(id: string): Program | undefined {
  return programs.find(p => p.id === id)
}

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find(c => c.id === id)
}

export function getChildrenByUrgency(level: 'low' | 'medium' | 'high' | 'critical'): Child[] {
  return children.filter(c => c.urgencyLevel === level)
}

export function getCampaignsByCategory(category: string): Campaign[] {
  return campaigns.filter(c => c.category === category)
}

export function getFeaturedCampaigns(count: number = 3): Campaign[] {
  return campaigns
    .sort((a, b) => b.supporterCount - a.supporterCount)
    .slice(0, count)
}

// Ranks children by combined engagement: votes + funds raised.
// Used by the homepage "Featured Campaigns" section to surface the
// top-ranking children (no program or general campaigns).
export function getTopChildren(count: number = 8): Child[] {
  const maxVotes = Math.max(...children.map(c => c.votes), 1)
  const maxRaised = Math.max(...children.map(c => c.fundsRaised), 1)
  return [...children]
    .sort((a, b) => {
      const scoreA = a.votes / maxVotes + a.fundsRaised / maxRaised
      const scoreB = b.votes / maxVotes + b.fundsRaised / maxRaised
      return scoreB - scoreA
    })
    .slice(0, count)
}

export function getFeaturedHomes(count: number = 3): Home[] {
  return homes
    .sort((a, b) => b.votes - a.votes)
    .slice(0, count)
}

export function getFeaturedPrograms(count: number = 3): Program[] {
  return programs
    .sort((a, b) => b.votes - a.votes)
    .slice(0, count)
}

export function getFeaturedChildren(count: number = 4): Child[] {
  return children
    .sort((a, b) => b.votes - a.votes)
    .slice(0, count)
}
