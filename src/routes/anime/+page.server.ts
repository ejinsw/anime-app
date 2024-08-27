// src/routes/+layout.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const searchQuery = url.searchParams.get('search');

	let anime;

	if (searchQuery) {
		const res = await fetch(`/api/search/anime?q=${searchQuery}`)
        anime = await res.json();

	} else {
        const res = await fetch(`/api/ranking?limit=100`)
        anime = await res.json();
    }
	return { anime };
};
