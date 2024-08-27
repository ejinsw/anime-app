<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import type { AnimeDetail } from '$lib/types.js';

	export let data;

	// Stores for anime data and pagination
	$: if (data.anime) {
		anime = data.anime.data;
		prev = data.anime.paging?.previous;
		next = data.anime.paging?.next;
	}

	let anime: AnimeDetail[] = [];
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

			if (paging?.previous) {
				const offset = new URL(paging?.previous).searchParams.get('offset');
				prev = `/api/ranking?ranking_type=${category.type}&offset=${offset}`;
			}
			next = paging?.next || null;
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
</script>

<div class="space-y-8">
	<!-- Anime Previews Grid -->
	<div class="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-6">
		{#each anime as item (item.node.id)}
			<Preview anime={item} />
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
