interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	author?: string; // Optional field
	content: Record<string, unknown>;
	secondary_title?: string; // Optional field
	image?: string; // Optional field
}
