<script lang="ts">
	import './global.css';
	import {
		PUBLIC_MAL_CLIENT_ID,
		PUBLIC_MAL_CLIENT_SECRET,
		PUBLIC_MAL_REDIRECT_URI
	} from '$env/static/public';
	import { generateCodeVerifier, generateCodeChallenge } from '$lib/auth/utils.js';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar.svelte';

	export let data: LayoutData;

	$: user = data.user;

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
			redirect_uri: PUBLIC_MAL_REDIRECT_URI,
			code_challenge: codeChallenge,
			code_challenge_method: 'plain'
		});

		window.location.href = `https://myanimelist.net/v1/oauth2/authorize?${params.toString()}`;
	}
</script>

{#if !user}
	<button on:click={login}>Login with MyAnimeList</button>
{:else}
	<div>{user.name}</div>
{/if}

<slot />

<NavBar {user} />
