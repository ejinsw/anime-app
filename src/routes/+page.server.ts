import { DateToSeason } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const today = new Date();

		const res = await fetch(
			`/api/seasonal?year=${today.getFullYear()}&season=${DateToSeason(today)}`
		);

		if (!res.ok) {
			console.log('There was an error retrieving seasonal anime...');
			throw new Error('There was an error retrieving seasonal anime...');
		}

		const seasonalAnimeJson = await res.json();

		return {
			seasonalAnime: seasonalAnimeJson.data
		};
	} catch (err) {
        console.log("Error on page load", err)
    }
};
