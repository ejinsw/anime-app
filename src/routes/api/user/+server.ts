import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, cookies }) => {
	const token = cookies.get('mal_access_token');

	if (!token) {
		console.log("Unauthorized: can't get user info");
		return new Response('Unauthorized', { status: 401 });
	}

	const res = await fetch(
		'https://api.myanimelist.net/v2/users/@me?fields=id,name,location,joined_at',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);

	if (!res.ok) {
		throw new Error("Couldn't fetch user info!");
	}

	const user = await res.json();
	return user;
};
