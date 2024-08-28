<script lang="ts">
	import type { AnimeDetail } from '$lib/types';
	import { listStatusFormatted, listStatusToColor } from '$lib/utils';
	import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
	import clsx from 'clsx';
	import OutClick from 'svelte-outclick';

	import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded';
	import MdiCircleMedium from '~icons/mdi/circle-medium';

	export let anime: AnimeDetail;
	export let style: 'dark' | 'color' = 'dark';
	export let status;

	$: status = $selectedLabel;

	const statusOptions = ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'];
	let button: HTMLElement;
	let pane: HTMLElement;

	async function updateStatus(status: string) {
		const res = await fetch(`/api/user/animelist/update?id=${anime.id}&status=${status}`);
		if (!res.ok) {
			console.log("Couldn't change status");
			return;
		}
	}

	const handleSelectedChange: CreateSelectProps['onSelectedChange'] = ({ curr, next }) => {
		updateStatus(next?.label ?? anime.my_list_status?.status ?? '');
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
		defaultSelected: { value: anime.my_list_status?.status }
	});
</script>

<OutClick
	on:outclick={() => {
		$open = false;
	}}
	excludeElements={[button, pane]}
/>

<!-- Trigger -->
<button
	bind:this={button}
	use:melt={$trigger}
	on:click|stopPropagation
	class={clsx(
		`bg-black/70 pr-2 py-1 rounded-md shadow-lg flex items-center 
        ${
					style === 'dark'
						? listStatusToColor(
								status || anime.my_list_status?.status || '',
								'text-',
								'hard'
							)
						: listStatusToColor(
								status || anime.my_list_status?.status || '',
								'text-',
								'hard'
							) +
							' ' +
							listStatusToColor(status || anime.my_list_status?.status || '', 'bg-', 'soft')
				}`,
		$$props.class
	)}
>
	<MdiCircleMedium />
	{listStatusFormatted(status || anime.my_list_status?.status || '?')}
	<MaterialSymbolsKeyboardArrowDownRounded class="text-neutral-400" />
</button>

<!-- Select Popup -->
{#if $open}
	<div
		bind:this={pane}
		use:melt={$menu}
		class="flex flex-col z-10 rounded-lg bg-[#1c1c1c] w-fit shadow-lg bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 p-2 text-sm text-neutral-400"
	>
		<div use:melt={$arrow} />
		{#each statusOptions as status}
			<button
				use:melt={$option({ value: status, label: status })}
				class="text-start flex items-center hover:bg-neutral-800 px-2 py-1 rounded-sm {$isSelected(
					status
				) && 'bg-neutral-800'} {listStatusToColor(status || '', 'text-', 'hard')}"
			>
				<MdiCircleMedium />
				{listStatusFormatted(status)}
			</button>
		{/each}
	</div>
{/if}
