// Combines commonly used states into one
import { derived } from 'svelte/store';
import { user } from '../store/user';
import clubs from '../store/clubs';

const conditionalStores = derived([user, clubs], ($combined) => { return { user: $combined[0], club: $combined[1] } });

export default conditionalStores;