<script lang="ts">
	import {
		PUBLIC_MAL_CLIENT_ID,
		PUBLIC_MAL_CLIENT_SECRET,
	} from '$env/static/public';
	import { generateCodeChallenge, generateCodeVerifier } from '$lib/auth/utils';
	import { onMount } from 'svelte';
	import clsx from 'clsx';

	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import { page } from '$app/stores';
 
	let codeVerifier: string;
	let codeChallenge: string;
	let state: string;

	onMount(() => {
		codeVerifier = generateCodeVerifier();
		codeChallenge = generateCodeChallenge(codeVerifier);
		state = crypto.randomUUID(); // Generate a unique state value
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

<button
	on:click={login}
	class={clsx(
		'bg-green-500 px-4 py-2 rounded-lg flex items-center justify-center gap-2',
		$$props.class
	)}><span> Login </span><MaterialSymbolsArrowRightAltRounded class="text-xl" /></button
>
