import { NextResponse } from "next/server";

const headerData = [
    { label: 'About', href: '/#aboutus' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Apps', href: '/#app-projects' },
    { label: 'Web', href: '/#fullstack-projects' },
    { label: 'Blockchain', href: '/#blockchain-projects' },
    { label: 'AI', href: '/#ai-projects' },
    { label: 'Contact', href: '/contact' },
    { label: 'Chat', href: '/chat' },
];

const footerData = {
    brand: {
        name: "Ammad Waseem",
        tagline: "MERN stack AI and Android/iOS app engineer. Let's build intelligent web and mobile applications together.",
        socialLinks: [
            {
                icon: "/images/home/footerSocialIcon/github.svg",
                dark_icon: "/images/home/footerSocialIcon/github_dark.svg",
                link: "https://github.com/kryptoverse"
            },
            {
                icon: "/images/home/footerSocialIcon/linkedin.svg",
                dark_icon: "/images/home/footerSocialIcon/linkedin_dark.svg",
                link: "https://www.linkedin.com/in/ammad-waseem-945530334"
            }
        ]
    },
    sitemap: {
        name: "Sitemap",
        links: [
            { name: "About", url: "/#aboutus" },
            { name: "Services", url: "/#services" },
            { name: "Work", url: "/#work" },
            { name: "Apps", url: "/#app-projects" },
            { name: "Web", url: "/#fullstack-projects" },
            { name: "Blockchain", url: "/#blockchain-projects" },
            { name: "AI", url: "/#ai-projects" },
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