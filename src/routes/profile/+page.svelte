<script lang="ts">
	import PreviewCard from '$lib/components/Preview/PreviewCard.svelte';
	import type { AnimeDetail, AnimeStatus, User } from '$lib/types';
	import { scoreToColor } from '$lib/utils';
	import { createTabs, melt } from '@melt-ui/svelte';
	import clsx from 'clsx';

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
			name: 'All',
			items: animeList.data.sort((a, b) => a.list_status.status.localeCompare(b.list_status.status))
		},
        {
			id: 'plan-to-watch',
			name: 'Plan to Watch',
			items: animeList.data.filter((item) => item.list_status.status === 'plan_to_watch')
		},
		{
			id: 'watching',
			name: 'Watching',
			items: animeList.data.filter((item) => item.list_status.status === 'watching')
		},
		{
			id: 'completed',
			name: 'Completed',
			items: animeList.data.filter((item) => item.list_status.status === 'completed')
		},
		{
			id: 'on-hold',
			name: 'On Hold',
			items: animeList.data.filter((item) => item.list_status.status === 'on_hold')
		},
		{
			id: 'dropped',
			name: 'Dropped',
			items: animeList.data.filter((item) => item.list_status.status === 'dropped')
		},
		
	];

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'all'
	});
</script>

<!-- Profile Page Layout -->
<div class="max-w-3xl mx-auto w-full p-6 rounded-lg shadow-md flex flex-col">
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

	<div class="flex gap-1 text-xs mb-1">
		<!-- Number of Items Watching -->
		<span class="bg-blue-400 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Watching: {profile.anime_statistics.num_items_watching ?? '?'}
		</span>
		<!-- Number of Items Completed -->
		<span class="bg-green-400 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Completed: {profile.anime_statistics.num_items_completed ?? '?'}
		</span>
		<!-- Number of Items On Hold -->
		<span class="bg-yellow-400 text-white px-1 py-[2px] rounded-sm min-w-fit">
			On Hold: {profile.anime_statistics.num_items_on_hold ?? '?'}
		</span>
		<!-- Number of Items Dropped -->
		<span class="bg-red-400 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Dropped: {profile.anime_statistics.num_items_dropped ?? '?'}
		</span>
		<!-- Number of Items Plan to Watch -->
		<span class="bg-purple-400 text-white px-1 py-[2px] rounded-sm min-w-fit">
			Plan to Watch: {profile.anime_statistics.num_items_plan_to_watch ?? '?'}
		</span>
	</div>

	<div class="flex gap-1 text-xs mb-1">
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

	<div use:melt={$root} class="flex flex-col w-full overflow-hidden rounded-xl shadow-lg mt-5">
		<div use:melt={$list} class="flex shrink-0 w-full bg-neutral-100 text-black gap-4">
			{#each userLists as list}
				<button
					use:melt={$trigger(list.id)}
					class="{$value === list.id ? 'bg-white' : ''} relative px-4 py-2 flex-auto"
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
			<div use:melt={$content(list.id)} class="grow bg-white p-5 grid-cols-3 {$value === list.id ? 'grid' : 'hidden'}">
				{#each list.items as anime}
					<PreviewCard {user} anime={anime.node} listStatus={anime.list_status} />
				{/each}
			</div>
		{/each}
	</div>
</div>
