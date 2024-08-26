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
	import Header from '$lib/components/Header.svelte';

	export let data: LayoutData;

	$: user = data.user;
</script>

<Header {user} />

<main class="p-4 mt-16">
	<slot />
</main>

<NavBar {user} />
