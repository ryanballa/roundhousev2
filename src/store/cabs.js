import { writable } from 'svelte/store';

const CABS = [];

const { subscribe, set, update } = writable(CABS);

const addCab = cab => update(cabs => {
    return [...cabs, cab];
});

const addCabs = cabs => update(() => {
    return cabs;
});

const reset = () => {
    set(CABS);
};

export default {
    subscribe,
    addCabs,
    addCab,
    reset
}