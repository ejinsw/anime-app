import { PUBLIC_MAL_CLIENT_ID, PUBLIC_MAL_CLIENT_SECRET } from '$env/static/public';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies, url}) => {
	const { code, codeVerifier } = await request.json();

	const params = new URLSearchParams({
		client_id: PUBLIC_MAL_CLIENT_ID,
        client_secret: PUBLIC_MAL_CLIENT_SECRET,
		grant_type: 'authorization_code',
		code: code,
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
		return json({ error: 'Failed to exchange token' }, { status: 500 });
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

	return json({ success: true });
};
