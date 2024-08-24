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
	updated_at: string;
}

export interface AnimePreview {
	node: {
		id: number;
		title: string;
		main_picture: MainPicture;
	};
}

export interface AlternativeTitles {
	synonyms: string[];
	en: string;
	ja: string;
}

export interface Broadcast {
	day_of_the_week: string;
	start_time: string;
}

export interface Picture {
	medium: string;
	large: string;
}

export interface RelatedAnimeNode {
	id: number;
	title: string;
	main_picture: MainPicture;
}

export interface RelatedAnime {
	node: RelatedAnimeNode;
	relation_type: string;
	relation_type_formatted: string;
}

export interface RecommendationNode {
	id: number;
	title: string;
	main_picture: MainPicture;
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
	watching: string;
	completed: string;
	on_hold: string;
	dropped: string;
	plan_to_watch: string;
}

export interface Statistics {
	status: StatisticsStatus;
	num_list_users: number;
}

export interface AnimeDetails {
	id: number;
	title: string;
	main_picture: MainPicture;
	alternative_titles: AlternativeTitles;
	start_date: string;
	end_date: string;
	synopsis: string;
	mean: number;
	rank: number;
	popularity: number;
	num_list_users: number;
	num_scoring_users: number;
	nsfw: string;
	created_at: string;
	updated_at: string;
	media_type: string;
	status: string;
	genres: Genre[];
	my_list_status: AnimeStatus;
	num_episodes: number;
	start_season: AnimeSeason;
	broadcast: Broadcast;
	source: string;
	average_episode_duration: number;
	rating: string;
	pictures: Picture[];
	background: string;
	related_anime: RelatedAnime[];
	related_manga: any[]; // Left as 'any[]' since related_manga is empty in your example
	recommendations: Recommendation[];
	studios: Studio[];
	statistics: Statistics;
}
