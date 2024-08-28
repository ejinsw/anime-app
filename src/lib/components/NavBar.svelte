<script lang="ts">
	import type { User } from '$lib/types';
	import FluentGridDots20Regular from '~icons/fluent/grid-dots-20-regular';
	import MdiHome from '~icons/mdi/home';

	export let user: User;

	let active = 'home';
	let isCollapsed = false;

	function toggleNavbar() {
		isCollapsed = !isCollapsed;
	}
</script>

<div
	class={`z-50 flex justify-center items-center text-xs fixed bottom-6 left-1/2 transform -translate-x-1/2 border border-[#1c1c1c] bg-[#111111] bg-opacity-90 backdrop-blur-lg backdrop-saturate-150 rounded-full px-4 py-2 shadow-xl transition-all duration-300 ease-in-out w-fit`}
>
	<div class={`flex gap-6 text-white transition-opacity duration-300 ease-in-out w-fit`}>
		<a
			href="/"
			class={`flex items-center justify-center px-4 py-2 rounded-full w-fit transition-all ${active === 'home' ? 'bg-neutral-700/80 border border-neutral-600' : ''}`}
			on:click={() => (active = 'home')}
		>
			Home
		</a>
		<button
			class={`flex items-center justify-center px-4 py-2 rounded-full w-fit transition-all ${active === 'posts' ? 'bg-neutral-700/80 border border-neutral-600' : ''}`}
			on:click={() => (active = 'posts')}
		>
			Explore
		</button>
		<button
			class={`flex items-center justify-center px-4 py-2 rounded-full w-fit transition-all ${active === 'about' ? 'bg-neutral-700/80 border border-neutral-600' : ''}`}
			on:click={() => (active = 'about')}
		>
			Profile
		</button>
	</div>

	<div class="ml-12 flex items-center justify-center w-fit">
		<button
			type="button"
			class="flex items-center justify-center p-2 rounded-full bg-neutral-700/80 border border-neutral-600 hover:bg-neutral-500 transition-all"
			on:click={toggleNavbar}
		>
			<FluentGridDots20Regular />
		</button>
	</div>
</div>
