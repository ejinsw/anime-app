<script lang="ts">
	import type { User } from '$lib/types';
	import { createPopover, melt } from '@melt-ui/svelte';
	import OutClick from 'svelte-outclick';
	import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded';
	import MaterialSymbolsLightLogoutRounded from '~icons/material-symbols-light/logout-rounded';
    import MaterialSymbolsSettingsOutlineRounded from '~icons/material-symbols/settings-outline-rounded'
    import CarbonUserAvatar from '~icons/carbon/user-avatar';
	import clsx from 'clsx';

	export let profile: User;

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: {
			placement: 'bottom-end'
		}
	});

	let button: HTMLElement;
	let pane: HTMLElement;
</script>

<OutClick
	on:outclick={() => {
		$open = false;
	}}
	excludeElements={[button, pane]}
/>

<button
	bind:this={button}
	class={clsx("flex h-10 w-40 shrink-0 items-center justify-between gap-1 rounded-lg bg-neutral-800 px-2 py-2 text-white shadow-md transition-opacity hover:opacity-90 focus:outline-none", $$props.class)}
	use:melt={$trigger}
	aria-label="Category Selector"
>
	<img
		src={profile.picture ?? 'https://www.gravatar.com/avatar/HASH?s=200&d=mp'}
		alt="Profile"
		class="h-7 w-7 rounded-md"
	/>
	<div class="tracking-tighter">
		{#if profile.name && profile.name.length > 8}
			{profile.name.substring(0, 8)}...
		{:else}
			{profile.name}
		{/if}
	</div>
	<div class="flex items-center">
		<MaterialSymbolsKeyboardArrowDownRounded class="" />
	</div>
</button>

{#if $open}
	<div
		bind:this={pane}
		use:melt={$content}
		class="flex flex-col z-10 w-40 rounded-lg bg-neutral-800 p-4 text-lg gap-2"
	>
		<div use:melt={$arrow} />
		<a class="flex items-center gap-2 text-neutral-500 hover:text-neutral-400" href="/profile"><CarbonUserAvatar/>Profile</a>
		<a class="flex items-center gap-2 text-neutral-500 hover:text-neutral-400" href="/settings"><MaterialSymbolsSettingsOutlineRounded/>Settings</a>
		<a class="flex items-center gap-2 text-red-500 hover:text-red-400" href="/logout"
			><MaterialSymbolsLightLogoutRounded />Logout</a
		>
	</div>
{/if}
