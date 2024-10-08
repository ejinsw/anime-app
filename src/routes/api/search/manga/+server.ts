import { PUBLIC_MAL_CLIENT_ID } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { throttle } from '$lib/middleware/throttle';

// Set throttling limit to 5 requests per minute (60 seconds)
const limit = 1;
const resetInterval = 1 * 1000;

export const GET: RequestHandler = throttle(
	limit,
	resetInterval
)(async ({ fetch, url }) => {
	const query = url.searchParams.get('q');

	if (!query) {
		return new Response('Bad Request: Missing required parameters', { status: 400 });
	}

	try {
		const res = await fetch(`https://api.myanimelist.net/v2/manga?q=${query}&limit=10`, {
			method: 'GET',
			headers: {
				'X-MAL-CLIENT-ID': PUBLIC_MAL_CLIENT_ID
			}
		});

		if (!res.ok) {
			return new Response('Failed to fetch anime list', { status: res.status });
		}

		const animeData = await res.json();
		return json(animeData);
	} catch (err) {
		console.log('Error retrieving seasonal anime', err);
		return new Response('Server Error', { status: 500 });
	}
});
