import { BASE_URL } from '@/lib/base-url';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import RSS from 'rss';

const POSTS_DIRECTORY = path.join(
	process.cwd(),
	'components_mdx',
	'posts'
);

export const GET = async () => {
	// Initialize RSS feed
	const feed = new RSS({
		title: 'Joy’s Blogs',
		description: 'Latest blogs from Joy',
		feed_url: `${BASE_URL}/feed.xml`,
		site_url: `${BASE_URL}`,
		language: 'en',
		pubDate: new Date().toUTCString()
	});

	// Get all markdown files from the posts directory
	const fileNames = fs.readdirSync(POSTS_DIRECTORY);

	// Loop through each markdown file
	fileNames.forEach(fileName => {
		const fullPath = path.join(POSTS_DIRECTORY, fileName);
		const fileContent = fs.readFileSync(fullPath, 'utf-8');
		const { data, content } = matter(fileContent);

		// Ensure required frontmatter fields are present
		if (
			!data.title ||
			!data.description ||
			!data.date ||
			!data.image
		) {
			throw new Error(
				`Markdown file ${fileName} is missing required frontmatter fields.`
			);
		}

		// Construct absolute image URL
		const imageUrl = `${BASE_URL}${data.image}`;

		// Add the post to the RSS feed
		feed.item({
			title: data.title,
			description: data.description,
			url: `${BASE_URL}/posts/${fileName.replace(/\.mdx?$/, '')}`,
			date: data.date,
			custom_elements: [
				{
					'media:content': {
						_attr: {
							url: imageUrl,
							medium: 'image',
							type: 'image/webp' // or 'image/png', depending on your image format
						}
					}
				},
				{
					'content:encoded': `
            <div>
              <img src="${imageUrl}" alt="${data.title}" width={100} height={100} />
              <h1>${data.title}</h1>
              <p>${data.description}</p>
              ${content}
            </div>
          `
				}
			]
		});
	});

	// Return RSS feed as response
	return new Response(feed.xml({ indent: true }), {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
};

// import { getPosts } from '@/lib/get-posts';
// import { marked } from 'marked'; // To parse Markdown to HTML
// import RSS from 'rss';
// import { BASE_URL } from '../../lib/base-url';

// export const GET = async () => {
// 	const feed = new RSS({
// 		title: 'Joy',
// 		description: `Joy's Blogs`,
// 		generator: 'RSS for Next.js',
// 		feed_url: `${BASE_URL}/feed.xml`,
// 		site_url: `${BASE_URL}`,
// 		managingEditor: 'joy_ahmed_007@yaoo.com (Joy Ahmed)',
// 		webMaster: 'joy_ahmed_007@yaoo.com (Joy Ahmed)',
// 		copyright: `Copyright ${new Date()
// 			.getFullYear()
// 			.toString()}, Joy Ahmed`,
// 		language: 'en-US',
// 		pubDate: new Date().toUTCString(),
// 		ttl: 60
// 	});

// 	const allPosts = await getPosts();

// 	if (allPosts) {
// 		allPosts.forEach(post => {
// 			// Ensure `post.image` is resolved properly
// 			const imageUrl = post.image ? `${BASE_URL}${post.image}` : '';

// 			// Validate or cast `post.content` to string
// 			const postContent =
// 				typeof post.content === 'string'
// 					? post.content
// 					: JSON.stringify(post.content || '');

// 			// Parse Markdown content to HTML
// 			const htmlContent = marked(postContent);

// 			feed.item({
// 				title: post.title,
// 				description: post.description,
// 				url: `${BASE_URL}/posts/${post.slug}`,
// 				author: 'Joy Ahmed',
// 				date: post.date,
// 				custom_elements: [
// 					{
// 						'content:encoded': `
//               <div>
//                 <h1>${post.title}</h1>
//                 <h2>${post.secondary_title || ''}</h2>
//                 <p>${post.description}</p>
//                 ${
// 									imageUrl
// 										? `<img src="${imageUrl}" alt="${post.title}" />`
// 										: ''
// 								}
//                 <div>${htmlContent}</div>
//               </div>
//             `
// 					}
// 				]
// 			});
// 		});
// 	}

// 	return new Response(feed.xml({ indent: true }), {
// 		headers: {
// 			'Content-Type': 'application/rss+xml; charset=utf-8'
// 		}
// 	});
// };

// import { getPosts } from '@/lib/get-posts';
// import RSS from 'rss';
// import { BASE_URL } from '../../lib/base-url';

// export const GET = async () => {
// 	const feed = new RSS({
// 		title: 'Joy',
// 		description: `Joy's Blogs`,
// 		generator: 'RSS for Next.js',
// 		feed_url: `${BASE_URL}/feed.xml`,
// 		site_url: `${BASE_URL}`,
// 		managingEditor: 'joy_ahmed_007@yaoo.com (Joy Ahmed)',
// 		webMaster: 'joy_ahmed_007@yaoo.com (Joy Ahmed)',
// 		copyright: `Copyright ${new Date()
// 			.getFullYear()
// 			.toString()}, Joy Ahmed`,
// 		language: 'en-US',
// 		pubDate: new Date().toUTCString(),
// 		ttl: 60
// 	});

// 	const allPosts = await getPosts();

// 	if (allPosts) {
// 		allPosts.forEach(post => {
// 			// Ensure `post.image` is resolved properly
// 			const imageUrl = post.image ? `${BASE_URL}${post.image}` : '';

// 			// Serialize the content if necessary
// 			const postContent =
// 				typeof post.content === 'string'
// 					? post.content
// 					: JSON.stringify(post.content);

// 			console.log(`debug: postContent =>`, postContent);

// 			feed.item({
// 				title: post.title,
// 				description: post.description,
// 				url: `${BASE_URL}/posts/${post.slug}`,
// 				author: 'Joy Ahmed',
// 				date: post.date,
// 				custom_elements: [
// 					{
// 						'content:encoded': `<![CDATA[
// 							<div>
// 								<h1>${post.title}</h1>
// 								<h2>${post.secondary_title || ''}</h2>
// 								<p>${post.description}</p>
// 								${imageUrl ? `<img src="${imageUrl}" alt="${post.title}" />` : ''}
// 								<p>${postContent}</p>
// 							</div>
// 						]]>`
// 					}
// 				]
// 			});
// 		});
// 	}

// 	return new Response(feed.xml({ indent: true }), {
// 		headers: {
// 			'Content-Type': 'application/rss+xml; charset=utf-8'
// 		}
// 	});
// };
