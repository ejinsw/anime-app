<script lang="ts">
	import type { AnimeDetail, User } from '$lib/types';
	import PreviewCard from '$lib/components/Preview/PreviewCard.svelte';

	import IcRoundChevronRight from '~icons/ic/round-chevron-right';
	import clsx from 'clsx';

	export let title: string = '';
	export let anime: AnimeDetail[];
	export let user: User | null = null;
	export let route: string;
</script>

<div class={clsx('w-full flex flex-col', $$props.class)}>
	<div class="flex justify-between">
		<h1 class="text-3xl font-semibold tracking-tight text-white mb-4">
			{title}
		</h1>
		<a href={route} class="text-3xl"><IcRoundChevronRight /></a>
	</div>
	<section class="flex flex-wrap w-fit h-fit gap-4 pb-2">
		{#if anime}
			{#each anime as item}
				<PreviewCard {user} anime={item} listStatus={item.my_list_status ?? null} />
			{/each}
		{/if}
	</section>
</div>
