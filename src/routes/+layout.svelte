<script lang="ts">
	import './global.css';
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
