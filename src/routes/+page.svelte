<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentList from '$lib/components/ContentLists/ContentList.svelte';
	import TopContentList from '$lib/components/ContentLists/TopContentList.svelte';
	import type { AnimeDetail } from '$lib/types';

	export let data;
	$: user = data.user;

	let seasonal: { data: { node: AnimeDetail }[]; paging: { next: string; previous: string } };
	$: seasonal = data.seasonal;

	let top: { data: { node: AnimeDetail }[]; paging: { next: string; previous: string } };
	$: top = data.top;
	let airing: { data: { node: AnimeDetail }[]; paging: { next: string; previous: string } };
	$: airing = data.airing;
	let upcoming: { data: { node: AnimeDetail }[]; paging: { next: string; previous: string } };
	$: upcoming = data.upcoming;

	let bannerTitles: AnimeDetail[];
	$: bannerTitles = data.seasonal?.data.map((anime: { node: AnimeDetail }) => anime.node);
</script>

<div class="flex flex-col gap-y-8 max-w-screen">
	<Banner anime={bannerTitles} />

	<div class="flex w-full">
		<!-- Seasonal -->
		<ContentList
			{user}
			title={'Seasonal Anime'}
			anime={seasonal?.data.map((anime) => anime.node)}
		/>

		<!-- Top -->
		<TopContentList
			{user}
			categories={[
				{ title: 'All', anime: top?.data.map((anime) => anime.node) },
				{ title: 'Airing', anime: airing?.data.map((anime) => anime.node) },
				{ title: 'Upcoming', anime: upcoming?.data.map((anime) => anime.node) }
			]}
		/>
	</div>

	<!-- Airing -->
	<!-- <ContentList
		{user}
		title={'Top Airing'}
		anime={airing?.data.map((anime) => anime.node)}
		prev={airing?.paging.previous}
		next={airing?.paging.next}
	/> -->

	<!-- Upcoming -->
	<!-- <ContentList
		{user}
		title={'Top Upcoming'}
		anime={upcoming?.data.map((anime) => anime.node)}
		next={upcoming?.paging.next}
		prev={upcoming?.paging.previous}
	/> -->
</div>
