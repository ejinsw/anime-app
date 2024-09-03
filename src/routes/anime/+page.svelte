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
</script>

<section class="flex justify-center">
	<div class="space-y-8 w-fit">
		<!-- Anime Previews Grid -->
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each anime as item (item.node.id)}
				<PreviewCard anime={item.node} listStatus={item.node.my_list_status ?? null} />
			{/each}
		</div>

		<!-- Pagination Controls -->
		<div class="flex justify-between mt-4">
			<button
				on:click={async () => {
					if (prev) {
						const res = await fetch(`/api/pagination?url=${encodeURIComponent(prev)}`);
						const titles = await res.json();
						const { data, paging } = titles;
						anime = data;
						prev = paging?.previous || null;
						next = paging?.next || null;
					}
				}}
				disabled={!prev}
				class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
			>
				Previous
			</button>
			<button
				on:click={async () => {
					if (next) {
						const res = await fetch(`/api/pagination?url=${encodeURIComponent(next)}`);
						const titles = await res.json();
						const { data, paging } = titles;
						anime = data;
						prev = paging?.previous || null;
						next = paging?.next || null;
					}
				}}
				disabled={!next}
				class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
			>
				Next
			</button>
		</div>
	</div>
</section>
