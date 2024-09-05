<script lang="ts">
	import LoginButton from '$lib/components/LoginButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { User } from '$lib/types';
	import ProfileSelect from './ProfileSelect.svelte';

	export let user: User | null = null;

	let showSearch = false;
</script>

<header
	class="w-full h-16 bg-[#1c1c1c] shadow-lg top-0 z-50 fixed flex items-center px-4 py-4 box-border"
>
	{#if !showSearch}
		<a href="/" class="w-fit h-full shrink-0 flex items-end gap-2"
			><img src="/favicon.png" alt="Favicon" class="w-12 h-12" />
			<span class="text-3xl font-sans hidden lg:block">AniLink</span>
		</a>
	{/if}
	<SearchBar {user} bind:showSearch />

	{#if !showSearch}
		{#if !user}
			<LoginButton class="ml-auto" />
		{:else}
			<ProfileSelect class="ml-auto" profile={user} />
		{/if}
	{/if}
</header>
