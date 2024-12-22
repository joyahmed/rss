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
		allPosts.map(post => {
			feed.item({
				title: post.title,
				description: post.description,
				url: `${BASE_URL}/posts/${post.slug}`,
				//categories: post.tags || [],
				author: 'Joy Ahmed',
				date: post.date
			});
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8 '
		}
	});
};
