// src/routes/+layout.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = params.id;

	try {
		const res = await fetch(`/api/anime-detail?id=${id}`);
		if (!res.ok) {
			console.log("Couldn't fetch anime detail");
			return {};
		}

		const detail = await res.json();

		return { detail };
	} catch (err) {
        console.log(err)
        throw new Error("Something went wrong loading the page")
    }
};
