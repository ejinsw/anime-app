<script lang="ts">
	import type { AnimeDetail, User } from '$lib/types';
	import { mediaTypeFormatted, scoreToColor } from '$lib/utils';

	import clsx from 'clsx';

	export let anime: AnimeDetail;
	export let user: User | null = null;
	export let showEpisodes = true;
	export let showScore = true;
	export let showMedia = true;

	let sizeClasses = {
		sm: 'w-12',
		md: 'w-32',
		lg: 'w-48'
	};

	let maxImgH = {
		sm: 'h-20',
		md: 'h-48',
		lg: 'h-64'
	};
</script>

<a
	class={clsx(`w-full p-2 flex gap-4 text-sm ${maxImgH['sm']} hover:bg-neutral-800`, $$props.class)}
	href={`/anime/${anime.id}`}
>
	<div class="{`group relative ${sizeClasses['sm']}`} rounded-lg overflow-hidden min-w-fit">
		{#if anime.main_picture}
			<img
				src={anime.main_picture.medium}
				alt={anime.title}
				class="w-full h-full pointer-events-none"
			/>
		{/if}
	</div>
	<div class="flex flex-col w-full justify-between">
		<!-- Title -->
		<div class="w-full text-start">
			{anime.title}
		</div>
		<!-- Tags -->
		<div class="w-full flex gap-1 text-xs mb-1 text-neutral-400">
			{#if showEpisodes}
				<span class="mr-auto text-sm"
					>Episodes: {anime.num_episodes === 0 ? '?' : anime.num_episodes}</span
				>
			{/if}
			{#if showScore}
				<span
					class="text-white px-1 py-[2px] rounded-sm h-fit
					{scoreToColor(Math.floor(anime.mean ?? 0), 'bg-', 'hard')} 
					{scoreToColor(Math.floor(anime.mean ?? 0), 'text-', 'soft')}"
				>
					{anime.mean ?? '?'}
				</span>
			{/if}
			{#if showMedia}
				<span class="bg-orange-400 text-white px-1 py-[2px] rounded-sm h-fit">
					{mediaTypeFormatted(anime.media_type ?? '')}
				</span>
			{/if}
		</div>
	</div>
</a>
