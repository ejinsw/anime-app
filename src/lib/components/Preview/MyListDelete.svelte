<script lang="ts">
	import type { AnimeDetail, AnimeStatus } from '$lib/types';
	import clsx from 'clsx';

	import IcTwotoneDeleteOutline from '~icons/ic/twotone-delete-outline';

	export let anime: AnimeDetail;
	export let listStatus: AnimeStatus | null;

	async function handleDelete() {
		const res = await fetch(`/api/user/animelist/delete?id=${anime.id}`);
		if (!res.ok) {
			console.log("Couldn't delete title from account");
			return;
		}
		listStatus = null
	}
</script>

<button
	on:click|stopPropagation={handleDelete}
	class={clsx(
		`px-2 py-1 w-fit h-fit rounded-md flex items-center gap-1 bg-red-500 text-white`,
		$$props.class
	)}
>
	<IcTwotoneDeleteOutline />
</button>
