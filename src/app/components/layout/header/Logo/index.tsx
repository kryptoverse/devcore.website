import Link from 'next/link';

const Logo: React.FC = () => {
    return (
        <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-dark_black dark:text-white whitespace-nowrap">
                Ammad
                <span className="italic font-normal instrument-font"> Waseem</span>
            </span>
        </Link>
    );
};

export default Logo;
