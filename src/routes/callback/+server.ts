// src/routes/callback/+server.ts
import {
	PUBLIC_MAL_CLIENT_ID,
	PUBLIC_MAL_CLIENT_SECRET,
	PUBLIC_MAL_REDIRECT_URI
} from '$env/static/public';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	try {
		const { code, codeVerifier } = await request.json();

		if (!code || !codeVerifier) {
			console.error('Missing code or codeVerifier');
			throw redirect(301, '/');
		}

		const params = new URLSearchParams({
			client_id: PUBLIC_MAL_CLIENT_ID,
			client_secret: PUBLIC_MAL_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code,
			redirect_uri: PUBLIC_MAL_REDIRECT_URI,
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
			throw redirect(301, '/');
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

	throw redirect(301, '/');
};
