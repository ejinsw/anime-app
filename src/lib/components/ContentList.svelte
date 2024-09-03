<script lang="ts">
	import type { AnimeDetail, User } from '$lib/types';
	import PreviewCard from '$lib/components/Preview/PreviewCard.svelte';
	import { onMount } from 'svelte';

	import IcRoundChevronLeft from '~icons/ic/round-chevron-left';
	import IcRoundChevronRight from '~icons/ic/round-chevron-right';


	export let title: string = '';
	export let anime: AnimeDetail[];
	export let prev: string | null;
	export let next: string | null;
	export let user: User | null = null;

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
			class="text-3xl font-semibold tracking-tight bg-gradient-to-r bg-clip-text text-transparent from-slate-400 to-slate-500 mb-4 relative inline-block animate-fade-in {shimmerAnimation &&
				'shimmer'}"
		>
			{title}
		</h1>
		<span class="ml-auto">
			<button
				disabled={!prev}
				on:click={async () => {
					if (prev) {
						const res = await fetch(`/api/pagination?url=${encodeURIComponent(prev)}`);
						const titles = await res.json();
						const { data, paging } = titles;
						anime = data.map((anime) => anime.node);
						prev = paging?.previous || null;
						next = paging?.next || null;
					}
				}}
				class="bg-slate-50 text-gray-800 rounded-full text-center p-1 hover:bg-neutral-200 disabled:bg-neutral-400"
				><IcRoundChevronLeft /></button
			>
			<button
				disabled={!next}
				on:click={async () => {
					if (next) {
						const res = await fetch(`/api/pagination?url=${encodeURIComponent(next)}`);
						const titles = await res.json();
						const { data, paging } = titles;
						anime = data.map((anime) => anime.node);
						prev = paging?.previous || null;
						next = paging?.next || null;
					}
				}}
				class="bg-slate-50 text-gray-800 rounded-full text-center p-1 hover:bg-neutral-200 disabled:bg-neutral-400"
				><IcRoundChevronRight /></button
			>
		</span>
	</div>
	<section class="flex overflow-x-auto w-full h-fit">
		<nav class="flex w-fit h-fit space-x-4 pb-2">
			{#if anime}
				{#each anime as item}
					<PreviewCard {user} anime={item} listStatus={item.my_list_status ?? null} />
				{/each}
			{/if}
		</nav>
	</section>
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
