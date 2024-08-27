<script lang="ts">
	import type { AnimeDetail } from '$lib/types';
	import { mediaTypeFormatted, scoreToColor } from '$lib/utils';
	import MaterialSymbolsPlayArrowRounded from '~icons/material-symbols/play-arrow-rounded';
	import IcRoundStar from '~icons/ic/round-star';

	export let variant: 'card' | 'long' | 'list' = 'card';
	export let anime: AnimeDetail;
	export let size: 'sm' | 'md' | 'lg' = 'md'; // Default size is 'md'

	let sizeClasses = {
		sm: 'w-32',
		md: 'w-48',
		lg: 'w-64'
	};

	let maxImgH = {
		sm: 'max-h-48',
		md: 'max-h-64',
		lg: 'max-h-80'
	};
</script>

{#if variant === 'card'}
	<div class="flex flex-col min-h-fit h-full {sizeClasses[size]}">
		<div
			class="{`group relative ${maxImgH[size]} flex flex-col rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}F"
		>
			<div
				class="z-50 absolute left-0 top-0 bg-white min-w-fit px-2 h-5 w-6 text-sm text-center rounded-br-lg shadow-xl text-neutral-800 font-bold tracking-tighter"
			>
				Ep {anime.node.num_episodes === 0 ? '?' : anime.node.num_episodes}
			</div>

			{#if anime.node.nsfw && anime.node.nsfw !== 'white'}
				<div
					class="z-50 absolute right-0 top-0 bg-red-600 w-12 h-5 text-sm text-center rounded-bl-lg shadow-xl text-white font-semibold tracking-tighter"
				>
					R18
				</div>
			{/if}

			{#if anime.node.main_picture}
				<img
					src={anime.node.main_picture.large}
					alt={anime.node.title}
					class="w-full h-full object-cover"
				/>
			{/if}
			<div
				class="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50
    text-white text-center p-2 tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none"
			>
				<MaterialSymbolsPlayArrowRounded class="text-neutral-400 text-3xl" />
			</div>
			<span
				class="absolute flex items-center left-0 bottom-0 w-full h-fit p-1 shadow-lg text-sm"
			>
				<div class="bg-black/70 px-2 py-1 rounded-md">{mediaTypeFormatted(anime.node.media_type ?? '')}</div>
				{#if anime.node.my_list_status && anime.node.my_list_status?.num_episodes_watched}
				<div class="ml-auto bg-black/70 px-2 py-1 rounded-md shadow-lg">
					{anime.node.my_list_status?.num_episodes_watched || 0}/{anime.node.num_episodes}
				</div>
				{/if}
				{#if anime.node.my_list_status && anime.node.my_list_status?.score}
				<div class="ml-1 bg-black/70 px-2 py-1 rounded-md shadow-lg flex items-center gap-1 {scoreToColor(anime.node.my_list_status?.score || 0)}">
					{anime.node.my_list_status?.score || 0}
					<IcRoundStar class="text-xs" />
				</div>
				{/if}
			</span>
		</div>
		<div
			class="w-full h-fit mt-2 flex items-center justify-center text-white text-center p-2 tracking-tighter leading-tight pointer-events-none"
		>
			{anime.node.title}
		</div>
	</div>
{:else if variant === 'list'}
	<div
		class="{`group relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}F"
	>
		{#if anime.node.main_picture}
			<img
				src={anime.node.main_picture.medium}
				alt={anime.node.title}
				class="w-full h-full object-cover"
			/>
		{/if}
		<div
			class="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50
    text-white text-center p-2 tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none"
		>
			{anime.node.title}
		</div>
		<span
			class="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full invisible group-hover:visible transition-all duration-100"
		></span>
	</div>
{:else if variant === 'long'}
	<div
		class="{`group relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}F"
	>
		{#if anime.node.main_picture}
			<img
				src={anime.node.main_picture.medium}
				alt={anime.node.title}
				class="w-full h-full object-cover"
			/>
		{/if}
		<div
			class="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50
    text-white text-center p-2 tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none"
		>
			{anime.node.title}
		</div>
		<span
			class="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full invisible group-hover:visible transition-all duration-100"
		></span>
	</div>
{/if}
