<script lang="ts">
	import { createPopover, createSync, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import FluentGridDots20Regular from '~icons/fluent/grid-dots-20-regular';
	import IcTwotoneClose from '~icons/ic/twotone-close';
	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover();

	export let user;

	let active = 'home';
</script>

<div
	class="z-50 flex justify-center items-center fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] md:w-[60%] bg-[#1c1c1c] bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 rounded-full px-4 py-2 shadow-lg"
>
	<div class="flex gap-6 text-white">
		<a
			href="/"
			class="flex items-center justify-center px-4 py-2 rounded-full transition-all"
			class:bg-gray-700={active === 'home'}
			on:click={() => (active = 'home')}
		>
			Home
		</a>
		<button
			class="flex items-center justify-center px-4 py-2 rounded-full transition-all"
			class:bg-gray-700={active === 'posts'}
			on:click={() => (active = 'posts')}
		>
			Posts
		</button>
		<button
			class="flex items-center justify-center px-4 py-2 rounded-full transition-all"
			class:bg-gray-700={active === 'about'}
			on:click={() => (active = 'about')}
		>
			About
		</button>
	</div>
	<div class="ml-auto flex items-center justify-center">
		<button
			type="button"
			class="trigger flex items-center justify-center p-2 rounded-full hover:bg-gray-700 transition-all"
			use:melt={$trigger}
		>
			<FluentGridDots20Regular />
		</button>
	</div>
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm"
	>
		<div use:melt={$arrow} />
		<div class="flex flex-col gap-2.5">
			<p class="mb-2 font-medium text-neutral-900">Dimensions</p>
			<fieldset class="flex items-center gap-5">
				<label class="w-[75px] text-sm text-neutral-700" for="width">Width</label>
				<input type="number" id="width" class="input" placeholder="Width" />
			</fieldset>
			<fieldset class="flex items-center gap-5">
				<label class="w-[75px] text-sm text-neutral-700" for="height">Height</label>
				<input type="number" id="height" class="input" placeholder="Height" />
			</fieldset>
			<fieldset class="flex items-center gap-5">
				<label class="w-[75px] text-sm text-neutral-700" for="depth">Depth</label>
				<input type="number" id="depth" class="input" placeholder="Depth" />
			</fieldset>
			<fieldset class="flex items-center gap-5">
				<label class="w-[75px] text-sm text-neutral-700" for="weight">Weight</label>
				<input type="number" id="weight" class="input" placeholder="Weight" />
			</fieldset>
		</div>
		<button class="close" use:melt={$close}><IcTwotoneClose /></button>
	</div>
{/if}

<style lang="postcss">
	.input {
		@apply flex h-8 w-full rounded-md border border-magnum-800 bg-transparent px-2.5 text-sm;
		@apply ring-offset-magnum-300 focus-visible:ring;
		@apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
		@apply flex-1 items-center justify-center;
		@apply px-2.5 text-sm leading-none text-magnum-700;
	}

	.trigger {
		@apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white p-0;
		@apply text-sm font-medium text-magnum-900 transition-colors hover:bg-white/90;
		@apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-magnum-900 transition-colors hover:bg-magnum-500/10;
		@apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}

	.content {
		@apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm;
	}
</style>
