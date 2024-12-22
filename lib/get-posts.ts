import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const getPosts = (): Post[] => {
	const postsDirectory = path.join(
		process.cwd(),
		'components_mdx',
		'posts'
	);

	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map(fileName => {
		const slug = fileName.replace(/\.mdx$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

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
			content: data,
			date: data.date,
			author: data.author || 'Joy Ahmed' // Optional fallback
		};
	});
};
