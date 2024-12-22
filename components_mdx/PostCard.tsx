import { truncateText } from '@/utils/truncateText';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface IPostCard {
	image: string;
	title: string;
	secondary_title: string;
	description: string;
	currentLanguage: string;
}

const PostCard = ({
	image,
	title,
	secondary_title,
	description,
	currentLanguage
}: IPostCard) => {
	return (
		<Link href={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}>
			<div className='bg-[#B3DAFD]/20 dark:bg-[#172d41] shadow-lg rounded-3xl overflow-hidden'>
				<div className='relative w-full h-48'>
					<Image
						src={image}
						alt={title}
						fill
						className='w-full h-48 object-cover'
					/>
				</div>
				<div className='p-5'>
					<h3 className='font-semibold text-lg xl:text-xl text-black dark:text-[#B3DAFD] h-[60px]  overflow-hidden '>
						{secondary_title}
					</h3>
					<p className=' text-gray-700 dark:text-[#B3DAFD]/70 h-[100px] mt-2 overflow-hidden'>
						{truncateText(description!, 22)}...
					</p>
					<span
						className='inline-block mt-4 text-green-600 dark:text-green-400 font-semibold hover:scale-105'
						aria-label={`Read more about ${secondary_title}`}
					>
						{currentLanguage === 'en' ? 'Read More' : 'আরও পড়ুন'}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
