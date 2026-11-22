export const items = [
  {
    id: 1,
    title: 'Blue Water Bottle',
    category: 'Accessories',
    status: 'Available',
    location: 'Science Building',
    foundDate: '2026-11-05',
    description:
      'Insulated blue bottle with a silver lid and a small campus sticker on the side. It was found near the chemistry lab entrance.',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    reportedBy: 'Campus Security',
    contact: 'security@university.edu',
    color: 'Blue',
    brand: 'Hydro Flask',
    tags: ['water bottle', 'blue', 'stationary'],
  },
  {
    id: 2,
    title: 'Silver Laptop Sleeve',
    category: 'Electronics',
    status: 'Pending Review',
    location: 'Library West',
    foundDate: '2026-11-04',
    description:
      'Slim padded laptop sleeve in charcoal grey with an embroidered initials patch and a loose zipper pull.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    reportedBy: 'Library Staff',
    contact: 'helpdesk@university.edu',
    color: 'Silver',
    brand: 'NOMATIC',
    tags: ['laptop', 'sleeve', 'technology'],
  },
  {
    id: 3,
    title: 'Black Wallet',
    category: 'Personal Belongings',
    status: 'Claimed',
    location: 'Student Center',
    foundDate: '2026-11-03',
    description:
      'Black leather wallet containing a student ID card and a small collection of receipts from the campus bookstore.',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
    reportedBy: 'Front Desk',
    contact: 'studentcenter@university.edu',
    color: 'Black',
    brand: 'Fossil',
    tags: ['wallet', 'black', 'personal'],
  },
  {
    id: 4,
    title: 'Wireless Earbuds',
    category: 'Electronics',
    status: 'Available',
    location: 'Engineering Hall',
    foundDate: '2026-11-02',
    description:
      'Pair of white wireless earbuds in a charging case with a light purple interior. Case is slightly scuffed but fully working.',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    reportedBy: 'Engineering Lab Assistant',
    contact: 'engineering@university.edu',
    color: 'White',
    brand: 'Apple AirPods',
    tags: ['earbuds', 'wireless', 'case'],
  },
  {
    id: 5,
    title: 'University ID Card Holder',
    category: 'Personal Belongings',
    status: 'Available',
    location: 'Cafe Terrace',
    foundDate: '2026-11-01',
    description:
      'Clear acrylic card holder with a maroon lanyard and student badge clips. No identification visible inside.',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    reportedBy: 'Cafe Staff',
    contact: 'cafe@university.edu',
    color: 'Maroon',
    brand: 'Campus Brand',
    tags: ['id', 'lanyard', 'maroon'],
  },
  {
    id: 6,
    title: 'Red Notebook',
    category: 'Academics',
    status: 'Available',
    location: 'Lecture Hall A',
    foundDate: '2026-10-30',
    description:
      'A red hardcover notebook with physics notes and a handwritten name inside the front cover.',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    reportedBy: 'Campus Events Team',
    contact: 'events@university.edu',
    color: 'Red',
    brand: 'Oxford',
    tags: ['notebook', 'academic', 'red'],
  },
]

export const dashboardStats = [
  { label: 'Items recovered', value: '1,248', trend: '+12% vs last month' },
  { label: 'Awaiting pickup', value: '42', trend: '8 urgent follow-ups' },
  { label: 'Claims approved', value: '185', trend: '+21 this week' },
  { label: 'Resolution rate', value: '96.2%', trend: 'Above target' },
]

export const recentClaims = [
  {
    id: 1001,
    item: 'Blue Water Bottle',
    claimant: 'A. Rahman',
    unit: 'Computer Science',
    date: '2026-11-06',
    status: 'Pending',
  },
  {
    id: 1002,
    item: 'Wireless Earbuds',
    claimant: 'L. Thompson',
    unit: 'Electrical Engineering',
    date: '2026-11-05',
    status: 'Approved',
  },
  {
    id: 1003,
    item: 'Black Wallet',
    claimant: 'S. Patel',
    unit: 'Business Administration',
    date: '2026-11-04',
    status: 'In Review',
  },
  {
    id: 1004,
    item: 'Red Notebook',
    claimant: 'J. Nguyen',
    unit: 'Physics',
    date: '2026-11-03',
    status: 'Pending',
  },
]

export const campusHighlights = [
  'Weekly recovery summary shared with Student Affairs',
  '25 items returned to owners this month',
  'Most recovered categories: accessories, electronics, documents',
]
