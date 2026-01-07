import { NextResponse } from 'next/server'

const avatarList = [
  {
    image: '/images/home/avatar_1.jpg',
    title: 'Sarah Johnson',
  },
  {
    image: '/images/home/avatar_2.jpg',
    title: 'Olivia Miller',
  },
  {
    image: '/images/home/avatar_3.jpg',
    title: 'Sophia Roberts',
  },
  {
    image: '/images/home/avatar_4.jpg',
    title: 'Isabella Clark',
  },
]

const brandList = [
  {
    image: '/images/home/brand/brand-icon-1.svg',
    darkImg: '/images/home/brand/brand-darkicon-1.svg',
    title: 'Adobe',
  },
  {
    image: '/images/home/brand/brand-icon-2.svg',
    darkImg: '/images/home/brand/brand-darkicon-2.svg',
    title: 'Figma',
  },
  {
    image: '/images/home/brand/brand-icon-3.svg',
    darkImg: '/images/home/brand/brand-darkicon-3.svg',
    title: 'Shopify',
  },
  {
    image: '/images/home/brand/brand-icon-4.svg',
    darkImg: '/images/home/brand/brand-darkicon-4.svg',
    title: 'Dribble',
  },
  {
    image: '/images/home/brand/brand-icon-5.svg',
    darkImg: '/images/home/brand/brand-darkicon-5.svg',
    title: 'Webflow',
  },
]

