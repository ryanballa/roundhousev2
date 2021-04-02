import { writable } from 'svelte/store';

const LOCOMOTIVES = [];

const { subscribe, set, update } = writable(LOCOMOTIVES);

const addLocomotive = locomotive => update(locomotives => {
    return [...locomotives, locomotive];
});

const addLocomotives = locomotives => update(() => {
    return locomotives;
});

const reset = () => {
    set(LOCOMOTIVES);
};

export default {
    subscribe,
    addLocomotives,
    addLocomotive,
    reset
}