<script lang="ts">
	import type { AnimePreview } from '$lib/types';

	export let anime: AnimePreview;
	export let size: 'sm' | 'md' | 'lg' = 'sm'; // Default size is 'md'

	let sizeClasses = {
		sm: 'min-w-24 min-h-24',
		md: 'min-w-36 min-h-36',
		lg: 'min-w-48 min-h-48'
	};
</script>

<div
	class={`group relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-inner hover:rounded-md transition-all duration-300`}
>
	<img
		src={anime.node.main_picture.medium}
		alt={anime.node.title}
		class="w-full h-full object-cover"
	/>
	<div
		class="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50
    text-white text-center p-2 tracking-tighter leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none"
	>
		{anime.node.title}
	</div>
	<span
		class="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full invisible group-hover:visible transition-all duration-100"
	></span>
</div>
