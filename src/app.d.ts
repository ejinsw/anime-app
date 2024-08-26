// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import '@sveltejs/kit';
import 'unplugin-icons/types/svelte';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface User {
	id: number;
	name: string;
	location: string;
	joined_at: string;
	anime_statistics: AnimeStatistics;
}

interface AnimeStatistics {
	num_items_watching: number;
	num_items_completed: number;
	num_items_on_hold: number;
	num_items_dropped: number;
	num_items_plan_to_watch: number;
	num_items: number;
	num_days_watched: number;
	num_days_watching: number;
	num_days_completed: number;
	num_days_on_hold: number;
	num_days_dropped: number;
	num_days: number;
	num_episodes: number;
	num_times_rewatched: number;
	mean_score: number;
}

export {};
