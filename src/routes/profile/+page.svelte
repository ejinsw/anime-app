<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte';
	import PreviewCard from '$lib/components/Preview/PreviewCard.svelte';
	import RadarChart from '$lib/components/RadarChart.svelte';
	import type { AnimeDetail, AnimeStatus, User } from '$lib/types';
	import { scoreToColor } from '$lib/utils';
	import { createTabs, melt } from '@melt-ui/svelte';

	// Define the expected structure of the `data` prop
	export let data;

	$: user = data.user;

	let profile: User;

	$: profile = data.profile;

	let animeList: {
		data: { node: AnimeDetail; list_status: AnimeStatus }[];
		paging: { previous: string; next: string };
	};

	$: animeList = data.animeList;

	$: userLists = [
		{
			id: 'all',
			name: `All (${profile.anime_statistics.num_items ?? '?'})`,
			items: animeList.data.sort((a, b) => a.list_status.status.localeCompare(b.list_status.status))
		},
		{
			id: 'plan-to-watch',
			name: `Plan to Watch (${profile.anime_statistics.num_items_plan_to_watch ?? '?'})`,
			items: animeList.data.filter((item) => item.list_status.status === 'plan_to_watch')
		},
		{
			id: 'watching',
			name: `Watching (${profile.anime_statistics.num_items_watching ?? '?'})`,
			items: animeList.data.filter((item) => item.list_status.status === 'watching')
		},
		{
			id: 'completed',
			name: `Completed (${profile.anime_statistics.num_items_completed ?? '?'})`,
			items: animeList.data.filter((item) => item.list_status.status === 'completed')
		},
		{
			id: 'on-hold',
			name: `On Hold (${profile.anime_statistics.num_items_on_hold ?? '?'})`,
			items: animeList.data.filter((item) => item.list_status.status === 'on_hold')
		},
		{
			id: 'dropped',
			name: `Dropped (${profile.anime_statistics.num_items_dropped ?? '?'})`,
			items: animeList.data.filter((item) => item.list_status.status === 'dropped')
		}
	];

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'all'
	});
</script>

<!-- Profile Page Layout -->
<div class="mx-auto w-full p-6 rounded-lg shadow-md flex flex-col justify-start">
	<!-- Profile Header -->
	<div class="flex w-full gap-4 mb-4 items-center">
		<div class="shrink-0">
			<img
				src={profile.picture ?? 'https://www.gravatar.com/avatar/HASH?s=200&d=mp'}
				alt={`${profile.name}'s avatar`}
				class="w-24 h-24 rounded-lg shadow-lg"
			/>
		</div>

		<h2 class="text-2xl font-bold">{profile.name}</h2>
	</div>

	<div class="flex gap-1 text-xs mb-1 flex-wrap">
		<!-- Number of Days Watched -->
		<span class="bg-blue-600 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Days Watched: {profile.anime_statistics.num_days_watched ?? '?'}
		</span>
		<!-- Number of Episodes -->
		<span class="bg-orange-400 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Episodes: {profile.anime_statistics.num_episodes ?? '?'}
		</span>
		<!-- Number of Times Rewatched -->
		<span class="bg-purple-500 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Rewatched: {profile.anime_statistics.num_times_rewatched ?? '?'}
		</span>
		<!-- Mean Score -->
		<span
			class="text-white px-1 py-[2px] rounded-sm min-w-fit
            {scoreToColor(Math.floor(profile.anime_statistics.mean_score ?? 0), 'bg-', 'hard')}
            {scoreToColor(Math.floor(profile.anime_statistics.mean_score ?? 0), 'text-', 'soft')}"
		>
			Mean Score: {profile.anime_statistics.mean_score ?? '?'}
		</span>
	</div>

	<div
	class="mt-4 flex flex-wrap w-full bg-[#111111] bg-opacity-90 backdrop-blur-lg backdrop-saturate-150 rounded-lg flex-col lg:flex-row"
	>
		<!-- Scores Graph -->
        <div class="grow shrink flex flex-col px-8 py-4 w-full lg:max-w-[50%]">
			<h1 class="text-xl font-bold">Score Distribution</h1>
			<small class="text-sm font-semibold"
				>{animeList.data.filter((item) => !item.list_status.score).length} unrated shows</small
			>
			<BarChart
				class="w-full"
				items={[
					{
						label: `1`,
						value: animeList.data.filter((item) => item.list_status.score === 1).length
					},
					{
						label: `2`,
						value: animeList.data.filter((item) => item.list_status.score === 2).length
					},
					{
						label: `3`,
						value: animeList.data.filter((item) => item.list_status.score === 3).length
					},
					{
						label: `4`,
						value: animeList.data.filter((item) => item.list_status.score === 4).length
					},
					{
						label: `5`,
						value: animeList.data.filter((item) => item.list_status.score === 5).length
					},
					{
						label: `6`,
						value: animeList.data.filter((item) => item.list_status.score === 6).length
					},
					{
						label: `7`,
						value: animeList.data.filter((item) => item.list_status.score === 7).length
					},
					{
						label: `8`,
						value: animeList.data.filter((item) => item.list_status.score === 8).length
					},
					{
						label: `9`,
						value: animeList.data.filter((item) => item.list_status.score === 9).length
					},
					{
						label: `10`,
						value: animeList.data.filter((item) => item.list_status.score === 10).length
					}
				]}
			/>
		</div>

        <!-- Genres Graph -->
        <div class="grow shrink flex flex-col px-8 py-4 w-full lg:max-w-[50%]">
			<h1 class="text-xl font-bold">Favorite Genres</h1>
			<RadarChart
				items={[
					{
						label: `Action`,
						value: animeList.data.filter((item) =>
							item.node.genres?.some((genre) => genre.name === 'Action')
						).length
					},
					{
						label: `Fantasy`,
						value: animeList.data.filter((item) =>
							item.node.genres?.some((genre) => genre.name === 'Fantasy')
						).length
					},
					{
						label: `Drama`,
						value: animeList.data.filter((item) =>
							item.node.genres?.some((genre) => genre.name === 'Drama')
						).length
					},
					{
						label: `Comedy`,
						value: animeList.data.filter((item) =>
							item.node.genres?.some((genre) => genre.name === 'Comedy')
						).length
					},
					{
						label: `Supernatural`,
						value: animeList.data.filter((item) =>
							item.node.genres?.some((genre) => genre.name === 'Supernatural')
						).length
					}
				]}
			/>
		</div>
	</div>

	<div use:melt={$root} class="flex flex-col w-full overflow-hidden rounded-xl shadow-lg mt-5">
		<div
			use:melt={$list}
			class="flex shrink-0 w-full bg-neutral-900 shadow-lg backdrop-blur-lg backdrop-saturate-150 text-white gap-4 overflow-x-auto"
		>
			{#each userLists as list}
				<button
					use:melt={$trigger(list.id)}
					class="{$value === list.id
						? 'bg-neutral-800 backdrop-blur-lg backdrop-saturate-150'
						: ''} relative px-4 py-2 flex-auto min-w-fit"
				>
					{list.name}
					{#if $value === list.id}
						<div
							class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-magnum-400"
						/>
					{/if}
				</button>
			{/each}
		</div>
		{#each userLists as list}
			<div
				use:melt={$content(list.id)}
				class="grow bg-[#111111] bg-opacity-90 backdrop-blur-lg backdrop-saturate-150 p-5"
			>
				<div
					class="mx-auto w-fit gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 {$value ===
					list.id
						? 'grid'
						: 'hidden'}"
				>
					{#each list.items as anime}
						<PreviewCard {user} anime={anime.node} listStatus={anime.list_status} class="" />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
