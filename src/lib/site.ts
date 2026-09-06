export const site = {
  name: 'Ammad Waseem',
  firstName: 'Ammad',
  lastName: 'Waseem',
  handle: 'ammadwaseem',
  brand: 'devcore.website',
  email: 'kryptochaingames@gmail.com',
  location: 'Lahore, Pakistan',
  timeZone: 'Asia/Karachi',
  timeZoneLabel: 'PKT',
  url: 'https://devcore.website',
  tagline: 'Full-Stack AI & Automation Engineer',
  roles: [
    'Full-Stack AI & Automation Engineer',
    'MERN Stack Developer',
    'Python & FastAPI Developer',
    'Open to Work Worldwide',
  ],
} as const;

export type SocialKey = 'github' | 'linkedin' | 'instagram' | 'linktree' | 'whatsapp';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  github: { label: 'GitHub', href: 'https://github.com/kryptoverse' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ammad-waseem-7b324b296' },
  instagram: { label: 'Instagram', href: 'https://instagram.com/apex.ammad' },
  linktree: { label: 'Linktree', href: 'https://linktr.ee/meliodus' },
  whatsapp: { label: 'WhatsApp', href: 'https://wa.me/923264828132' },
};

export const socialList: Array<{ label: string; href: string }> = [
  socials.linktree,
  socials.linkedin,
  socials.github,
  socials.whatsapp,
  socials.instagram,
];

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
