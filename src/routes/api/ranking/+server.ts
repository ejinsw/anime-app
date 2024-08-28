import { PUBLIC_MAL_CLIENT_ID } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url, cookies }) => {
	const rankingType = url.searchParams.get('ranking_type') || 'all';
	const offset = parseInt(url.searchParams.get('offset') || '0', 10) || 0;
	const limit = parseInt(url.searchParams.get('limit') || '0', 10) || 5;
	const token = cookies.get('mal_access_token');

	const types = [
		'all',
		'airing',
		'upcoming',
		'tv',
		'ova',
		'movie',
		'special',
		'bypopularity',
		'favorite'
	];
	if (!types.includes(rankingType)) {
		return new Response('Bad Request: Missing required parameters', { status: 400 });
	}

	try {
		const res = await fetch(
			`https://api.myanimelist.net/v2/anime/ranking?ranking_type=${rankingType}&limit=${limit}&offset=${offset}&fields=start_date,end_date,synopsis,mean,rank,popularity,nsfw,media_type,status,num_episodes,rating,alternative_titles,genres${token && ',my_list_status'}`,
			{
				method: 'GET',
				headers: {
					'X-MAL-CLIENT-ID': PUBLIC_MAL_CLIENT_ID,
					...(token && { Authorization: `Bearer ${token}` })
				}
			}
		);

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
