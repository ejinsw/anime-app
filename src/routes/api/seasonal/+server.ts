import { PUBLIC_MAL_CLIENT_ID } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url, cookies }) => {
	const year = url.searchParams.get('year');
	const season = url.searchParams.get('season');
	const nsfw = url.searchParams.get('nsfw') || 'false';
	const offset = parseInt(url.searchParams.get('offset') || '0', 10) || 0;
	const limit = parseInt(url.searchParams.get('limit') || '0', 10) || 10;
	const token = cookies.get('mal_access_token');

	if (!year || !season) {
		return new Response('Bad Request: Missing required parameters', { status: 400 });
	}
	try {
		const res = await fetch(
			`https://api.myanimelist.net/v2/anime/season/${year}/${season}?offset=${offset}&limit=${limit}${nsfw !== 'false' ? '&nsfw=true' : ''}&fields=start_date,end_date,synopsis,mean,rank,popularity,nsfw,media_type,status,num_episodes,rating,alternative_titles,genres,my_list_status`,
			{
				method: 'GET',
				headers: {
					'X-MAL-CLIENT-ID': PUBLIC_MAL_CLIENT_ID,
					...(token && { Authorization: `Bearer ${token}` })
				}
			}
		);

		if (!res.ok) {
			console.log('Failed to fetch anime data');
			return new Response('Failed to fetch anime data', { status: res.status });
		}

		const animeData = await res.json();
		return json(animeData);
	} catch (err) {
		console.log('Error retrieving seasonal anime', err);
		return new Response('Server Error', { status: 500 });
	}
};
