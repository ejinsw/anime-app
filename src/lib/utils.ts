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
			return 'TV';
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

export function scoreToColor(score: number) {
	switch (score) {
		case 1:
		case 2:
		case 3:
			return 'text-red-500';
		case 4:
		case 5:
		case 6:
			return 'text-orange-400';
		case 7:
		case 8:
			return 'text-green-400';
		case 9:
		case 10:
			return 'text-green-500';
		default:
			return 'text-red-400';
	}
}
