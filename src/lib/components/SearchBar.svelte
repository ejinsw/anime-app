<script lang="ts">
	import type { AnimeDetail, User } from '$lib/types';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import PreviewList from './Preview/PreviewList.svelte';
	import OutClick from 'svelte-outclick';

	import MaterialSymbolsCheckSmallRounded from '~icons/material-symbols/check-small-rounded';
	import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded';
	import MdiMagnify from '~icons/mdi/magnify';
	import { goto } from '$app/navigation';
	import { allow_nsfw } from '$lib/stores/stores';

	export let user: User | null = null;

	let searchQuery = '';
	let showResults = false;
	let resultsPane: HTMLElement;

	const options = ['Anime', 'Manga'];
	let results: { node: AnimeDetail }[] = [];
	$: filteredResults = $allow_nsfw
		? results
		: results.filter((anime) => anime.node.nsfw === 'white');

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<string>({
		forceVisible: true,
		positioning: {
			placement: 'bottom-start',
			fitViewport: true,
			sameWidth: true
		}
	});

	$: selectedCategory = $selectedLabel || 'Anime';

	// Fetch search results based on the category and query
	async function search() {
		showResults = true;
		if (searchQuery.length < 3) return;
		try {
			if (!searchQuery) {
				results = []; // Clear results if query is empty
				return;
			}

			let res;
			switch (selectedCategory) {
				case 'Anime':
					const animeResponse = await fetch(
						`/api/search/anime?q=${encodeURIComponent(searchQuery)}`
					);
					res = await animeResponse.json();
					results = res.data;
					break;
				case 'Manga':
					const mangaResponse = await fetch(
						`/api/search/manga?q=${encodeURIComponent(searchQuery)}`
					);
					res = await mangaResponse.json();
					results = res.data;
					break;
			}
		} catch (err) {
			console.error('Error fetching search results:', err);
			results = []; // Handle error by clearing results
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				showResults = false;
				break;
			case 'Enter':
				if (searchQuery.length >= 3) {
					goto(`/anime?search=${searchQuery}&limit=100`);
				}
				break;
		}
	}
</script>

<OutClick
	on:outclick={() => {
		showResults = false;
	}}
	excludeElements={resultsPane}
/>

<svelte:window on:keydown={handleKeydown} />

<div class="relative flex space-x-2 w-full p-2 rounded-lg items-center">
	<!-- Category Selector Button -->
	<button
		class="flex h-10 w-40 items-center justify-between rounded-lg bg-neutral-800 px-4 py-2 text-white shadow-md transition-opacity hover:opacity-90 focus:outline-none"
		use:melt={$trigger}
		aria-label="Category Selector"
	>
		{selectedCategory}
		<MaterialSymbolsKeyboardArrowDownRounded class="w-4 h-4 ml-2" />
	</button>

	<!-- Search Input -->
	<div class="relative w-full" bind:this={resultsPane}>
		<MdiMagnify class="absolute top-2 left-3 text-neutral-500 text-xl" />
		<input
			type="text"
			placeholder="Search..."
			bind:value={searchQuery}
			on:input={search}
			on:focus={() => (showResults = true)}
			class="w-full pl-12 pr-4 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring focus:ring-blue-500"
		/>
		<div class="hidden md:block">
			{#if showResults && searchQuery && searchQuery.length >= 3 && filteredResults.length > 0}
				<!-- Search Results -->
				<div
					class="mt-4 w-full h-fit max-h-96 overflow-auto rounded-lg bg-neutral-900 p-4 shadow-lg absolute top-8"
				>
					<h3 class="text-white text-lg mb-2">Search Results</h3>
					<div class="flex flex-col">
						{#each filteredResults as result (result.node.id)}
							<PreviewList {user} anime={result.node} />
						{/each}
					</div>
				</div>
			{:else if showResults && searchQuery && searchQuery.length >= 3 && !filteredResults.length}
				{#if !results.length}
					<!-- No results found -->
					<div
						class="mt-4 w-full rounded-lg bg-neutral-900 p-4 shadow-lg text-white absolute top-8"
					>
						<p>No results found for "{searchQuery}".</p>
					</div>
				{:else}
					<div
						class="mt-4 w-full rounded-lg bg-neutral-900 p-4 shadow-lg text-white absolute top-8"
					>
						<p>Some results hidden for "{searchQuery}".</p>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>

<div class="md:hidden absolute top-4 left-0 w-screen">
	{#if showResults && searchQuery && searchQuery.length >= 3 && filteredResults.length > 0}
		<!-- Search Results -->
		<div
			class="mt-4 w-full h-fit max-h-96 overflow-auto rounded-lg bg-neutral-900 p-4 shadow-lg absolute top-8"
		>
			<h3 class="text-white text-lg mb-2">Search Results</h3>
			<div class="flex flex-col">
				{#each filteredResults as result (result.node.id)}
					<PreviewList {user} anime={result.node} />
				{/each}
			</div>
		</div>
	{:else if showResults && searchQuery && searchQuery.length >= 3 && !filteredResults.length}
		{#if !results.length}
			<!-- No results found -->
			<div class="mt-4 w-full rounded-lg bg-neutral-900 p-4 shadow-lg text-white absolute top-8">
				<p>No results found for "{searchQuery}".</p>
			</div>
		{:else}
			<div class="mt-4 w-full rounded-lg bg-neutral-900 p-4 shadow-lg text-white absolute top-8">
				<p>Some results hidden for "{searchQuery}".</p>
			</div>
		{/if}
	{/if}
</div>

{#if $open}
	<!-- Dropdown Menu -->
	<div
		class="absolute z-[100] mt-2 max-h-[300px] w-40 flex flex-col overflow-y-auto rounded-lg bg-neutral-800 p-1 shadow-lg focus:!ring-0"
		use:melt={$menu}
		transition:fade={{ duration: 150 }}
	>
		{#each options as item}
			<div
				class="relative cursor-pointer rounded-lg py-2 px-4 text-white hover:bg-neutral-700 focus:z-10 focus:bg-neutral-700
			data-[highlighted]:bg-neutral-600 data-[highlighted]:text-white data-[disabled]:opacity-50"
				use:melt={$option({ value: item, label: item })}
			>
				<!-- Check Icon for selected items -->
				{#if $isSelected(item)}
					<MaterialSymbolsCheckSmallRounded
						class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2"
					/>
				{/if}
				<div class="ml-4">
					{item}
				</div>
			</div>
		{/each}
	</div>
{/if}
