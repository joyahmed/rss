const isDev = process.env.NODE_ENV === 'development';
export const BASE_URL = isDev
	? 'http://localhost:3000'
	: process.env.NEXT_PUBLIC_URL;
