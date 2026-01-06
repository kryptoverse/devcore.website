import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps { }
const Logo: React.FC<HeaderProps> = () => {
    return (
        <Link href="/">
            <Image
                src="/images/logo/DarkModeLogo.png"
                alt="logo"
                width={120}
                height={40}
                quality={100}
                priority={true}
                className='dark:hidden w-[160px] h-auto object-contain'
            />
            <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={120}
                height={40}
                quality={100}
                className='dark:block hidden w-[160px] h-auto object-contain'
            />
        </Link>
    );
};

export default Logo;
