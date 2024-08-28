import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, cookies, locals, url}) => {
    let referer = request.headers.get('referer') || '/';
    if (referer === url.href) referer = '/'

	cookies.delete('mal_access_token', {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: 3600 // 1 hour
	});

	cookies.delete('mal_refresh_token', {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: 2592000 // 30 days
	});

	locals.user = null;

    throw redirect(302, referer)
};
