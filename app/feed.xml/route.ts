import { getPosts } from '@/lib/get-posts';
import RSS from 'rss';
import { BASE_URL } from '../../lib/base-url';

export const GET = async () => {
	const feed = new RSS({
		title: 'Joy',
		description: `Joy's Blogs`,
		generator: 'RSS for Next.js',
		feed_url: `${BASE_URL}/feed.xml`,
		site_url: `${BASE_URL}`,
		managingEditor: 'joy_ahmed_007@yaoo.com (Joy Ahmed)',
		webMaster: 'joy_ahmed_007@yaoo.com (Joy Ahmed)',
		copyright: `Copyright ${new Date()
			.getFullYear()
			.toString()}, Joy Ahmed`,
		language: 'en-US',
		pubDate: new Date().toUTCString(),
		ttl: 60
	});

	const allPosts = await getPosts();

	if (allPosts) {
		allPosts.forEach(post => {
			// Ensure `post.image` is resolved properly
			const imageUrl = post.image ? `${BASE_URL}${post.image}` : '';

			// Serialize the content if necessary
			const postContent =
				typeof post.content === 'string'
					? post.content
					: JSON.stringify(post.content);

			feed.item({
				title: post.title,
				description: post.description,
				url: `${BASE_URL}/posts/${post.slug}`,
				author: 'Joy Ahmed',
				date: post.date,
				custom_elements: [
					{
						'content:encoded': `<![CDATA[
							<div>
								<h1>${post.title}</h1>
								<h2>${post.secondary_title || ''}</h2>
								<p>${post.description}</p>
								${imageUrl ? `<img src="${imageUrl}" alt="${post.title}" />` : ''}
								<p>${postContent}</p>
							</div>
						]]>`
					}
				]
			});
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
};
