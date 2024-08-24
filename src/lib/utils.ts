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
