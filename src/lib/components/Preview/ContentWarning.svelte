<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import clsx from 'clsx';
	import MaterialSymbolsWarningRounded from '~icons/material-symbols/warning-rounded';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<div
	use:melt={$trigger}
	class={clsx(
		`text-yellow-500 w-fit h-fit px-1 py-[2px] text-sm text-center rounded-md shadow-xl font-semibold tracking-tighter`,
		$$props.class
	)}
>
	<MaterialSymbolsWarningRounded />
</div>

{#if $open}
	<div use:melt={$content} class="bg-neutral-600 text-white px-2 py-1 rounded-lg">
		<div use:melt={$arrow} />
		Possible content warning
	</div>
{/if}
