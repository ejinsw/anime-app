export interface MainPicture {
	medium: string;
	large: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface AnimeSeason {
	year: number;
	season: string;
}

export interface AnimeStatus {
	status: string;
	score: number;
	num_episodes_watched: number;
	is_rewatching: boolean;
	start_date?: string | null;
	finish_date?: string | null;
	priority: number;
	num_times_rewatched: number;
	rewatch_value: number;
	tags: string[];
	comments: string[];
	updated_at: string;
}

export interface AlternativeTitles {
	synonyms?: string[];
	en?: string;
	ja?: string;
}

export interface Broadcast {
	day_of_the_week?: string;
	start_time?: string;
}

export interface Picture {
	medium: string;
	large: string;
}


export interface RelatedAnime {
	node: AnimeDetail;
	relation_type: string;
	relation_type_formatted?: string;
}

export interface RelatedManga {
	node: MangaDetail;
	relation_type: string;
	relation_type_formatted?: string;
}

export interface RecommendationNode {
	id: number;
	title: string;
	main_picture?: MainPicture;
}

export interface Recommendation {
	node: RecommendationNode;
	num_recommendations: number;
}

export interface Studio {
	id: number;
	name: string;
}

export interface StatisticsStatus {
	watching?: string;
	completed?: string;
	on_hold?: string;
	dropped?: string;
	plan_to_watch?: string;
}

export interface Statistics {
	status?: StatisticsStatus;
	num_list_users: number;
}

export interface AnimeDetail {
	id: number;
	title: string;
	main_picture?: MainPicture | null;
	alternative_titles?: AlternativeTitles | null;
	start_date?: string | null;
	end_date?: string | null;
	synopsis?: string | null;
	mean?: number | null;
	rank?: number | null;
	popularity?: number | null;
	num_list_users?: number | null;
	num_scoring_users?: number | null;
	nsfw?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	media_type?: string | null;
	status?: string | null;
	genres?: Genre[];
	my_list_status?: AnimeStatus | null;
	num_episodes?: number | null;
	start_season?: AnimeSeason | null;
	broadcast?: Broadcast | null;
	source?: string | null;
	average_episode_duration?: number | null;
	rating?: string | null;
	pictures?: Picture[];
	background?: string | null;
	related_anime?: RelatedAnime[];
	related_manga?: RelatedManga[];
	recommendations?: Recommendation[];
	studios?: Studio[];
	statistics?: Statistics;
}

export interface MainPicture {
	medium: string;
	large: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface AlternativeTitles {
	synonyms?: string[];
	en?: string;
	ja?: string;
}

export interface PersonRoleEdge {
	id: number;
	name: string;
	role: string;
}

export interface MangaStatus {
	status: string;
	score: number;
	num_chapters_read: number;
	is_rereading: boolean;
	updated_at: string;
}

export interface MangaDetail {
	id: number;
	title: string;
	main_picture?: MainPicture | null;
	alternative_titles?: AlternativeTitles | null;
	start_date?: string | null;
	end_date?: string | null;
	synopsis?: string | null;
	mean?: number | null;
	rank?: number | null;
	popularity?: number | null;
	num_list_users: number;
	num_scoring_users: number;
	nsfw?: string | null;
	created_at: string;
	updated_at: string;
	media_type: string;
	status: string;
	genres?: Genre[];
	my_list_status?: MangaStatus | null;
	num_volumes: number;
	num_chapters: number;
	authors?: PersonRoleEdge[];
}

export interface User {
	picture: string;
	id: number;
	name: string;
	location: string;
	joined_at: string;
	anime_statistics: AnimeStatistics;
}

export interface AnimeStatistics {
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

export interface ListStatus