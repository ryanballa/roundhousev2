import { writable } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable({ clubs: [] });
export const popupOpen = writable(false);
export const error = writable();

export default {
    isAuthenticated,
    user
}