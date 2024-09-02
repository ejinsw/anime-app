import { writable } from 'svelte/store';

export const allow_nsfw = writable<boolean | null>(false);
