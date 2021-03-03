import { writable } from 'svelte/store';

const CONSISTS = [];

const { subscribe, set, update } = writable(CONSISTS);

const addConsist = consist => update(consists => {
    return [...consists, consist];
});

const addConsists = consists => update(() => {
    return consists;
});

const reset = () => {
    set(CONSISTS);
};

export default {
    subscribe,
    addConsists,
    addConsist,
    reset
}