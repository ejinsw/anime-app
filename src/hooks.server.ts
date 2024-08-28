import { PUBLIC_MAL_CLIENT_ID, PUBLIC_MAL_CLIENT_SECRET } from '$env/static/public';
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let token = event.cookies.get('mal_access_token');
	const refreshToken = event.cookies.get('mal_refresh_token');
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
		} else if (!token && refreshToken) {
			try {
				token = await useRefreshToken(event, refreshToken);
				
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
					console.error('Failed to fetch user info:', await res.text());
					event.locals.user = null;
				}
			} catch (err) {
				console.log(err);
				event.locals.user = null;
			}
		}
	} catch (err) {
		console.log('Error', err);
	}

	return await resolve(event);
};

async function useRefreshToken(event: RequestEvent, refreshToken: string) {
	const params = new URLSearchParams({
		client_id: PUBLIC_MAL_CLIENT_ID,
		client_secret: PUBLIC_MAL_CLIENT_SECRET,
		grant_type: 'refresh_token',
		refresh_token: refreshToken
	});

	const res = await fetch('https://myanimelist.net/v1/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	});

	if (!res.ok) {
		console.error('Failed to refresh token:', await res.text());
		throw new Error('Token refresh failed');
	}

	const tokens = await res.json();

	// Update cookies with the new tokens
	event.cookies.set('mal_access_token', tokens.access_token, {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: 3600 // 1 hour
	});

	if (tokens.refresh_token) {
		event.cookies.set('mal_refresh_token', tokens.refresh_token, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 2592000 // 30 days
		});
	}

	return tokens.access_token;
}
