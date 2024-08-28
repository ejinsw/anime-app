<script lang="ts">
	import type { AnimeDetail, User } from '$lib/types';
	import {
		mediaTypeFormatted,
		ratingFormatted,
		scoreToColor,
		ratingStatusFormatted
	} from '$lib/utils';
	import MaterialSymbolsPlayArrowRounded from '~icons/material-symbols/play-arrow-rounded';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import clsx from 'clsx';
	import { goto } from '$app/navigation';
	import MyListStatusDropdown from './MyListStatusDropdown.svelte';
	import MyListScore from '$lib/components/Preview/MyListScore.svelte';
	import MyListEpisodes from './MyListEpisodes.svelte';
	import MyListDelete from './MyListDelete.svelte';

	export let variant: 'card' | 'long' | 'list' = 'card';
	export let anime: AnimeDetail;
	export let size: 'sm' | 'md' | 'lg' = 'lg'; // Default size is 'md'
	export let user: User | null = null;

	let status: string = anime.my_list_status?.status ?? '';

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

	async function handleAddToList() {
		try {
			const res = await fetch(`/api/user/animelist/add?id=${anime.id}`);
			if (!res.ok) {
				console.log('Adding returned a bad response', res);
				return;
			}

			anime.my_list_status = await res.json();

			console.log(anime.my_list_status);
		} catch (err) {
			console.log(err);
		}
	}
</script>

