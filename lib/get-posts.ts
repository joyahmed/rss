import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// Define the Post type
interface Post {
	slug: string;
	title: string;
	secondary_title?: string;
	description: string;
	content: string; // Ensure content is a string
	date: string;
	image?: string;
	author: string;
}

export const getPosts = (): Post[] => {
	const postsDirectory = path.join(
		process.cwd(),
		'components_mdx',
		'posts'
	);

	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map(fileName => {
		const slug = fileName.replace(/\\.mdx$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the frontmatter and content
		const { data, content } = matter(fileContents);

		// Ensure the required fields are present
		if (!data.title || !data.description || !data.date) {
			throw new Error(
				`Post ${slug} is missing required front matter`
			);
		}

		return {
			slug,
			title: data.title,
			description: data.description,
			content, // Use the `content` field from gray-matter
			date: data.date,
			image: data.image,
			author: data.author || 'Joy Ahmed' // Optional fallback
		};
	});
};

// import fs from 'fs';
// import matter from 'gray-matter';
// import path from 'path';

// export const getPosts = (): Post[] => {
// 	const postsDirectory = path.join(
// 		process.cwd(),
// 		'components_mdx',
// 		'posts'
// 	);

// 	const fileNames = fs.readdirSync(postsDirectory);

// 	return fileNames.map(fileName => {
// 		const slug = fileName.replace(/\.mdx$/, '');
// 		const fullPath = path.join(postsDirectory, fileName);
// 		const fileContents = fs.readFileSync(fullPath, 'utf8');
// 		const { data } = matter(fileContents);

// 		// Ensure the required fields are present
// 		if (!data.title || !data.description || !data.date) {
// 			throw new Error(
// 				`Post ${slug} is missing required front matter`
// 			);
// 		}

// 		return {
// 			slug,
// 			title: data.title,
// 			description: data.description,
// 			content: data,
//       date: data.date,
//       image: data.image,
// 			author: data.author || 'Joy Ahmed' // Optional fallback
// 		};
// 	});
// };
