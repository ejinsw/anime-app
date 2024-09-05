// src/routes/callback/+server.ts
import {
	PUBLIC_MAL_CLIENT_ID,
	PUBLIC_MAL_CLIENT_SECRET,
} from '$env/static/public';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, locals, url }) => {
	const codeVerifier = url.searchParams.get('code_verifier');
	const code = url.searchParams.get('code');

	if (!code || code === 'null' || !codeVerifier) {
		console.error('Missing code or codeVerifier');
		throw redirect(302, '/')
	}

	try {
		const params = new URLSearchParams({
			client_id: PUBLIC_MAL_CLIENT_ID,
			client_secret: PUBLIC_MAL_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code,
			redirect_uri: url.origin + '/callback',
			code_verifier: codeVerifier
		});

		const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			console.error('Token exchange failed:', errorResponse);
			return json({ message: 'Token exchange failed', status: 500 });
		}

		const tokens = await response.json();

		// Set the tokens as HTTP-only cookies
		cookies.set('mal_access_token', tokens.access_token, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 3600 // 1 hour
		});

		cookies.set('mal_refresh_token', tokens.refresh_token, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 2592000 // 30 days
		});

		const res = await fetch(
			'https://api.myanimelist.net/v2/users/@me?fields=id,name,location,joined_at',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${tokens.access_token}`
				}
			}
		);

		if (res.ok) {
			locals.user = await res.json();
		} else {
			locals.user = null;
		}
	} catch (err) {
		console.error('Error during token exchange:', err);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}

	throw redirect(302, '/');
};
