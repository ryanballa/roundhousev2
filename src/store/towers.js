import { writable } from 'svelte/store';

const TOWERS = { towers: [], };

const { subscribe, set, update } = writable(TOWERS);

const addTowers = clubs => update(() => {
    return clubs;
});

const reset = () => {
    set(TOWERS);
};

export default {
    subscribe,
    addTowers,
    reset
}