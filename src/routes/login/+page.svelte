<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_MAL_CLIENT_ID, PUBLIC_MAL_CLIENT_SECRET } from '$env/static/public';
	import { generateCodeChallenge, generateCodeVerifier } from '$lib/auth/utils';
	import { onMount } from 'svelte';

	export let data;
	$: user = data.user;

	let codeVerifier: string;
	let codeChallenge: string;
	let state: string;

	onMount(() => {
		if (user) {
			window.history.back();
			return;
		}

		codeVerifier = generateCodeVerifier();
		codeChallenge = generateCodeChallenge(codeVerifier);
		state = crypto.randomUUID(); // Generate a unique state value
		login();
	});

	function login() {
		sessionStorage.setItem('code_verifier', codeVerifier);
		sessionStorage.setItem('state', state);

		const params = new URLSearchParams({
			response_type: 'code',
			client_id: PUBLIC_MAL_CLIENT_ID,
			client_secret: PUBLIC_MAL_CLIENT_SECRET,
			state: state,
			redirect_uri: $page.url.origin + '/callback',
			code_challenge: codeChallenge,
			code_challenge_method: 'plain'
		});

		window.location.href = `https://myanimelist.net/v1/oauth2/authorize?${params.toString()}`;
	}
</script>
