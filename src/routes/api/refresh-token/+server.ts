// src/routes/api/refresh-token/+server.ts
import { PUBLIC_MAL_CLIENT_ID, PUBLIC_MAL_CLIENT_SECRET } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	const refreshToken = cookies.get('mal_refresh_token');

	if (!refreshToken) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const params = new URLSearchParams({
		client_id: PUBLIC_MAL_CLIENT_ID,
        client_secret: PUBLIC_MAL_CLIENT_SECRET,
		grant_type: 'refresh_token',
		refresh_token: refreshToken
	});

	const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	});

	if (!response.ok) {
		return json({ error: 'Failed to refresh token' }, { status: 500 });
	}

	const tokens = await response.json();

	// Update cookies with the new tokens
	cookies.set('mal_access_token', tokens.access_token, {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: 3600 // 1 hour
	});

	if (tokens.refresh_token) {
		cookies.set('mal_refresh_token', tokens.refresh_token, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 2592000 // 30 days
		});
	}

	return json({ success: true });
}
