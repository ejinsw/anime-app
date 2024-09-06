<script lang="ts">
	import type { User } from '$lib/types';
	import FluentGridDots20Regular from '~icons/fluent/grid-dots-20-regular';
	import CarbonHome from '~icons/carbon/home';
	import CarbonExplore from '~icons/carbon/explore';
	import CarbonUserAvatar from '~icons/carbon/user-avatar';
	import { createPopover, createSwitch, melt } from '@melt-ui/svelte';

	import IcRoundKeyboardArrowRight from '~icons/ic/round-keyboard-arrow-right';
	import IcRoundKeyboardArrowLeft from '~icons/ic/round-keyboard-arrow-left';

	import OutClick from 'svelte-outclick';
	import { allow_nsfw } from '$lib/stores/stores';
	import { page } from '$app/stores';

	export let user: User | null;

	let button: HTMLElement, pane: HTMLElement;

	$: active = $page.url.pathname;

	let isOpen = false;

	const paths = [
		{
			title: 'home',
			icon: CarbonHome,
			path: '/'
		},
		{
			title: 'explore',
			icon: CarbonExplore,
			path: '/anime'
		},
		{
			title: 'profile',
			icon: CarbonUserAvatar,
			path: !user ? '/login' : '/profile'
		}
	];

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: {
			placement: 'top'
		},
		preventScroll: true
	});

	const {
		elements: { root, input },
		states: { checked }
	} = createSwitch({
		checked: allow_nsfw,
		onCheckedChange: ({ curr, next }) => {
			$allow_nsfw = next;
			return next;
		}
	});
</script>

<OutClick
	on:outclick={() => {
		$open = false;
	}}
	excludeElements={[button, pane]}
/>

<div
	class={`z-50 flex justify-center items-center text-lg fixed  transform -translate-x-1/2 
	border border-[#1c1c1c] bg-[#111111] bg-opacity-90 backdrop-blur-lg backdrop-saturate-150 
	rounded-full px-4 py-2 shadow-xl transition-all duration-300 ease-in-out w-fit ${isOpen ? 'bottom-6 left-1/2' : 'bottom-6 left-0'}`}
>
	{#if isOpen}
		<button on:click={() => (isOpen = false)} class=""><IcRoundKeyboardArrowLeft /></button>
		<div class={`flex gap-6 text-white transition-opacity duration-300 ease-in-out w-fit`}>
			{#each paths as route}
				<a
					href={route.path}
					class={`flex items-center justify-center px-4 py-2 rounded-full w-fit transition-all ${active === route.path ? 'bg-neutral-700/80 border border-neutral-600' : ''}`}
				>
					<svelte:component this={route.icon} />
				</a>
			{/each}
		</div>

		<div class="ml-12 flex items-center justify-center w-fit">
			<button
				bind:this={button}
				use:melt={$trigger}
				type="button"
				class="flex items-center justify-center p-2 rounded-full bg-neutral-700/80 border border-neutral-600 hover:bg-neutral-500 transition-all"
			>
				<FluentGridDots20Regular class="text-sm" />
			</button>
		</div>
	{:else}
		<button on:click={() => (isOpen = true)} class="ml-8"><IcRoundKeyboardArrowRight /></button>
	{/if}
</div>

{#if $open}
	<div
		bind:this={pane}
		use:melt={$content}
		class="flex flex-col z-10 rounded-lg bg-[#1c1c1c] w-fit shadow-lg bg-opacity-80 backdrop-blur-lg backdrop-saturate-150 p-4 text-sm text-neutral-400"
	>
		<div use:melt={$arrow} />
		<div class="flex items-center gap-2">
			<span>NSFW</span>
			<button
				use:melt={$root}
				class="relative h-6 w-12 cursor-pointer rounded-full transition-colors {$checked
					? 'bg-green-500'
					: 'bg-neutral-700'}"
				aria-checked={$checked}
				role="switch"
			>
				<span
					class="absolute left-0 top-0.5 w-5 h-5 bg-white rounded-full transition-transform transform {$checked
						? 'translate-x-6'
						: ''}"
				/>
			</button>
			<input type="checkbox" use:melt={$input} class="hidden" />
		</div>
	</div>
{/if}
