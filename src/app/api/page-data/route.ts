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
    title: 'Backend\nDevelopment',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
  {
    image: '/images/home/innovation/analitics.svg',
    title: 'Blockchain\n& Web3',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/innovation/brand.svg',
    title: 'MERN\nStack',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/innovation/webdevp.svg',
    title: 'Full-Stack\nWeb Apps',
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
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://gungearonline.games/',
    title: 'Gun Gear Online (GGO)',
    tag: ['Game Showcase', 'Multiplayer Shooter', 'Web'],
    link: 'https://gungearonline.games/',
  },
]

const aiProjectsList = [
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://salesbot.io/',
    title: 'Salesbot',
    tag: ['AI Marketing', 'Automation', 'Lead Gen'],
    link: 'https://salesbot.io/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://localfinder.biz/',
    title: 'LocalFinder',
    tag: ['AI', 'Directory', 'Business'],
    link: 'https://localfinder.biz/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://leadsync.me/',
    title: 'LeadSync',
    tag: ['Lead Gen', 'Integrations', 'Automation'],
    link: 'https://leadsync.me/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://autodispatch.net/',
    title: 'AutoDispatch',
    tag: ['Logistics', 'Load Board', 'Automation'],
    link: 'https://autodispatch.net/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://voice-flow.pro/',
    title: 'Voice Flow',
    tag: ['AI Transcription', 'OpenAI Whisper', 'Speech-to-Text'],
    link: 'https://voice-flow.pro/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://healthsync360.com/',
    title: 'HealthSync360',
    tag: ['HealthTech', 'AI Summary', 'Personal Health'],
    link: 'https://healthsync360.com/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://solvpro.com/',
    title: 'SolvPro',
    tag: ['AI', 'Solutions', 'Web App'],
    link: 'https://solvpro.com/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://mr-reel.com/',
    title: 'Mr. Reel',
    tag: ['AI', 'Media', 'Web'],
    link: 'https://mr-reel.com/',
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
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://pvp-fun-market-maker.vercel.app/',
    title: 'PVP.Fun Market Maker',
    tag: ['AMM', 'Bonding Curves', 'Solidity'],
    link: 'https://pvp-fun-market-maker.vercel.app/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://crowdfunding-dapp-two.vercel.app/',
    title: 'Crowdfunding DApp',
    tag: ['Ethereum', 'Solidity', 'DApp'],
    link: 'https://crowdfunding-dapp-two.vercel.app/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://nft-battle-arena-frontend.vercel.app/',
    title: 'NFT Battle Arena',
    tag: ['NFT Gaming', 'Chainlink VRF', 'Staking & Marketplace'],
    link: 'https://nft-battle-arena-frontend.vercel.app/',
  },
]

const fullStackProjectsList = [
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://thinkwell-frontend-testing.vercel.app/',
    title: 'ThinkWell CRM Platform',
    tag: ['Full-Stack', 'CRM', 'Business Management'],
    link: 'https://thinkwell-frontend-testing.vercel.app/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://www.devcore.website/',
    title: 'DevCore Website + Real-Time Chat',
    tag: ['Node.js', 'Socket.io', 'MongoDB'],
    link: 'https://www.devcore.website/',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://cccmiraclecathedral.org',
    title: 'Cathedral Church Website',
    tag: ['Full-Stack', 'CMS', 'Community'],
    link: 'https://cccmiraclecathedral.org',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://github.com/kryptoverse/AuthCompanyServer',
    title: 'Authentication System & Onboarding',
    tag: ['Node.js', 'JWT', 'RBAC'],
    link: 'https://github.com/kryptoverse/AuthCompanyServer',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://github.com/kryptoverse/StramifyBackend',
    title: 'Stramify Backend',
    tag: ['WebSockets', 'Streaming', 'Node.js'],
    link: 'https://github.com/kryptoverse/StramifyBackend',
  },
  {
    image: 'https://image.thum.io/get/width/1200/crop/787/https://github.com/kryptoverse/DevCoreBackend',
    title: 'DevCore Backend APIs',
    tag: ['Express.js', 'MongoDB', 'REST APIs'],
    link: 'https://github.com/kryptoverse/DevCoreBackend',
  },
]

const creativeMindList = [
  {
    image: '/images/home/creative/creative_img_1.jpeg',
    name: 'Ammad Waseem',
    position: 'MERN Stack AI Engineer',
  },
  {
    image: '/images/home/creative/creative_img_2.jpeg',
    name: 'Rana Muhammad Areeb',
    position: 'Frontend Developer and AI Automation Engineer',
  }
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
    faq_que: 'What do you do?',
    faq_ans:
      "I'm Ammad Waseem, a MERN stack AI engineer. I build production REST APIs (Node.js, Express, MongoDB), secure Solidity smart contracts and Web3 dApps, and intelligent full-stack web applications powered by AI.",
  },
  {
    faq_que: 'Are you available for freelance work or hire?',
    faq_ans:
      "Yes. I've delivered projects for 20+ clients as a freelancer and currently work as a backend engineer. I'm open to freelance contracts, long-term collaborations, and full-time roles. Just reach out and tell me about your project.",
  },
  {
    faq_que: 'Which technologies do you work with?',
    faq_ans:
      'Stack: MongoDB, Express.js, React, Node.js (MERN), Next.js, and Tailwind CSS. AI: OpenAI, LLMs, and Automations. Blockchain: Solidity, Hardhat, Ethereum, Polygon, and Web3 integration.',
  },
  {
    faq_que: 'How long does a typical project take?',
    faq_ans:
      'It depends on scope. A focused API or smart contract can take 1-3 weeks, while a full-stack application with auth and real-time features usually takes 4-10 weeks. I share a clear timeline before we start.',
  },
  {
    faq_que: 'Do you offer support after a project is delivered?',
    faq_ans:
      'Yes. I provide post-launch support to make sure everything runs smoothly and can take on ongoing maintenance, fixes, and feature additions whenever you need them.',
  },
  {
    faq_que: 'How can I get in touch?',
    faq_ans:
      'Email me at kryptochaingames@gmail.com, use the contact form, or message me directly through the chat on this site. You can also find me on LinkedIn and GitHub.',
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
    fullStackProjectsList,
    aiProjectsList,
    blockchainProjectsList,
    creativeMindList,
    WebResultTagList,
    startupPlanList,
    faqList,
    achievementsList,
  });
};
