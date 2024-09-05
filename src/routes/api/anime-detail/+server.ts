import { PUBLIC_MAL_CLIENT_ID } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { throttle } from '$lib/middleware/throttle';

// Set throttling limit to 5 requests per minute (60 seconds)
const limit = 5;
const resetInterval = 60 * 1000;

export const GET: RequestHandler = throttle(
	limit,
	resetInterval
)(async ({ url }) => {
	const animeId = url.searchParams.get('id');
	if (!animeId) {
		return new Response('Bad Request: Missing required parameters', { status: 400 });
	}

	try {
		const res = await fetch(
			`https://api.myanimelist.net/v2/anime/${animeId}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,
			related_anime{start_date,end_date,synopsis,mean,rank,popularity,nsfw,media_type,status,num_episodes,rating,alternative_titles,genres},
			related_manga,
			recommendations{start_date,end_date,synopsis,mean,rank,popularity,nsfw,media_type,status,num_episodes,rating,alternative_titles,genres},
			studios,statistics`,
			{
				method: 'GET',
				headers: {
					'X-MAL-CLIENT-ID': PUBLIC_MAL_CLIENT_ID
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
});
