<script lang="ts">
	import type { AnimePreview } from '$lib/types';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import MaterialSymbolsCheckSmallRounded from '~icons/material-symbols/check-small-rounded';
	import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded';

	let searchQuery = '';
	const options = ['Anime', 'Manga'];
	let results: AnimePreview[] = []; // State to hold search results

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
		},
		defaultSelected: 'Anime'
	});

	$: selectedCategory = $selectedLabel || 'Anime';

	// Fetch search results based on the category and query
	async function search() {
		try {
			if (!searchQuery) {
				results = []; // Clear results if query is empty
				return;
			}

			switch (selectedCategory) {
				case 'Anime':
					const animeResponse = await fetch(
						`/api/search/anime?q=${encodeURIComponent(searchQuery)}`
					);
					results = await animeResponse.json();
					break;
				case 'Manga':
					const mangaResponse = await fetch(
						`/api/search/manga?q=${encodeURIComponent(searchQuery)}`
					);
					results = await mangaResponse.json();
					break;
			}
		} catch (err) {
			console.error('Error fetching search results:', err);
			results = []; // Handle error by clearing results
		}
	}
</script>

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
	<div class="relative w-full">
		<input
			type="text"
			placeholder="Search..."
			bind:value={searchQuery}
			on:input={search}
			class="w-full px-4 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring focus:ring-blue-500"
		/>
		{#if results.length > 0}
			<!-- Search Results -->
			<div class="mt-4 w-full rounded-lg bg-neutral-900 p-4 shadow-lg absolute top-8">
				<h3 class="text-white text-lg mb-2">Search Results</h3>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each results as result (result.node.id)}
						<div class="flex items-start bg-neutral-800 rounded-lg p-3 text-white">
							<img
								src={result.node.main_picture.medium}
								alt={result.node.title}
								class="w-20 h-28 object-cover rounded-lg mr-4"
							/>
							<div>
								<h4 class="font-semibold">{result.node.title}</h4>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if searchQuery && !results.length}
			<!-- No results found -->
			<div class="mt-4 w-full rounded-lg bg-neutral-900 p-4 shadow-lg text-white absolute top-8">
				<p>No results found for "{searchQuery}".</p>
			</div>
		{/if}
	</div>
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
