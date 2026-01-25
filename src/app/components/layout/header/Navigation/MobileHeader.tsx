

import Link from 'next/link';

const MobileHeader: React.FC<{ item: any, onClick?: () => void }> = ({ item, onClick }) => {

    return (
        <>
            <Link
                href={item.href}
                className="text-black dark:text-white rounded-md text-base font-medium"
                onClick={onClick}
            >
                <li className={`rounded-md w-full p-2 px-4`}>
                    {item.label}
                </li>
            </Link>
        </>
    );
};

export default MobileHeader;
