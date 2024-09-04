import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const token = cookies.get('mal_access_token');
	if (!locals.user || !token) {
		throw redirect(302, '/login');
	}
	let res = await fetch(
		`https://api.myanimelist.net/v2/users/@me?fields=anime_statistics,picture,name`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	const profile = await res.json();

	res = await fetch(
		`https://api.myanimelist.net/v2/users/@me/animelist?limit=1000&sort=list_updated_at&fields=fields=start_date,end_date,synopsis,mean,rank,popularity,nsfw,media_type,status,num_episodes,rating,alternative_titles,genres,list_status`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	const animeList = await res.json();

	return { profile, animeList };
};
