<script lang="ts">
	import type { AnimeDetail } from '$lib/types';
	import { scoreToColor } from '$lib/utils';
	import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
	import clsx from 'clsx';
	import OutClick from 'svelte-outclick';

	import IcRoundStar from '~icons/ic/round-star';

	export let anime: AnimeDetail;

	let button: HTMLElement;
	let pane: HTMLElement;

	async function updateStatus(score: string) {
		const res = await fetch(`/api/user/animelist/update?id=${anime.id}&score=${score}`);
		if (!res.ok) {
			console.log("Couldn't change status");
			return;
		}
	}

	const handleSelectedChange: CreateSelectProps['onSelectedChange'] = ({ curr, next }) => {
		updateStatus(next?.label ?? anime.my_list_status?.score.toString() ?? '');
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
		defaultSelected: { value: anime.my_list_status?.score }
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
		`px-2 py-1 w-fit h-fit rounded-md flex items-center gap-1
        ${scoreToColor(parseInt($selectedLabel, 10) || anime.my_list_status?.score || 0, 'bg-', 'hard')} 
        ${scoreToColor(parseInt($selectedLabel, 10) || anime.my_list_status?.score || 0, 'text-', 'soft')}`,
		$$props.class
	)}
>
	{$selectedLabel || anime.my_list_status?.score || 0}
	<IcRoundStar class="text-xs" />
</button>

<!-- Select Popup -->
{#if $open}
	<div
		bind:this={pane}
		use:melt={$menu}
		class="flex flex-col z-10 rounded-lg bg-[#1c1c1c] w-fit h-20 overflow-y-auto shadow-lg bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 p-2 text-sm text-neutral-400"
	>
		<div use:melt={$arrow} />
		{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as score}
			<button
				use:melt={$option({ value: score, label: score.toString() })}
				class={`text-start flex items-center hover:bg-neutral-800 px-2 py-1 rounded-sm
                ${$isSelected(score) && 'bg-neutral-800'}`}
			>
				{score}
			</button>
		{/each}
	</div>
{/if}
