import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const token = cookies.get('mal_access_token');
	const id = url.searchParams.get('id');

	if (!token) {
		console.log("Unauthorized: can't get user info");
		return new Response('Unauthorized', { status: 401 });
	}

	if (!id) {
		return new Response('Bad Request: Missing required parameters', { status: 400 });
	}

	const body = new URLSearchParams({
		status: 'plan_to_watch',
		score: '0',
		num_watched_episodes: '0'
	});

	const res = await fetch(`https://api.myanimelist.net/v2/anime/${id}/my_list_status`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: body
	});

	if (!res.ok) {
		console.log('Failed to fetch anime data');
		return new Response('Failed to add anime', { status: res.status });
	}

	const info = await res.json();

	return json(info);
};