const innovationList = [
  {
    image: '/images/home/innovation/uiux.svg',
    title: 'UI/UX\nDesign',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
  {
    image: '/images/home/innovation/analitics.svg',
    title: 'Blockchain\nDevelopment',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/innovation/brand.svg',
    title: 'Game\nDevelopment',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/innovation/webdevp.svg',
    title: 'Website\nDevelopment',
    bg_color: 'bg-pink/20',
    txt_color: 'text-pink',
  },
  {
    image: '/images/home/innovation/digitalmarketing.svg',
    title: 'AI &\nAutomation',
    bg_color: 'bg-green/20',
    txt_color: 'text-green',
  },
]

const onlinePresenceList = [
  {
    image: '/images/home/onlinePresence/emmafabs.png',
    title: 'EmmaFabs',
    tag: ['Brand Identity Design', 'UX Research', 'Development'],
    link: 'https://emmafab.netlify.app/',
  },
  {
    image: '/images/home/onlinePresence/RapidRends.png',
    title: 'Rapid Rends',
    tag: ['Brand Identity Design', 'UX Research', 'Development'],
    link: 'https://www.rapidrend.co.uk/',
  },
  {
    image: '/images/home/onlinePresence/efggames.png',
    title: 'EFG Games',
    tag: ['Game Development', 'UI/UX Design', 'Web Development'],
    link: 'https://www.efggames.com/',
  },
  {
    image: '/images/home/onlinePresence/groupxam.png',
    title: 'Groupxam',
    tag: ['Web Development', 'Brand Strategy', 'UX Research'],
    link: 'https://www.groupxam.com/',
  },
]

const gameProjectsList = [
  {
    videoId: 'mEsRdIeIjuw',
    title: 'Open World Environment Design',
    tag: ['Game Development', '3D Design', 'Environment Art'],
  },
  {
    videoId: 'F0Ce81IXXAY',
    title: 'Intro Cinematic for Game',
    tag: ['Cinematic Design', 'Animation', 'Storytelling'],
  },
  {
    videoId: 'puE_kyVxs7c',
    title: 'Black Strike',
    tag: ['Game Development', 'Action Game', 'Multiplayer'],
  },
  {
    videoId: 'LnfTxWwl5eE',
    title: 'DOG Kannel',
    tag: ['Game Development', 'Simulation', 'AI'],
  },
]

const blockchainProjectsList = [
  {
    image: '/images/home/onlinePresence/DFreelance.png',
    title: 'Decentralized Freelancing',
    tag: ['Blockchain', 'Web3', 'DApp'],
    link: 'https://final-year-project-seven-steel.vercel.app/',
  },
  {
    image: '/images/home/onlinePresence/lifi.png',
    title: 'Cross-chain Swap App',
    tag: ['DeFi', 'Cross-chain', 'Web3'],
    link: 'https://lifi-swap-app.vercel.app/',
  },
  {
    image: '/images/home/onlinePresence/solidity.jpeg',
    title: 'Secure Solidity Smart Contracts',
    tag: ['Smart Contracts', 'Security', 'Solidity'],
    link: '',
  },
]

const creativeMindList = [
  {
    image: '/images/home/creative/creative_img_1.png',
    name: 'Logan Dang',
    position: 'WordPress Developer',
    twitterLink: 'https://x.com/',
    linkedinLink: 'https://in.linkedin.com/',
  },
  {
    image: '/images/home/creative/creative_img_2.png',
    name: 'Ana Belić',
    position: 'Social Media Specialist',
    twitterLink: 'https://x.com/',
    linkedinLink: 'https://in.linkedin.com/',
  },
  {
    image: '/images/home/creative/creative_img_3.png',
    name: 'Brian Hanley',
    position: 'Product Designer',
    twitterLink: 'https://x.com/',
    linkedinLink: 'https://in.linkedin.com/',
  },
  {
    image: '/images/home/creative/creative_img_4.png',
    name: 'Darko Stanković',
    position: 'UI Designer',
    twitterLink: 'https://x.com/',
    linkedinLink: 'https://in.linkedin.com/',
  },
]

const WebResultTagList = [
  {
    image: '/images/home/result/creativity.svg',
    name: 'Creativity',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/result/innovation.svg',
    name: 'Innovation',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/result/strategy.svg',
    name: 'Strategy',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
]

const startupPlanList = [
  {
    plan_bg_color: 'bg-pale-yellow',
    text_color: 'text-dark_black',
    descp_color: 'dark_black/60',
    border_color: 'border-dark_black/10',
    plan_name: '🚀 Starter',
    plan_tagline: 'Launch fast. Look professional.',
    plan_descp: 'Perfect for startups and small businesses that want to get online fast and look professional.',
    plan_subtitle: 'Online Presence for Startups',
    icon_img: '/images/home/startupPlan/white_tick.svg',
    plan_feature: [
      'Custom website UI/UX design',
      'Frontend development (modern, responsive)',
      'Styled pages with images, content & brand visuals',
      'Business-focused layout to showcase your services',
      'Optimized for performance and basic SEO',
    ],
    best_for: ['Landing pages', 'Company websites', 'Product or service showcases'],
  },
  {
    plan_bg_color: 'bg-purple_blue',
    text_color: 'text-white',
    descp_color: 'white/60',
    border_color: 'border-white/10',
    plan_name: '💼 Pro',
    plan_tagline: 'Build powerful. Scale confidently.',
    plan_descp: 'Ideal for growing businesses that need a complete, scalable web solution.',
    plan_subtitle: 'Full-Featured Web Application',
    icon_img: '/images/home/startupPlan/black_tick.svg',
    plan_feature: [
      'Full frontend design & development',
      'Backend development (secure & scalable)',
      'User authentication & onboarding system',
      'Private custom chat system (admin ↔ users)',
      'AI chatbot to respond when admins are offline',
      'Clean architecture ready for future growth',
    ],
    best_for: ['SaaS products', 'Platforms & dashboards', 'Customer-centric applications'],
  },
  {
    plan_bg_color: 'bg-dark_black dark:bg-white/10',
    text_color: 'text-white',
    descp_color: 'white/60',
    border_color: 'border-white/10',
    plan_name: '🤖 Enterprise',
    plan_tagline: 'Automate everything.',
    plan_descp: 'Built for businesses that want to automate operations and scale efficiently.',
    plan_subtitle: 'Business Automation & AI',
    icon_img: '/images/home/startupPlan/black_tick.svg',
    plan_feature: [
      'Everything from the Pro plan',
      'Custom features based on your business workflow',
      'Full business process automation',
      'Advanced AI integrations',
      'Custom dashboards & analytics',
      'Ongoing optimization and feature expansion',
    ],
    best_for: ['Automation-driven businesses', 'AI-powered platforms', 'Companies ready to scale fast'],
  },
]

const faqList = [
  {
    faq_que: 'What services does Awake Agency offer?',
    faq_ans:
      'Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.',
  },
  {
    faq_que: 'How long does a typical project take?',
    faq_ans:
      'Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.',
  },
  {
    faq_que: 'How is pricing structured at Awake Agency?',
    faq_ans:
      'Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.',
  },
  {
    faq_que: 'Do you offer ongoing support after project completion?',
    faq_ans:
      'Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.',
  },
  {
    faq_que: 'How often will I receive updates on my project?',
    faq_ans:
      'Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.',
  },
  {
    faq_que: 'How often will I receive updates on my project?',
    faq_ans:
      'Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.',
  },
]

const achievementsList = [
  {
    icon: '/images/home/achievement/framer_award.svg',
    dark_icon: '/images/home/achievement/dark_framer_award.svg',
    sub_title: 'Framer Awards',
    title:
      'Celebrated for cutting-edge interaction design and seamless user experiences.',
    year: '2024',
    url: 'https://www.framer.com/@wrap-pixel/',
  },
  {
    icon: '/images/home/achievement/dribble_award.svg',
    dark_icon: '/images/home/achievement/dribble_award.svg',
    sub_title: 'Dribbble Awards',
    title: 'Recognized for creative excellence and innovative design solutions',
    year: '2023',
    url: 'https://dribbble.com/wrappixel',
  },
  {
    icon: '/images/home/achievement/awward_award.svg',
    dark_icon: '/images/home/achievement/dark_awward_award.svg',
    sub_title: 'awwwards Awards',
    title:
      'Honored with the Best Website Design for creativity, usability, and innovation.',
    year: '2022',
    url: 'https://www.framer.com/@wrap-pixel/',
  },
]


export const GET = async () => {
  return NextResponse.json({
    avatarList,
    brandList,
    innovationList,
    onlinePresenceList,
    gameProjectsList,
    blockchainProjectsList,
    creativeMindList,
    WebResultTagList,
    startupPlanList,
    faqList,
    achievementsList,
  });
};
