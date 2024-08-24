<script lang="ts">
	import type { AnimePreview } from '$lib/types';
	import Preview from '$lib/components/Preview.svelte';
	import { onMount } from 'svelte';

	import IcRoundChevronLeft from '~icons/ic/round-chevron-left';
	import IcRoundChevronRight from '~icons/ic/round-chevron-right';

	export let title: string = '';
	export let anime: AnimePreview[];
	export let prev: () => void;
	export let next: () => void;

	let shimmerAnimation = false;

	onMount(() => {
		setInterval(() => {
			shimmerAnimation = true;
			setTimeout(() => {
				shimmerAnimation = false;
			}, 2000);
		}, 10000);
	});
</script>

<div class="w-full">
	<div class="flex items-center">
		<h1
			class="text-3xl font-semibold tracking-tight text-gray-100 mb-4 relative inline-block animate-fade-in"
		>
			{title}
			<span
				class="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full {shimmerAnimation &&
					'shimmer'}"
			></span>
		</h1>
		<span class="ml-auto">
			<button
				on:click={prev}
				class="bg-slate-50 text-gray-800 rounded-full text-center p-1 hover:bg-slate-200"
				><IcRoundChevronLeft /></button
			>
			<button
				on:click={next}
				class="bg-slate-50 text-gray-800 rounded-full text-center p-1 hover:bg-slate-200"
				><IcRoundChevronRight /></button
			>
		</span>
	</div>
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
