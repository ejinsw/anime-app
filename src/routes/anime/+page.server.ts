// src/routes/+layout.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const searchQuery = url.searchParams.get('search');
	const rankingType = url.searchParams.get('ranking_type');
	const season = url.searchParams.get('season');
	const year = url.searchParams.get('year');
	const limit = parseInt(url.searchParams.get('limit') || '0', 10) || 10;

	let anime;

	if (searchQuery) {
		const res = await fetch(`/api/search/anime?q=${searchQuery}&limit=${limit}`);
		anime = await res.json();
	} else if (season && year) {
		const res = await fetch(`/api/seasonal?limit=100&year=${year}&season=${season}`);
		anime = await res.json();
	} else if (rankingType) {
		const res = await fetch(`/api/ranking?ranking_type=${rankingType}&limit=100`);
		anime = await res.json();
	} else {
		const res = await fetch(`/api/ranking?limit=100`);
		anime = await res.json();
	}
	return { anime };
};
