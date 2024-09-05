import type { PageServerLoad } from './$types';
import { DateToSeason } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch }) => {
	const today = new Date();
	let res = await fetch(
		`/api/seasonal?year=${today.getFullYear()}&season=${DateToSeason(today)}&limit=30`
	);

	if (!res.ok) {
		console.log(`There was an error retrieving seasonal anime...`);
		return { status: res.status, message: `There was an error retrieving seasonal anime...` };
	}

	const seasonal = await res.json();

	res = await fetch(`/api/ranking?ranking_type=all&limit=10`);

	if (!res.ok) {
		return { status: res.status, message: `There was an error retrieving top anime...` };
	}

	const top = await res.json();

	res = await fetch(`/api/ranking?ranking_type=airing&limit=10`);

	if (!res.ok) {
		return { status: res.status, message: `There was an error retrieving airing anime...` };
	}

	const airing = await res.json();

	res = await fetch(`/api/ranking?ranking_type=upcoming&limit=10`);

	if (!res.ok) {
		return { status: res.status, message: `There was an error retrieving upcoming anime...` };
	}

	const upcoming = await res.json();

	return { seasonal, top, airing, upcoming };
};
