// src/lib/auth/utils.ts

export function generateCodeVerifier(): string {
	if (typeof window === 'undefined') {
		throw new Error('generateCodeVerifier can only be called in the browser');
	}

	const array = new Uint8Array(32);
	window.crypto.getRandomValues(array);
	return btoa(String.fromCharCode.apply(null, Array.from(array)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

export function generateCodeChallenge(verifier: string): string {
	// Since MyAnimeList only supports the "plain" method, we return the verifier as-is.
	return verifier;
}
