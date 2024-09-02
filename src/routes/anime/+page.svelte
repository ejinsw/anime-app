<script lang="ts">
	import { page } from '$app/stores';
	import PreviewCard from '$lib/components/Preview/PreviewCard.svelte';
	import { allow_nsfw } from '$lib/stores/stores.js';
	import type { AnimeDetail } from '$lib/types.js';
	import { onMount } from 'svelte';

	export let data;

	// Stores for anime data and pagination
	$: if (data.anime) {
		anime = data.anime.data;
		prev = data.anime.paging?.previous;
		next = data.anime.paging?.next;
	}

	let anime: { node: AnimeDetail }[] = [];
	let prev: string | null = null;
	let next: string | null = null;

	// Fetch function for anime data
	async function fetchAnime(url: string) {
		try {
			const res = await fetch(url);

			if (!res.ok) {
				console.error(`Error fetching anime data from ${url}`);
				throw new Error(`Error fetching anime data from ${url}`);
			}

			const data = await res.json();
			const { anime: fetchedAnime, paging } = data;

			anime = fetchedAnime;

			const q = new URL(paging?.previous).searchParams.get('q');
			if (paging?.previous) {
				const offset = new URL(paging?.previous).searchParams.get('offset');
				prev = `/api/search/anime?q=${q}&offset=${offset}&nsfw=${$allow_nsfw}`;
			}
			if (paging?.previous) {
				const offset = new URL(paging?.next).searchParams.get('offset');
				prev = `/api/search/anime?q=${q}&offset=${offset}&nsfw=${$allow_nsfw}`;
			}
		} catch (err) {
			console.error('Error loading anime data:', err);
		}
	}

	// Load more anime data
	function loadMoreAnime(direction: 'prev' | 'next') {
		const url = direction === 'prev' ? prev : next;
		if (url) {
			fetchAnime(url);
		}
	}

	onMount(async () => {
		const searchQuery = $page.url.searchParams.get('search');

		let anime;

		if (searchQuery) {
			const res = await fetch(`/api/search/anime?q=${searchQuery}&nsfw=${$allow_nsfw}`);
			anime = await res.json();
		} else {
			const res = await fetch(`/api/ranking?limit=100&nsfw=${$allow_nsfw}`);
			anime = await res.json();
		}
	});
</script>

<section class="flex justify-center">
	<div class="space-y-8 w-fit">
		<!-- Anime Previews Grid -->
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each anime as item (item.node.id)}
				<PreviewCard anime={item.node} />
			{/each}
		</div>

		<!-- Pagination Controls -->
		<div class="flex justify-between mt-4">
			<button
				on:click={() => {
					loadMoreAnime('prev');
				}}
				disabled={!prev}
				class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
			>
				Previous
			</button>
			<button
				on:click={() => loadMoreAnime('next')}
				disabled={!next}
				class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
			>
				Next
			</button>
		</div>
	</div>
</section>
