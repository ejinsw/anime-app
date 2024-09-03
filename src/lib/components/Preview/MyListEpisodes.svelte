<script lang="ts">
	import type { AnimeDetail, AnimeStatus } from '$lib/types';
	import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
	import clsx from 'clsx';
	import OutClick from 'svelte-outclick';

	export let anime: AnimeDetail;
	export let listStatus: AnimeStatus | null

	const total = Array.from({ length: (anime.num_episodes || 0) + 1 }, (_, i) => i);
	let button: HTMLElement;
	let pane: HTMLElement;

	async function updateStatus(num: string) {
		const res = await fetch(
			`/api/user/animelist/update?id=${anime.id}&num_watched_episodes=${num}`
		);
		if (!res.ok) {
			console.log("Couldn't change status");
			return;
		}
	}

	const handleSelectedChange: CreateSelectProps['onSelectedChange'] = ({ curr, next }) => {
		updateStatus(next?.label ?? listStatus?.num_episodes_watched.toString() ?? '');
		return next;
	};

	const {
		elements: { trigger, menu, option, arrow },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect({
		positioning: {
			placement: 'bottom',
			fitViewport: true
		},
		onSelectedChange: handleSelectedChange,
		defaultSelected: { value: listStatus?.num_episodes_watched }
	});
</script>

<OutClick
	on:outclick={() => {
		$open = false;
	}}
	excludeElements={[button, pane]}
/>

<button
	bind:this={button}
	use:melt={$trigger}
	on:click|stopPropagation
	class={clsx(
		`px-2 py-1 w-fit h-fit rounded-md flex items-center gap-1 bg-neutral-800`,
		$$props.class
	)}
>
	{$selectedLabel || listStatus?.num_episodes_watched || 0}/{anime.num_episodes || 0}
</button>

<!-- Select Popup -->
{#if $open}
	<div
		bind:this={pane}
		use:melt={$menu}
		class="flex flex-col z-10 rounded-lg bg-[#1c1c1c] w-fit h-fit shadow-lg bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 p-2 text-sm text-neutral-400"
	>
		<div use:melt={$arrow} />
		<div class="h-fit max-h-20 flex flex-col overflow-y-auto">
			<button
				use:melt={$option({
					value: Math.max(parseInt($selectedLabel, 10) || 0 - 1, 0),
					label: Math.max(parseInt($selectedLabel, 10) || 0 - 1, 0).toString()
				})}
				class={`text-start flex items-center justify-center border border-neutral-700 hover:bg-neutral-800 px-2 rounded-lg mb-1`}
			>
				-
			</button>
			<button
				use:melt={$option({
					value: parseInt($selectedLabel, 10) || 0 + 1,
					label: (parseInt($selectedLabel, 10) || 0 + 1).toString()
				})}
				class={`text-start flex items-center justify-center border border-neutral-700 hover:bg-neutral-800 px-2 rounded-lg mb-1`}
			>
				+
			</button>
			{#each total as num}
				<button
					use:melt={$option({ value: num, label: num.toString() })}
					class={`text-start flex items-center justify-center hover:bg-neutral-800 px-2 py-1 rounded-sm
                ${$isSelected(num) && 'bg-neutral-800'}`}
				>
					{num}
				</button>
			{/each}
		</div>
	</div>
{/if}
