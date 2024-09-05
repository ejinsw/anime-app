<script lang="ts">
	import './global.css';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { allow_nsfw } from '$lib/stores/stores';
	import { navigating } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';

	export let data: LayoutData;

	$: user = data.user;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const { bouncy, jelly } = await import('ldrs'); // or import the specific module you need
			bouncy.register();
			jelly.register();
		}

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
	<Footer />


<NavBar {user} />

<!-- Loading -->
{#if $navigating}
	<div
		class="fixed top-0 left-0 w-screen h-screen bg-black/70 z-50 flex justify-center items-center"
	>
		<!-- <l-bouncy size="45" speed="1.75" color="white"></l-bouncy> -->
		<l-jelly size="40" speed="0.9" color="rgb(247 177 85)"></l-jelly>
	</div>
{/if}
