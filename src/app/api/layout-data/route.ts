import { NextResponse } from "next/server";

const headerData = [
    { label: 'About', href: '/#aboutus' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Projects', href: '/#blockchain-projects' },
    { label: 'Contact', href: '/contact' },
    { label: 'Chat', href: '/chat' },
];

const footerData = {
    brand: {
        name: "Ammad Waseem",
        tagline: "Backend, blockchain & game developer. Let's build something secure, scalable, and worth shipping together.",
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
            { name: "Projects", url: "/#blockchain-projects" },
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
        phone: "+923704818015"
    },
    copyright: "©2025 Ammad Waseem. All Rights Reserved"
};

export const GET = async () => {
    return NextResponse.json({
        headerData,
        footerData
    });
};