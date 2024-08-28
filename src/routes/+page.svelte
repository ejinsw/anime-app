<script lang="ts">
	import ContentList from '$lib/components/ContentList.svelte';
	import type { AnimeDetail } from '$lib/types';
	import { DateToSeason } from '$lib/utils.js';
	import { onMount } from 'svelte';

	export let data;
	$: user = data.user;

	const today = new Date();

	// Categories to be displayed (you can add or remove categories as needed)
	const rankedCategories = [
		{ type: 'all', title: 'Top Anime Series' },
		{ type: 'airing', title: 'Top Airing Anime' },
		{ type: 'upcoming', title: 'Top Upcoming Anime' },
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

	// Generalized fetch function
	async function fetchAnime(url: string, type: 'seasonal' | 'ranked', category: string = '') {
		try {
			const res = await fetch(url);

			if (!res.ok) {
				console.log(`There was an error retrieving ${type} anime...`);
				throw new Error(`There was an error retrieving ${type} anime...`);
			}

			const animeJson = await res.json();
			const { data, paging } = animeJson;

			if (type === 'seasonal') {
				seasonalAnime = data;
				seasonalPrev = paging?.previous || null;
				seasonalNext = paging?.next || null;
			} else if (type === 'ranked') {
				// Store the data based on the category
				rankedAnimeData[category] = {
					anime: data,
					prev: paging?.previous || null,
					next: paging?.next || null
				};
			}
		} catch (err) {
			console.log(`Error on ${type} anime load:`, err);
		}
	}

	// Initial fetch on mount
	onMount(async () => {
		// Fetch seasonal anime
		await fetchAnime(
			`/api/seasonal?year=${today.getFullYear()}&season=${DateToSeason(today)}&limit=10`,
			'seasonal'
		);

		// Fetch anime for each ranking category
		for (const category of rankedCategories) {
			await fetchAnime(`/api/ranking?ranking_type=${category.type}&limit=10`, 'ranked', category.type);
		}
	});
</script>

<div class="space-y-8">
	<ContentList
		{user}
		title={'Seasonal Anime'}
		anime={seasonalAnime.map((anime) => anime.node)}
		prev={() => {
			if (seasonalPrev) {
				const offset = new URL(seasonalPrev).searchParams.get('offset');
				fetchAnime(
					`/api/seasonal?year=${today.getFullYear()}&season=${DateToSeason(today)}&offset=${offset}`,
					'seasonal'
				);
			}
		}}
		next={() => {
			if (seasonalNext) {
				const offset = new URL(seasonalNext).searchParams.get('offset');
				fetchAnime(
					`/api/seasonal?year=${today.getFullYear()}&season=${DateToSeason(today)}&offset=${offset}`,
					'seasonal'
				);
			}
		}}
	/>

	<!-- Dynamically render each ranked category -->
	{#each rankedCategories as category}
		<ContentList
			{user}
			title={category.title}
			anime={rankedAnimeData[category.type]?.anime.map((anime) => anime.node) || []}
			prev={() => {
				const prev = rankedAnimeData[category.type]?.prev;
				if (prev) {
					const offset = new URL(prev).searchParams.get('offset');
					fetchAnime(
						`/api/ranking?ranking_type=${category.type}&offset=${offset}`,
						'ranked',
						category.type
					);
				}
			}}
			next={() => {
				const next = rankedAnimeData[category.type]?.next;
				if (next) {
					const offset = new URL(next).searchParams.get('offset');
					fetchAnime(
						`/api/ranking?ranking_type=${category.type}&offset=${offset}`,
						'ranked',
						category.type
					);
				}
			}}
		/>
	{/each}
</div>
