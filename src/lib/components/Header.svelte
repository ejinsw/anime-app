<script lang="ts">
	import LoginButton from '$lib/components/LoginButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { User } from '$lib/types';

	export let user: User | null = null;
</script>

<header
	class="w-full h-16 bg-[#1c1c1c] shadow-lg top-0 z-50 fixed flex items-center p-2 box-border"
>
	<SearchBar {user} />
	{#if !user}
		<LoginButton class="ml-auto" />
	{:else}
		<div>{user.name}</div>
	{/if}
</header>
