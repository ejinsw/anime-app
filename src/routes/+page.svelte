<script lang="ts">
	import ContentList from '$lib/components/ContentList.svelte';
	import type { AnimePreview } from '$lib/types';

	export let data;

	let seasonalAnime: AnimePreview[];

	$: seasonalAnime = data.seasonalAnime;

	let offset = 0;
</script>

<ContentList title={'Seasonal Anime'} anime={seasonalAnime}></ContentList>