{#if variant === 'card'}
	<div
		class={clsx(`flex flex-col min-h-fit h-full ${sizeClasses[size]}`, $$props.class)}
		use:melt={$trigger}
	>
		<button
			class="{`group relative ${maxImgH[size]} flex flex-col rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}F"
			on:click={() => goto(`/anime/${anime.id}`)}
		>
			<!-- Header -->
			<span class="z-10 absolute flex left-0 top-0 w-full h-fit items-start text-sm p-1">
				<!-- Media Tag -->
				<div class="bg-black/70 px-2 py-1 rounded-md">
					{mediaTypeFormatted(anime.media_type ?? '')}
				</div>

				<!-- NSFW Tag -->
				{#if anime.nsfw && anime.nsfw !== 'white'}
					<div
						class="ml-auto bg-red-500/90 w-fit h-fit px-1 py-[2px] text-xs text-center rounded-md shadow-xl text-white font-semibold tracking-tighter"
					>
						R18
					</div>
				{/if}
			</span>

			<!-- Picture -->
			{#if anime.main_picture}
				<img
					src={anime.main_picture.large}
					alt={anime.title}
					class="w-full h-full object-cover pointer-events-none"
				/>
			{/if}

			<!-- Footer -->
			<span
				class="z-10 absolute flex gap-1 items-center left-0 bottom-0 w-full h-fit p-1 shadow-lg text-sm tracking-tighter"
			>
				<!-- User Tags -->
				{#if user && anime.my_list_status}
					<!-- Status -->
					<MyListStatusDropdown {anime} style="dark" bind:status />
				{:else if user && !anime.my_list_status}
					<button
						class="bg-blue-500/90 px-2 py-1 rounded-md shadow-lg"
						on:click|stopPropagation={handleAddToList}
					>
						Add to List
					</button>
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
		</button>

		<!-- Title -->
		<div
			class="w-full h-fit mt-2 flex items-center justify-center text-white text-sm text-center p-2 tracking-tighter leading-tight pointer-events-none"
		>
			{anime.title}
		</div>
	</div>
{:else if variant === 'list'}
	<a
		class={clsx(
			`w-full p-2 flex gap-4 text-sm ${maxImgH['sm']} hover:bg-neutral-800`,
			$$props.class
		)}
		href={`/anime/${anime.id}`}
	>
		<div class="{`group relative ${sizeClasses['sm']}`} rounded-lg overflow-hidden">
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
				<span class="mr-auto text-sm"
					>Episodes: {anime.num_episodes === 0 ? '?' : anime.num_episodes}</span
				>
				<span
					class="text-white px-1 py-[2px] rounded-sm
					{scoreToColor(Math.floor(anime.mean ?? 0), 'bg-', 'hard')} 
					{scoreToColor(Math.floor(anime.mean ?? 0), 'text-', 'soft')}"
				>
					{anime.mean ?? '?'}
				</span>
				<span class="bg-orange-400 text-white px-1 py-[2px] rounded-sm">
					{mediaTypeFormatted(anime.media_type ?? '')}
				</span>
			</div>
		</div>
	</a>
{:else if variant === 'long'}
	<div
		class="{`group relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}F"
	>
		{#if anime.main_picture}
			<img src={anime.main_picture.medium} alt={anime.title} class="w-full h-full object-cover" />
		{/if}
		<div
			class="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50
    text-white text-center p-2 tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none"
		>
			{anime.title}
		</div>
		<span
			class="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full invisible group-hover:visible transition-all duration-100"
		></span>
	</div>
{/if}

<!-- Popup -->
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="flex flex-col z-10 rounded-lg bg-[#1c1c1c] w-80 shadow-lg bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 p-4 text-sm text-neutral-400"
	>
		<div use:melt={$arrow} />
		<!-- Title -->
		<h1 class="text-white font-bold text-lg mb-2">{anime.title}</h1>
		<!-- User -->
		{#if user && anime.my_list_status}
			<div class="flex gap-1 mb-1">
				<!-- Status -->
				<MyListStatusDropdown {anime} style="color" bind:status />
				<!-- Episodes -->
				<MyListEpisodes {anime} />
				<!-- Score -->
				<MyListScore {anime} />
				<!-- Delete -->
				<MyListDelete bind:anime />
			</div>
		{:else if user && !anime.my_list_status}
			<button
				class="bg-blue-500/90 px-2 py-1 rounded-md shadow-lg mb-1 text-white"
				on:click|stopPropagation={handleAddToList}
			>
				Add to List
			</button>
		{/if}

		<!-- Tags -->
		<div class="flex gap-1 text-xs mb-1">
			<!-- Total Episodes -->
			<span class="mr-auto text-sm"
				>Episodes: {anime.num_episodes === 0 || !anime.num_episodes
					? '?'
					: anime.num_episodes}</span
			>
			<!-- Mean -->
			<span
				class="text-white px-1 py-[2px] rounded-sm
				{scoreToColor(Math.floor(anime.mean ?? 0), 'bg-', 'hard')}
				{scoreToColor(Math.floor(anime.mean ?? 0), 'text-', 'soft')}"
			>
				{anime.mean ?? '?'}
			</span>
			<span class="bg-orange-400 text-white px-1 py-[2px] rounded-sm">
				{mediaTypeFormatted(anime.media_type ?? '')}
			</span>
		</div>
		<!-- Synopsis -->
		<p class="text-xs mb-2 text-neutral-500">
			{anime.synopsis?.substring(0, 100).trimEnd() || ''}...
		</p>
		<!-- Details -->
		<span class="flex gap-1"
			><span class="text-neutral-500">Rating:</span><span>
				{ratingFormatted(anime.rating ?? '?')}</span
			></span
		>
		<span class="flex gap-x-1 leading-tight flex-wrap">
			<span class="text-neutral-500">Synonyms:</span>
			{#if anime.alternative_titles && anime.alternative_titles?.synonyms && anime.alternative_titles?.synonyms.length > 0}
				{#each anime.alternative_titles?.synonyms as title, i}
					{#if i < 3}
						<span>{title}</span>
					{/if}
				{/each}
			{:else if !anime.alternative_titles || !anime.alternative_titles?.synonyms || anime.alternative_titles?.synonyms.length === 0}
				<span>n/a</span>
			{/if}
		</span>
		<span class="flex gap-1"
			><span class="text-neutral-500">Score:</span><span> {anime.mean ?? '?'}</span></span
		>
		<span class="flex gap-1"
			><span class="text-neutral-500">Date aired:</span>
			{anime.start_date ?? '?'} to {anime.end_date ?? '?'}</span
		>
		<span class="flex gap-1"
			><span class="text-neutral-500">Status:</span>{ratingStatusFormatted(
				anime.status ?? '?'
			)}</span
		>
		<span class="flex gap-x-1 leading-tight flex-wrap"
			><span class="text-neutral-500">Genre:</span>
			{#if anime.genres && anime.genres.length > 0}
				{#each anime.genres as genre}
					<span>{genre.name}</span>
				{/each}
			{:else}
				<span>n/a</span>
			{/if}
		</span>
	</div>
{/if}
