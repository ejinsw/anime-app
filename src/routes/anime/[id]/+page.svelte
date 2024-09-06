<script lang="ts">
	import { page } from '$app/stores';
	import PreviewCard from '$lib/components/Preview/PreviewCard.svelte';
	import type { AnimeDetail } from '$lib/types.js';
	import { ratingStatusFormatted } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let detail: AnimeDetail;

	onMount(async () => {
		const id = $page.params.id;

		try {
			const res = await fetch(`/api/anime-detail?id=${id}`);
			if (!res.ok) {
				console.log("Couldn't fetch anime detail");
				return;
			}

			detail = await res.json();
		} catch (err) {
			console.log(err);
		}
	});
</script>

<main class="anime-detail container mx-auto p-4">
	<div class="flex flex-col md:flex-row gap-6">
		<!-- Anime Main Image -->
		<img
			src={detail?.main_picture?.large}
			alt={detail?.title}
			class="w-full md:w-1/3 rounded-sm shadow-lg"
		/>

		<!-- Anime Basic Information -->
		<div class="flex flex-col gap-4 md:w-2/3">
			<h1 class="text-3xl font-bold">{detail?.title}</h1>
			<div class="text-gray-700">
				{#if detail?.alternative_titles?.en}
					<p><strong>English:</strong> {detail?.alternative_titles.en}</p>
				{/if}
				{#if detail?.alternative_titles?.ja}
					<p><strong>Japanese:</strong> {detail?.alternative_titles.ja}</p>
				{/if}
				{#if detail?.alternative_titles?.synonyms}
					<p><strong>Synonyms:</strong> {detail?.alternative_titles.synonyms.join(', ')}</p>
				{/if}
			</div>
			<p><strong>Rating:</strong> {detail?.mean}</p>
			<p><strong>Rank:</strong> #{detail?.rank}</p>
			<p><strong>Popularity:</strong> #{detail?.popularity}</p>
			<p><strong>Episodes:</strong> {detail?.num_episodes}</p>
			<p><strong>Status:</strong> {ratingStatusFormatted(detail?.status ?? '?')}</p>
			<p><strong>Genres:</strong> {detail?.genres?.map((genre) => genre.name).join(', ')}</p>
		</div>
	</div>

	<!-- Studios -->
	{#if detail?.studios}
		<section class="my-4">
			<ul class="flex gap-4 overflow-x-auto">
				{#each detail?.studios as studio}
					<li
						class="flex flex-col items-center text-center w-fit bg-[#1c1c1c] px-2 py-1 rounded-sm shadow-lg"
					>
						{studio.name}
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Anime Synopsis -->
	<section class="my-4">
		<h2 class="text-2xl font-semibold mb-2">Synopsis</h2>
		<p class="text-gray-700">{detail?.synopsis}</p>
	</section>

	<!-- Related Anime Section -->
	{#if detail?.related_anime?.length}
		<section class="my-6">
			<h2 class="text-2xl font-semibold mb-4">Related Anime</h2>
			<ul class="flex gap-4 overflow-x-auto">
				{#each detail?.related_anime as related}
					<li class="flex flex-col items-center text-center w-fit">
						<PreviewCard anime={related.node} size="md" />
						<p class="text-xs text-gray-500">{related.relation_type_formatted}</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Recommendations Section -->
	{#if detail?.recommendations?.length}
		<section class="my-6">
			<h2 class="text-2xl font-semibold mb-4">Recommendations</h2>
			<ul class="flex gap-4 overflow-x-auto">
				{#each detail?.recommendations as recommendation}
					<li class="flex flex-col items-center text-center w-fit">
						<PreviewCard anime={recommendation.node} size="md" />
						<p class="text-xs text-gray-500">
							{recommendation.num_recommendations} recommendations
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</main>
