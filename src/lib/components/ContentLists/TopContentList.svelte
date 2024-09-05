<script lang="ts">
	import type { AnimeDetail, User } from '$lib/types';
	import clsx from 'clsx';
	import PreviewList from '../Preview/PreviewList.svelte';
	import { scoreToColor } from '$lib/utils';

	export let categories: { title: string; anime: AnimeDetail[]; route: string }[];
	export let user: User | null = null;

	let selectedCategory = 0;
	let anime: AnimeDetail[];
	$: anime = categories[selectedCategory].anime;
</script>

<div
	class={clsx(
		'flex flex-col w-fit h-fit rounded-lg py-4 bg-[#111111] bg-opacity-90 backdrop-blur-lg backdrop-saturate-150',
		$$props.class
	)}
>
	<div class="flex items-end mx-4 justify-between h-fit">
		<h1 class="text-xl font-semibold tracking-tight text-white w-fit h-fit flex">Top Anime</h1>
		<nav class="flex w-fit gap-1 font-semibold text-sm items-end h-full">
			{#each categories as category, i}
				<button
					on:click={() => (selectedCategory = i)}
					class="{selectedCategory === i ? 'text-neutral-200' : 'text-neutral-500'}"
					>{category.title}</button
				>
			{/each}
		</nav>
	</div>
	<section class="flex w-full h-fit">
		<ul class="flex flex-col w-fit h-fit space-x-4 py-2">
			{#if anime}
				{#each anime as item, i}
					{#if i === 0}
						<a href={`/anime/${item.id}`} class="flex w-full gap-4 items-center relative h-52">
							<!-- Image -->
							<div
								class="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
							>
								<img
									src={item?.main_picture?.large}
									class="w-full h-fit absolute top-0 left-0"
									alt="Top 1 anime"
								/>
							</div>

							<!-- Text -->
							<div
								class="absolute bottom-0 left-0 w-full h-full flex bg-gradient-to-t from-black/80 to-black/0 pt-2 items-end"
							>
								<div class="flex gap-4 px-4 pb-2">
									<span
										class="text-2xl w-12 h-12 shrink-0 grow-0 flex items-center justify-center border-2 rounded-lg border-magnum-500"
										>{i + 1}</span
									>
									<div class="flex flex-col">
										<h1 class="font-bold text-lg">{item?.title ?? ''}</h1>
										<span
											class="text-white px-1 py-[2px] rounded-sm h-fit w-fit text-xs
						{scoreToColor(Math.floor(item?.mean ?? 0), 'bg-', 'hard')} 
						{scoreToColor(Math.floor(item?.mean ?? 0), 'text-', 'soft')}"
										>
											{item?.mean ?? '?'}
										</span>
									</div>
								</div>
							</div>
						</a>
					{:else}
						<li class="flex gap-4 items-center group">
							<span class="text-2xl w-12 h-10 flex items-center justify-center border-2 rounded-lg"
								>{i + 1}</span
							>
							<PreviewList
								{user}
								anime={item}
								listStatus={item.my_list_status ?? null}
								showEpisodes={false}
								showMedia={false}
								showScore={true}
							/>
						</li>
					{/if}
				{/each}
			{/if}
		</ul>
	</section>
	<a class="flex items-center justify-center" href={categories[selectedCategory].route}>More</a>
</div>
