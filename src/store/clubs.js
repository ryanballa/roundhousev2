import { writable } from 'svelte/store';

const CLUBS = [];

const { subscribe, set, update } = writable(CLUBS);

const addClubs = clubs => update(() => {
    return clubs;
});

const reset = () => {
    set(CLUBS);
};

export default {
    subscribe,
    addClubs,
    reset
}