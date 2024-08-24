<script lang="ts">
	import type { AnimePreview } from '$lib/types';
	import Preview from '$lib/components/Preview.svelte';
	import { onMount } from 'svelte';

	export let title: string = '';
	export let anime: AnimePreview[];

    let shimmerAnimation = false;

    onMount(() => {
        setInterval(() => {
            shimmerAnimation = true;
            setTimeout(() => {
                shimmerAnimation = false;
            }, 2000)
        }, 10000)
    })
</script>

<div class="w-full">
	<h1 class="text-3xl font-semibold tracking-tight text-gray-100 mb-4 relative inline-block animate-fade-in">
		{title}
		<span class="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full {shimmerAnimation && "shimmer"}"></span>
	</h1>
	<nav class="flex overflow-x-auto w-full space-x-4 pb-2">
		{#if anime}
			{#each anime as item}
				<Preview anime={item} />
			{/each}
		{/if}
	</nav>
</div>

<style>
	/* Shimmer animation for the underline */
	@keyframes shimmer {
		0% {
			background-position: -200%;
		}
		100% {
			background-position: 200%;
		}
	}

	/* Tailwind CSS animation for the shimmer effect */
	.shimmer {
		background-size: 200% 100%;
		animation: shimmer 2s ease-in-out infinite;
	}

	/* Fade-in animation for the title */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Tailwind utility class for fade-in */
	.animate-fade-in {
		animation: fadeIn 1s ease-out;
	}
</style>