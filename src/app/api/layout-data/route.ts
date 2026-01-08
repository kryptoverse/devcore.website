import { NextResponse } from "next/server";

const headerData = [
    { label: 'About us', href: '/#aboutus' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Team', href: '/#team' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/contact' },
];

const footerData = {
    brand: {
        name: "DevCore",
        tagline: "Empowering businesses with innovative solutions. Let's create something amazing together.",
        socialLinks: [
            {
                icon: "/images/home/footerSocialIcon/twitter.svg",
                dark_icon: "/images/home/footerSocialIcon/twitter_dark.svg",
                link: "https://twitter.com"
            },
            {
                icon: "/images/home/footerSocialIcon/linkedin.svg",
                dark_icon: "/images/home/footerSocialIcon/linkedin_dark.svg",
                link: "https://www.linkedin.com/company/algodevcore/"
            },
            {
                icon: "/images/home/footerSocialIcon/dribble.svg",
                dark_icon: "/images/home/footerSocialIcon/dribble_dark.svg",
                link: "https://dribbble.com"
            },
            {
                icon: "/images/home/footerSocialIcon/instagram.svg",
                dark_icon: "/images/home/footerSocialIcon/instagram_dark.svg",
                link: "https://www.instagram.com/algo.devcore?igsh=MWsxdWRxdTd3MTZ5Mw%3D%3D&utm_source=qr"
            }
        ]
    },
    sitemap: {
        name: "Sitemap",
        links: [
            { name: "Contact us", url: "/contact" },
            { name: "About us", url: "/#aboutus" },
            { name: "Work", url: "/#work" },
            { name: "Services", url: "/#services" },
            { name: "Pricing", url: "/#pricing" }
        ]
    },
    otherPages: {
        name: "Other Pages",
        links: [
            { name: "Error 404", url: "/not-found" },
            { name: "Terms & Conditions", url: "/terms-and-conditions" },
            { name: "Privacy Policy", url: "/privacy-policy" },
            { name: "Documentation", url: "/documentation" }
        ]
    },
    contactDetails: {
        name: "Contact Details",
        address: "81 Rivington Street London EC2A 3AY",
        email: "hello@devcore.it",
        phone: "0105 192 3556"
    },
    copyright: "©2025 DevCore. All Rights Reserved"
};

export const GET = async () => {
    return NextResponse.json({
        headerData,
        footerData
    });
};