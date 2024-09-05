<script lang="ts">
	import LoginButton from '$lib/components/LoginButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { User } from '$lib/types';
	import ProfileSelect from './ProfileSelect.svelte';

	export let user: User | null = null;
</script>

<header
	class="w-full h-16 bg-[#1c1c1c] shadow-lg top-0 z-50 fixed flex items-center p-2 box-border"
>
	<a href="/" class="w-fit h-full flex items-end gap-2 mx-8"
		><img src="/favicon.png" alt="Favicon" class="w-fit h-full" />
		<span class="text-3xl font-sans">AniLink</span>
	</a>
	<SearchBar {user} />

	
	{#if !user}
		<LoginButton class="ml-auto" />
	{:else}
		<ProfileSelect profile={user}/>
	{/if}
</header>
