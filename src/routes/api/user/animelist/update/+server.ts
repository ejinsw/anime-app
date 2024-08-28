import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const token = cookies.get('mal_access_token');
	const id = url.searchParams.get('id');
	const status = url.searchParams.get('status');
	const score = url.searchParams.get('score');
	const num_watched_episodes = url.searchParams.get('num_watched_episodes');

	if (!token) {
		console.log("Unauthorized: can't get user info");
		return new Response('Unauthorized', { status: 401 });
	}

	if (!id) {
		return new Response('Bad Request: Missing required parameters', { status: 400 });
	}

	let res = await fetch(`https://api.myanimelist.net/v2/anime/${id}?fields=my_list_status`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!res.ok) {
		return new Response('Failed to get original status', { status: res.status });
	}

	const ogStatus = await res.json();

	const body = new URLSearchParams({
		status: status ?? ogStatus.my_list_status.status ?? 'plan_to_watch',
		score: score ?? ogStatus.my_list_status.score ?? '0',
		num_watched_episodes:
			num_watched_episodes ?? ogStatus.my_list_status.num_watched_episodes ?? '0'
	});

	res = await fetch(`https://api.myanimelist.net/v2/anime/${id}/my_list_status`, {
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
