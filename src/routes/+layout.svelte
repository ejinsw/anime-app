<script lang="ts">
	import './global.css';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { allow_nsfw } from '$lib/stores/stores';

	export let data: LayoutData;

	$: user = data.user;

	onMount(() => {
		allow_nsfw.set(localStorage.getItem('mal_allow_nsfw') === 'true');
		allow_nsfw.subscribe((val) => {
			localStorage.setItem('mal_allow_nsfw', val.toString());
		});
	});
</script>

<Header {user} />

<main class="p-4 mt-16">
	<slot />
</main>

<NavBar {user} />
