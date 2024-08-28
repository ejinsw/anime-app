<script lang="ts">
	import type { User } from '$lib/types';
	import FluentGridDots20Regular from '~icons/fluent/grid-dots-20-regular';
	import CarbonHome from '~icons/carbon/home';
	import CarbonExplore from '~icons/carbon/explore';
	import CarbonUserAvatar from '~icons/carbon/user-avatar';

	export let user: User | null;

	let active = 'home';
	let isCollapsed = false;

	function toggleNavbar() {
		isCollapsed = !isCollapsed;
	}

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
</script>

<div
	class={`z-50 flex justify-center items-center text-lg fixed bottom-6 left-1/2 transform -translate-x-1/2 border border-[#1c1c1c] bg-[#111111] bg-opacity-90 backdrop-blur-lg backdrop-saturate-150 rounded-full px-4 py-2 shadow-xl transition-all duration-300 ease-in-out w-fit`}
>
	<div class={`flex gap-6 text-white transition-opacity duration-300 ease-in-out w-fit`}>
		{#each paths as route}
			<a
			on:click={() => (active = route.title)}
				href={route.path}
				class={`flex items-center justify-center px-4 py-2 rounded-full w-fit transition-all ${active === route.title ? 'bg-neutral-700/80 border border-neutral-600' : ''}`}
			>
				<svelte:component this={route.icon}/>
			</a>
		{/each}
	</div>

	<div class="ml-12 flex items-center justify-center w-fit">
		<button
			type="button"
			class="flex items-center justify-center p-2 rounded-full bg-neutral-700/80 border border-neutral-600 hover:bg-neutral-500 transition-all"
			on:click={toggleNavbar}
		>
			<FluentGridDots20Regular class="text-sm" />
		</button>
	</div>
</div>
