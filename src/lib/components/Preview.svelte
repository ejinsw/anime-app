<script lang="ts">
	import type { AnimeDetail } from '$lib/types';
	import { mediaTypeFormatted, ratingFormatted, scoreToColor, statusFormatted } from '$lib/utils';
	import MaterialSymbolsPlayArrowRounded from '~icons/material-symbols/play-arrow-rounded';
	import IcRoundStar from '~icons/ic/round-star';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { noop } from '@melt-ui/svelte/internal/helpers';

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

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'right'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		group: true
	});
</script>

{#if variant === 'card'}
	<div class="flex flex-col min-h-fit h-full {sizeClasses[size]}" use:melt={$trigger}>
		<div
			class="{`group relative ${maxImgH[size]} flex flex-col rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}F"
		>
			<!-- Header -->
			<span class="z-10 absolute flex left-0 top-0 w-full h-fit text-sm">
				<!-- Episodes Tag -->
				<div
					class="bg-white w-fit p-1 m-1 text-sm text-center rounded-md shadow-xl text-black font-bold tracking-tighter"
				>
					Ep {anime.node.num_episodes === 0 ? '?' : anime.node.num_episodes}
				</div>
				<!-- NSFW Tag -->
				{#if anime.node.nsfw && anime.node.nsfw !== 'white'}
					<div
						class="ml-auto bg-red-600 w-fit h-fit m-1 px-2 py-1 text-xs text-center rounded-lg shadow-xl text-white font-semibold tracking-tighter"
					>
						R18
					</div>
				{/if}
			</span>

			<!-- Picture -->
			{#if anime.node.main_picture}
				<img
					src={anime.node.main_picture.large}
					alt={anime.node.title}
					class="w-full h-full object-cover pointer-events-none"
				/>
			{/if}

			<!-- Footer -->
			<span
				class="z-10 absolute flex items-center left-0 bottom-0 w-full h-fit p-1 shadow-lg text-sm"
			>
				<div class="bg-black/70 px-2 py-1 rounded-md">
					{mediaTypeFormatted(anime.node.media_type ?? '')}
				</div>
				{#if anime.node.my_list_status && anime.node.my_list_status?.num_episodes_watched}
					<div class="ml-auto bg-black/70 px-2 py-1 rounded-md shadow-lg">
						{anime.node.my_list_status?.num_episodes_watched || 0}/{anime.node.num_episodes}
					</div>
				{/if}
				{#if anime.node.my_list_status && anime.node.my_list_status?.score}
					<div
						class="ml-1 bg-black/70 px-2 py-1 rounded-md shadow-lg flex items-center gap-1 {scoreToColor(
							anime.node.my_list_status?.score || 0
						)}"
					>
						{anime.node.my_list_status?.score || 0}
						<IcRoundStar class="text-xs" />
					</div>
				{/if}
			</span>

			<!-- Hover -->
			<div
				class="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-0
						text-white text-center p-2 tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300
   			 			pointer-events-none"
			>
				<MaterialSymbolsPlayArrowRounded class="text-neutral-300 text-3xl" />
			</div>
		</div>

		<!-- Title -->
		<div
			class="w-full h-fit mt-2 flex items-center justify-center text-white text-center p-2 tracking-tighter leading-tight pointer-events-none"
		>
			{anime.node.title}
		</div>
	</div>

	<!-- Popup -->
	{#if $open}
		<div
			use:melt={$content}
			transition:fade={{ duration: 100 }}
			class="flex flex-col z-10 rounded-lg bg-[#1c1c1c] w-80 shadow-lg bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 p-4 text-sm text-neutral-400"
		>
			<div use:melt={$arrow} />
			<!-- Title -->
			<h1 class="text-white font-bold text-lg mb-2">{anime.node.title}</h1>
			<!-- Tags -->
			<div class="flex gap-1 text-xs mb-1">
				<span class="mr-auto text-sm"
					>Episodes: {anime.node.num_episodes === 0 ? '?' : anime.node.num_episodes}</span
				>
				<span
					class="{scoreToColor(
						Math.floor(anime.node.mean ?? 0),
						'bg-'
					)} text-white px-1 py-[2px] rounded-sm"
				>
					{anime.node.mean ?? '?'}
				</span>
				<span class="bg-orange-400 text-white px-1 py-[2px] rounded-sm">
					{mediaTypeFormatted(anime.node.media_type ?? '')}
				</span>
			</div>
			<!-- Synopsis -->
			<p class="text-xs mb-2 text-neutral-500">
				{anime.node.synopsis?.substring(0, 100).trimEnd()}...
			</p>
			<!-- Details -->
			<span class="flex gap-1"
				><span class="text-neutral-500">Rating:</span><span>
					{ratingFormatted(anime.node.rating ?? '?')}</span
				></span
			>
			<span class="flex gap-x-1 leading-tight flex-wrap">
				<span class="text-neutral-500">Synonyms:</span>
				{#if anime.node.alternative_titles && anime.node.alternative_titles?.synonyms && anime.node.alternative_titles?.synonyms.length > 0}
					{#each anime.node.alternative_titles?.synonyms as title, i}
						{#if i < 3}
							<span>{title}</span>
						{/if}
					{/each}
				{:else if !anime.node.alternative_titles || !anime.node.alternative_titles?.synonyms || anime.node.alternative_titles?.synonyms.length === 0}
					<span>n/a</span>
				{/if}
			</span>
			<span class="flex gap-1"
				><span class="text-neutral-500">Score:</span><span> {anime.node.mean ?? '?'}</span></span
			>
			<span class="flex gap-1"
				><span class="text-neutral-500">Date aired:</span>
				{anime.node.start_date ?? '?'} to {anime.node.end_date ?? '?'}</span
			>
			<span class="flex gap-1"
				><span class="text-neutral-500">Status:</span>{statusFormatted(
					anime.node.status ?? '?'
				)}</span
			>
			<span class="flex gap-x-1 leading-tight flex-wrap"
				><span class="text-neutral-500">Genre:</span>
				{#if anime.node.genres}
					{#each anime.node.genres as genre}
						<span>{genre.name}</span>
					{/each}
				{/if}
			</span>
		</div>
	{/if}
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
