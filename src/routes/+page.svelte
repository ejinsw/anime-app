<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentList from '$lib/components/ContentList.svelte';
	import { allow_nsfw } from '$lib/stores/stores.js';
	import type { AnimeDetail } from '$lib/types';
	import { DateToSeason } from '$lib/utils.js';
	import { onMount } from 'svelte';

	export let data;
	$: user = data.user;

	let bannerTitles: AnimeDetail[] = [];

	const today = new Date();

	// Categories to be displayed (you can add or remove categories as needed)
	const rankedCategories = [
		{ type: 'all', title: 'Top Anime Series' },
		{ type: 'airing', title: 'Top Airing Anime' },
		{ type: 'upcoming', title: 'Top Upcoming Anime' }
		// { type: 'tv', title: 'Top Anime TV Series' },
		// { type: 'ova', title: 'Top Anime OVA Series' },
		// { type: 'movie', title: 'Top Anime Movies' },
		// { type: 'special', title: 'Top Anime Specials' },
		// { type: 'bypopularity', title: 'Top Anime by Popularity' },
		// { type: 'favorite', title: 'Top Favorited Anime' }
	];

	// Stores for each category's anime data and pagination
	let seasonalAnime: { node: AnimeDetail }[] = [];
	let seasonalPrev: string | null = null;
	let seasonalNext: string | null = null;

	let rankedAnimeData: Record<
		string,
		{ anime: { node: AnimeDetail }[]; prev: string | null; next: string | null }
	> = {};

	// Initial fetch on mount
	onMount(async () => {
		const res = await fetch(
			`/api/seasonal?year=${today.getFullYear()}&season=${DateToSeason(today)}&limit=10&nsfw=${$allow_nsfw}`
		);
		if (!res.ok) {
			console.log(`There was an error retrieving seasonal anime...`);
			throw new Error(`There was an error retrieving seasonal anime...`);
		}

		const { data, paging } = await res.json();

		seasonalAnime = data;
		bannerTitles = seasonalAnime.map((anime) => anime.node); // Set the banners

		seasonalPrev = paging?.previous || null;
		seasonalNext = paging?.next || null;

		// Fetch anime for each ranking category
		for (const category of rankedCategories) {
			const res = await fetch(
				`/api/ranking?ranking_type=${category.type}&limit=100&nsfw=${$allow_nsfw}`
			);

			if (!res.ok) {
				console.log(`There was an error retrieving ${category.type} anime...`);
				throw new Error(`There was an error retrieving ${category.type} anime...`);
			}

			const { data, paging } = await res.json();

			// Store the data based on the category
			rankedAnimeData[category.type] = {
				anime: data,
				prev: paging?.previous || null,
				next: paging?.next || null
			};
		}
	});
</script>

<div class="space-y-8">
	<Banner anime={bannerTitles} />

	<ContentList
		{user}
		title={'Seasonal Anime'}
		anime={seasonalAnime.map((anime) => anime.node)}
		prev={seasonalPrev}
		next={seasonalNext}
	/>

	<!-- Dynamically render each ranked category -->
	{#each rankedCategories as category}
		<ContentList
			{user}
			title={category.title}
			anime={rankedAnimeData[category.type]?.anime.map((anime) => anime.node) || []}
			prev={rankedAnimeData[category.type]?.prev}
			next={rankedAnimeData[category.type]?.next}
		/>
	{/each}
</div>
