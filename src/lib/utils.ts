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
		case 'r+':
		case 'rx':
			return 'R18';
		default:
			return '?';
	}
}

export function statusFormatted(status: string) {
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

export function scoreToColor(score: number, extension: string = 'text-') {
	switch (score) {
		case 1:
		case 2:
		case 3:
			return extension + 'red-500';
		case 4:
		case 5:
		case 6:
			return extension + 'orange-400';
		case 7:
		case 8:
			return extension + 'green-400';
		case 9:
		case 10:
			return extension + 'green-500';
		default:
			return extension + 'red-400';
	}
}
