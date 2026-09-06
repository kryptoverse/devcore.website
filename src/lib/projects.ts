export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string;
  tech: string[];
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  stats: ProjectStat[];
  accent: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'bridge-directory',
    title: 'B.R.I.D.G.E. Directory',
    type: 'Full-Stack SaaS Platform',
    role: 'Full-Stack Developer',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Convex', 'React Router v7', 'OIDC'],
    description:
      'A full-stack business directory platform dedicated to discovering, promoting, and supporting Black-owned businesses. It features tiered membership plans, real-time data updates, real estate listings, and an integrated commerce platform.',
    overview:
      'B.R.I.D.G.E. Directory is a scalable SaaS platform with a searchable directory, role-based access control, direct messaging, and an email marketing engine. Business owners can manage their own listings while end users can bookmark businesses, leave reviews, and redeem promos.',
    challenge:
      'Building a fully reactive UI that updates in real-time across all connected clients while maintaining performance at scale, robust role-based access control for admins, owners, and users, and integrating a seamless membership payment flow.',
    solution:
      'Engineered with React 19, TypeScript, and Vite on the frontend, and powered by Convex for real-time serverless functions and WebSocket subscriptions. Implemented cursor-based pagination, server-side enforcement for operations, and a highly responsive mobile-first UI using shadcn/ui and Tailwind CSS.',
    stats: [
      { value: 'Live', label: 'WebSocket subscriptions' },
      { value: '3 Tiers', label: 'Membership plans' },
      { value: 'Roles', label: 'Access Control' },
    ],
    accent: '#2E7D6B',
    myRole: [
      'Engineered a fully reactive UI with real-time data updates using Convex WebSocket subscriptions.',
      'Implemented role-based access control with server-side enforcement for admins, business owners, and users.',
      'Developed a tiered membership system with integrated commerce and payment processing.',
      'Built a custom email marketing engine with campaigns, templates, and subscriber management.',
      'Optimized performance at scale using cursor-based pagination across all list views.',
      'Created a mobile-first responsive layout with dark/light mode and full semantic theming.',
    ],
    images: [
      '/Projects/bridgedirectory/image.png',
      '/Projects/bridgedirectory/image copy.png',
      '/Projects/bridgedirectory/image copy 2.png',
      '/Projects/bridgedirectory/image copy 3.png',
      '/Projects/bridgedirectory/image copy 4.png',
      '/Projects/bridgedirectory/image copy 5.png',
      '/Projects/bridgedirectory/image copy 6.png',
      '/Projects/bridgedirectory/image copy 7.png',
      '/Projects/bridgedirectory/image copy 8.png',
      '/Projects/bridgedirectory/image copy 9.png',
    ],
    hoverImage: '/Projects/bridgedirectory/image.png',
    github: '',
    liveUrl: 'https://bridge-directory.com/',
  },
  {
    id: 2,
    slug: 'groupxam',
    title: 'GroupXam',
    type: 'EdTech Platform',
    role: 'Full-Stack Developer',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JavaScript'],
    description:
      'GroupXam is an EdTech platform designed to help students prepare for competitive and standardized examinations such as WAEC, WASSCE, and JAMB. It provides online practice tests, subject-based questions, exam-style assessments, and performance tracking.',
    overview:
      'An end-to-end examination preparation platform where students can practice exam-style assessments with automatic evaluation and progress tracking, powered by a robust CMS for administrators.',
    challenge:
      'Creating a scalable and reliable evaluation engine for concurrent exam attempts, ensuring question randomization, and providing detailed performance analytics for students in real-time.',
    solution:
      'Developed a robust REST API backend using Node.js, Express, and MongoDB to handle high-frequency assessments and automatic answer evaluations, integrated with a dynamic React frontend for a seamless student experience.',
    stats: [
      { value: 'Auto', label: 'Answer evaluation' },
      { value: 'Live', label: 'Performance tracking' },
      { value: '100%', label: 'Responsive UI' },
    ],
    accent: '#5B7DB1',
    myRole: [
      'Developed the student authentication and profile management systems.',
      'Engineered the online exam and practice test engine with automatic answer evaluation.',
      'Built a comprehensive subject and question management system for administrators.',
      'Implemented real-time results and performance tracking analytics.',
      'Developed robust REST APIs using Node.js, Express.js, and MongoDB.',
      'Designed a fully responsive web interface for both students and admins.',
    ],
    images: [
      '/Projects/groupxam/image.png',
      '/Projects/groupxam/image copy.png',
      '/Projects/groupxam/image copy 2.png',
      '/Projects/groupxam/image copy 3.png',
      '/Projects/groupxam/image copy 4.png',
      '/Projects/groupxam/image copy 5.png',
    ],
    hoverImage: '/Projects/groupxam/image.png',
    github: '',
    liveUrl: 'https://www.groupxam.com/',
  },
  {
    id: 3,
    slug: 'aurelle',
    title: 'Maison Aurelle',
    type: '3D Interactive Experience',
    role: 'Frontend / 3D Developer',
    tech: ['Next.js', 'Three.js', 'GSAP', 'Tailwind CSS', 'React'],
    description:
      'An Awwwards-style 3D interactive website for a luxury perfume brand in Paris. Features interactive 3D models with smooth transitions, immersive scroll effects, and a highly polished aesthetic.',
    overview:
      'Aurelle (Maison de Parfum) is a digital experience crafted for a luxury fragrance brand. The site showcases their signature trio of extrait de parfums—Noir Absolu, Blanc Éthéré, and Rouge Velours—using immersive 3D models, smooth GSAP animations, and stunning visual storytelling.',
    challenge:
      'Creating a highly performant 3D web experience that feels luxurious and fluid. The challenge was integrating complex 3D models seamlessly into the scrolling narrative while maintaining perfect framerates and responsive design across all devices.',
    solution:
      'Leveraged Three.js for rendering the interactive perfume bottles and GSAP for orchestrating the scroll-driven animations. Built on top of Next.js to ensure fast load times and optimized asset delivery, resulting in a premium, award-winning feel.',
    stats: [
      { value: '3D', label: 'Interactive Models' },
      { value: '60fps', label: 'Smooth Animations' },
      { value: 'Premium', label: 'Quality Design' },
    ],
    accent: '#C49B57',
    myRole: [
      'Engineered the interactive 3D product showcase using Three.js.',
      'Implemented complex scroll-driven animations and transitions with GSAP.',
      'Built a highly polished, responsive frontend architecture with Next.js and Tailwind CSS.',
      'Optimized 3D assets and textures for fast loading without compromising visual fidelity.',
    ],
    images: [
      '/Projects/cofee/image.png',
      '/Projects/cofee/image copy.png',
      '/Projects/cofee/image copy 2.png',
    ],
    hoverImage: '/Projects/cofee/image.png',
    github: '',
    liveUrl: 'https://3d-perfume-brand.vercel.app/',
  },
  {
    id: 4,
    slug: 'cctv-vape-detection',
    title: 'AI Vape Detection System',
    type: 'Computer Vision & Automation',
    role: 'AI / ML Engineer',
    tech: ['Python', 'PyTorch', 'OpenCV', 'YOLO', 'WhatsApp API'],
    description:
      'A real-time AI-powered vape detection system integrated with live CCTV footage. It uses computer vision to detect vaping gestures and vapour clouds, instantly alerting administrators via WhatsApp.',
    overview:
      'This project is an advanced computer vision system deployed on live CCTV streams to monitor and detect vaping in restricted areas. By combining posture estimation (hand-to-mouth tracking) with vapour cloud detection, the ML pipeline accurately flags potential incidents and streams detailed alerts directly to WhatsApp with confidence scores and signal breakdowns.',
    challenge:
      'Detecting vaping from a distance on standard CCTV cameras is notoriously difficult due to low resolution, small devices, and varying lighting conditions. The system needed to minimize false positives while accurately interpreting complex signals like wrist-to-mouth distance and inhalation patterns in real-time.',
    solution:
      'Implemented a custom-trained object detection and tracking model using PyTorch and OpenCV. The inference engine processes live video feeds, applying heuristics like "hand_near_mouth" and "vapour confidence". When the alert threshold is breached, an automated webhook triggers a detailed WhatsApp payload for administrators to investigate.',
    stats: [
      { value: 'Live', label: 'CCTV Inference' },
      { value: '<1s', label: 'Alert Latency' },
      { value: 'CV', label: 'Vapour tracking' },
    ],
    accent: '#B22222',
    myRole: [
      'Developed the computer vision pipeline using OpenCV and PyTorch to process live CCTV feeds.',
      'Trained custom ML models to detect specific behavioural signals like hand-to-mouth proximity and vapour clouds.',
      'Engineered the real-time alerting system integrating with the WhatsApp API for instant administrator notifications.',
      'Optimized the inference engine to run efficiently on edge devices, maintaining high framerates.',
    ],
    images: [
      '/Projects/cctv-vape-detection/1.jpeg',
      '/Projects/cctv-vape-detection/2.jpeg',
      '/Projects/cctv-vape-detection/3.jpeg',
    ],
    hoverImage: '/Projects/cctv-vape-detection/1.jpeg',
    github: '',
    liveUrl: '',
  }
];
export function getAllProjects(): Project[] {
  return projects;
}
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: projects[(idx - 1 + projects.length) % projects.length],
    next: projects[(idx + 1) % projects.length],
  };
}
