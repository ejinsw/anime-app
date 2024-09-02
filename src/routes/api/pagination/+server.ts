import { PUBLIC_MAL_CLIENT_ID } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url, cookies }) => {
	const nextUrl = url.searchParams.get('url');
	const token = cookies.get('mal_access_token');
	
	if (!nextUrl) return new Response('Missing params', { status: 401 });
	try {
		const res = await fetch(nextUrl, {
			method: 'GET',
			headers: {
				'X-MAL-CLIENT-ID': PUBLIC_MAL_CLIENT_ID,
				...(token && { Authorization: `Bearer ${token}` })
			}
		});

		if (!res.ok) {
			return new Response('Failed to fetch anime data', { status: res.status });
		}

		const animeData = await res.json();

		return json(animeData);
	} catch (err) {
		console.log('Error retrieving seasonal anime', err);
		return new Response('Server Error', { status: 500 });
	}
};
