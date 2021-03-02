import { writable } from 'svelte/store';

const USER = {};

const { subscribe, set, update } = writable(USER);

const addUser = user => update(() => {
    return { user };
});

const reset = () => {
    set(USER);
};

export default {
    subscribe,
    addUser,
    reset
}