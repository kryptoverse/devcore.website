import Image from 'next/image'

const SingleCreativeMind = ({
    creativemind,
}: {
    creativemind: any
}) => {
    const { image, name, position } = creativemind

    return (
        <div
            className='group flex flex-col gap-6 items-center justify-center max-w-80'>
            <div className='group-hover:grayscale w-full h-[410px] relative overflow-hidden rounded-2xl'>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className='object-cover'
                />
            </div>
            <div className='flex flex-col gap-4 items-center'>
                <div className='flex flex-col gap-1 items-center'>
                    <p className='font-medium'>{name}</p>
                    <p className='text-dark_black/60 dark:text-white/60'>
                        {position}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingleCreativeMind
