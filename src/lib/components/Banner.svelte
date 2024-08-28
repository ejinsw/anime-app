<script lang="ts">
	import type { AnimeDetail } from '$lib/types';
	import { createProgress, melt } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import MaterialSymbolsArrowOutwardRounded from '~icons/material-symbols/arrow-outward-rounded';

	export let anime: AnimeDetail[];
	$: currAnime = anime[currIndex];
	let currIndex = 0;
	onMount(() => {
		setInterval(() => {
			currIndex + 1 >= anime.length ? (currIndex = 0) : currIndex++;
		}, 10000);
	});

	const {
		elements: { root }
	} = createProgress({});
</script>

<button
	class="text-left w-full h-80 overflow-hidden relative rounded-lg"
	on:click={() => (currIndex + 1 >= anime.length ? (currIndex = 0) : currIndex++)}
>
	<div class="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
		<img
			src={currAnime?.main_picture?.large ?? 'https://yugenanime.tv/static/img/161130007900716348.jpg'}
			class="w-full absolute -top-60 left-0"
			alt="Banner background"
		/>
		<div
			class="w-full h-full bg-neutral-600/40 backdrop-blur-lg backdrop-saturate-150 absolute top-0 left-0"
		/>
	</div>
	<div class="flex w-full h-full">
		<section class="text-xl px-20 py-16 flex flex-col">
			<span class="text-xs font-bold text-green-500">#{currIndex + 1} SPOTLIGHT</span>
			<h1 class="font-bold text-3xl">{currAnime?.title ?? ''}</h1>
			<p class="text-sm mt-4">{currAnime?.synopsis?.substring(0, 300)}...</p>
			<a
            on:click|stopPropagation
				href={`/anime/${currAnime?.id ?? 0}`}
				class="flex items-center gap-1 justify-center w-fit mt-12 text-lg from-purple-500 to-blue-500 bg-gradient-to-t px-2 py-1 rounded-lg"
				>View<MaterialSymbolsArrowOutwardRounded class="mt-1" /></a
			>
		</section>

		<div class="mr-20 ml-auto min-w-fit rotate-[20deg] h-[110%] p-4 bg-white shadow-xl">
			<img src={currAnime?.main_picture?.large} class="h-full" alt="" />
		</div>
	</div>

	<!-- Progress Bar -->
	<div
		use:melt={$root}
		class="h-[0.1rem] w-full overflow-hidden rounded-[99999px] bg-black/40 absolute bottom-0 left-0"
	>
		<div
			class="h-full w-full bg-[white] transition-transform duration-[500ms]
        ease-[cubic-bezier(0.65,0,0.35,1)]"
			style={`transform: translateX(-${100 - (100 * (currIndex ?? 0)) / (anime.length - 1 ?? 1)}%)`}
		/>
	</div>
</button>
