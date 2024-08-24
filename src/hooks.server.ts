import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('mal_access_token');
	const user = event.locals.user;

	try {
		if (!user && token) {
			const res = await fetch(
				'https://api.myanimelist.net/v2/users/@me?fields=id,name,location,joined_at',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			if (res.ok) {
				event.locals.user = await res.json();
			} else {
				event.locals.user = null;
			}
		}
	} catch (err) {
		console.log('Error', err);
	}

	return await resolve(event);
};
