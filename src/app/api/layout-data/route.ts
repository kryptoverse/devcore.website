import { NextResponse } from "next/server";

const headerData = [
    { label: 'About', href: '/#aboutus' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'AI', href: '/#ai-projects' },
    { label: 'Apps', href: '/#app-projects' },
    { label: 'Web & CRM', href: '/#fullstack-projects' },
    { label: 'Blockchain', href: '/#blockchain-projects' },
    { label: 'Contact', href: '/contact' },
    { label: 'Chat', href: '/chat' },
];

const footerData = {
    brand: {
        name: "Ammad Waseem",
        tagline: "Full-stack AI developer and Android/iOS app engineer. Let's build intelligent web platforms, mobile apps and automation together.",
        socialLinks: [
            {
                icon: "/images/home/footerSocialIcon/github.svg",
                dark_icon: "/images/home/footerSocialIcon/github_dark.svg",
                link: "https://github.com/kryptoverse"
            },
            {
                icon: "/images/home/footerSocialIcon/linkedin.svg",
                dark_icon: "/images/home/footerSocialIcon/linkedin_dark.svg",
                link: "https://www.linkedin.com/in/ammad-waseem-7b324b296"
            },
            {
                icon: "/images/home/footerSocialIcon/linktree.svg",
                dark_icon: "/images/home/footerSocialIcon/linktree_dark.svg",
                link: "https://linktr.ee/meliodus"
            }
        ]
    },
    sitemap: {
        name: "Sitemap",
        links: [
            { name: "About", url: "/#aboutus" },
            { name: "Services", url: "/#services" },
            { name: "Work", url: "/#work" },
            { name: "AI & Automation", url: "/#ai-projects" },
            { name: "Android & iOS Apps", url: "/#app-projects" },
            { name: "Web & CRM", url: "/#fullstack-projects" },
            { name: "Client Websites", url: "/#client-websites" },
            { name: "Blockchain & Web3", url: "/#blockchain-projects" },
            { name: "Chat with me", url: "/chat" }
        ]
    },
    otherPages: {
        name: "Other Pages",
        links: [
            { name: "Contact", url: "/contact" },
            { name: "Terms & Conditions", url: "/terms-and-conditions" },
            { name: "Privacy Policy", url: "/privacy-policy" },
            { name: "Documentation", url: "/documentation" }
        ]
    },
    contactDetails: {
        name: "Contact Details",
        address: "Islamabad, Pakistan",
        email: "kryptochaingames@gmail.com",
        phone: "+923704818015",
        whatsapp: "+923704818015"
    },
    copyright: "©2025 Ammad Waseem. All Rights Reserved"
};

export const GET = async () => {
    return NextResponse.json({
        headerData,
        footerData
    });
};