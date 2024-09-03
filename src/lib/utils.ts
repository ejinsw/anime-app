export function DateToSeason(date: Date): string {
	const month = date.getMonth(); // getMonth() returns 0 for January, 1 for February, and so on.

	switch (month) {
		case 0: // January
		case 1: // February
		case 2: // March
			return 'winter';
		case 3: // April
		case 4: // May
		case 5: // June
			return 'spring';
		case 6: // July
		case 7: // August
		case 8: // September
			return 'summer';
		case 9: // October
		case 10: // November
		case 11: // December
			return 'fall';
		default:
			return ''; // In case of any unexpected value.
	}
}

export function mediaTypeFormatted(mediaType: string) {
	switch (mediaType) {
		case 'unknown':
			return '?';
		case 'tv':
			return 'TV Series';
		case 'ova':
			return 'OVA';
		case 'movie':
			return 'Movie';
		case 'special':
			return 'Special';
		case 'ona':
			return 'ONA';
		case 'music':
			return 'Music';
		case 'tv_special':
			return 'TV Special';
		default:
			return '?';
	}
}

export function ratingFormatted(rating: string) {
	switch (rating) {
		case 'g':
			return 'G';
		case 'pg':
			return 'PG';
		case 'pg_13':
			return 'PG-13';
		case 'r':
			return 'R';
		case 'r+':
			return 'R+';
		case 'rx':
			return 'R18';
		default:
			return '?';
	}
}

export function ratingStatusFormatted(status: string) {
	switch (status) {
		case 'finished_airing':
			return 'Finished Airing';
		case 'currently_airing':
			return 'Currently Airing';
		case 'not_yet_aired':
			return 'Not Yet Aired';
		default:
			return '?';
	}
}

export function listStatusFormatted(status: string) {
	switch (status) {
		case 'watching':
			return 'Watching';
		case 'completed':
			return 'Completed';
		case 'on_hold':
			return 'On Hold';
		case 'dropped':
			return 'Dropped';
		case 'plan_to_watch':
			return 'Plan to Watch';
		default:
			return '?';
	}
}

export function listStatusToColor(
	status: string,
	extension: 'text-' | 'bg-' = 'text-',
	hardness: 'soft' | 'hard' = 'hard'
) {
	switch (status) {
		case 'watching':
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-green-200'
					: 'bg-green-200'
				: extension === 'text-'
					? 'text-green-500'
					: 'bg-green-500';
		case 'completed':
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-blue-200'
					: 'bg-blue-200'
				: extension === 'text-'
					? 'text-blue-500'
					: 'bg-blue-500';
		case 'on_hold':
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-orange-200'
					: 'bg-orange-200'
				: extension === 'text-'
					? 'text-orange-500'
					: 'bg-orange-500';
		case 'dropped':
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-red-200'
					: 'bg-red-200'
				: extension === 'text-'
					? 'text-red-500'
					: 'bg-red-500';
		case 'plan_to_watch':
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-neutral-200'
					: 'bg-neutral-200'
				: extension === 'text-'
					? 'text-neutral-500'
					: 'bg-neutral-500';
		default:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-neutral-200'
					: 'bg-neutral-200'
				: extension === 'text-'
					? 'text-neutral-500'
					: 'bg-neutral-500';
	}
}

export function scoreToColor(
	score: number,
	extension: 'text-' | 'bg-' = 'text-',
	hardness: 'soft' | 'hard' = 'hard'
) {
	switch (score) {
		case 0:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-neutral-200'
					: 'bg-neutral-200'
				: extension === 'text-'
					? 'text-neutral-800'
					: 'bg-neutral-800';
		case 1:
		case 2:
		case 3:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-red-200'
					: 'bg-red-200'
				: extension === 'text-'
					? 'text-red-600'
					: 'bg-red-600';
		case 4:
		case 5:
		case 6:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-orange-200'
					: 'bg-orange-200'
				: extension === 'text-'
					? 'text-orange-600'
					: 'bg-orange-600';
		case 7:
		case 8:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-green-200'
					: 'bg-green-200'
				: extension === 'text-'
					? 'text-green-600'
					: 'bg-green-600';
		case 9:
		case 10:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-green-200'
					: 'bg-green-200'
				: extension === 'text-'
					? 'text-green-600'
					: 'bg-green-600';
		default:
			return hardness === 'soft'
				? extension === 'text-'
					? 'text-red-200'
					: 'bg-red-200'
				: extension === 'text-'
					? 'text-red-600'
					: 'bg-red-600';
	}
}
