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

	const res = await fetch(`https://api.myanimelist.net/v2/anime/${id}/my_list_status`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		},
	});

	if (!res.ok) {
		console.log('Failed to delete anime');
		return new Response('Failed to delete anime', { status: res.status });
	}

	const info = await res.json();

	return json(info);
};
