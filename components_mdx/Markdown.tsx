import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // Import rehype-raw

interface MarkdownProps {
	content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
	return (
		<ReactMarkdown
			//eslint-disable-next-line
			children={content} // Pass content directly using children prop
			rehypePlugins={[rehypeRaw]} // Use rehype-raw to allow HTML
			components={{
				h1: ({ children, ...props }) => (
					<h1
						className='text-2xl lg:text-3xl  font-bold my-4 text-black dark:text-white'
						{...props}
					>
						{children}
					</h1>
				),
				h2: ({ children, ...props }) => (
					<h2
						className='text-xl lg:text-2xl  font-semibold my-3 text-black dark:text-white'
						{...props}
					>
						{children}
					</h2>
				),
				h3: ({ children, ...props }) => (
					<h3
						className='text-xl  font-semibold my-2 text-black dark:text-white'
						{...props}
					>
						{children}
					</h3>
				),
				h4: ({ children, ...props }) => (
					<h4
						className='text-lg font-medium my-2 text-black dark:text-white'
						{...props}
					>
						{children}
					</h4>
				),
				h5: ({ children, ...props }) => (
					<h5
						className='text-base  my-2 text-black dark:text-white'
						{...props}
					>
						{children}
					</h5>
				),
				p: ({ children, ...props }) => (
					<p
						className='my-2 text-base lg:text-lg text-black dark:text-white'
						{...props}
					>
						{children}
					</p>
				),
				strong: ({ children, ...props }) => (
					<strong
						className='text-base lg:text-lg font-semibold text-black dark:text-white'
						{...props}
					>
						{children}
					</strong>
				),
				em: ({ children, ...props }) => (
					<em
						className='italic text-black dark:text-white'
						{...props}
					>
						{children}
					</em>
				),
				li: ({ children, ...props }) => (
					<li
						className='my-1 list-disc list-inside text-black dark:text-white'
						{...props}
					>
						{children}
					</li>
				),
				ul: ({ children, ...props }) => (
					<ul
						className='my-1 pl-[2rem]  lg:pl-[3rem] list-disc list-inside text-black dark:text-white text-base lg:text-lg -indent-[1.5rem] '
						{...props}
					>
						{children}
					</ul>
				),
				ol: ({ children, ...props }) => (
					<ol
						className='my-1 list-decimal list-inside text-black dark:text-white'
						{...props}
					>
						{children}
					</ol>
				),
				code: ({ children, ...props }) => (
					<code
						className='bg-gray-800 p-1 rounded text-black dark:text-white'
						{...props}
					>
						{children}
					</code>
				),
				pre: ({ children, ...props }) => (
					<pre
						className='bg-gray-800 p-4 rounded text-black dark:text-white'
						{...props}
					>
						{children}
					</pre>
				),
				img: ({ ...props }) =>
					props.src ? (
						<Image
							src={props.src}
							alt={props.title!}
							width={1200}
							height={200}
							className='w-full max-h-[30rem] object-cover rounded-md bg-blend-multiply'
						/>
					) : null,
				a: ({ children, href, ...props }) => (
					<a
						href={href}
						className='text-green-600 dark:text-green-400 hover:underline italic font-medium'
						target='_blank'
						rel='noopener noreferrer'
						{...props}
					>
						{children}
					</a>
				)
			}}
		/>
	);
};

export default Markdown;
