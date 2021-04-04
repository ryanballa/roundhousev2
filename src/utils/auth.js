import { navigate } from 'svelte-navigator';
import createAuth0Client from "@auth0/auth0-spa-js";
import clubs from '../store/clubs';
import { user, isAuthenticated, popupOpen } from "../store/user";
import config from "../lib/authConfig";
import apiService from '../lib/API';

const {
    SNOWPACK_PUBLIC_LOGGED_IN_USER_ID,
    SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
    SNOWPACK_PUBLIC_LOGGED_IN_USER_NAME,
    SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
} = import.meta.env;

let auth0Client;
let usersReq = null;
let accessToken = null;

const createClient = async () => {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    });

    const params = new URLSearchParams(window.location.search);

    if (params.has('error')) {
        window.history.replaceState({}, document.title, '/login');
        console.log(`Error: ${params.get('error_description')}`)
        // authError.set(new Error(params.get('error_description')));
    }

    if (params.has('code')) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, '/');
        // authError.set(null);
        const authUser = await auth0Client.getUser();
        const token = await auth0Client.getIdTokenClaims();
        isAuthenticated.set(true);
        setAuthUser(authUser, token);
    }

    return auth0Client;
}

const loginWithRedirect = async (options) => {
    try {
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin,
            prompt: 'login' // Force login prompt. No silence auth for you!
        });
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    }
}

const fetchUser = async function (email, token) {
    try {
        usersReq = await apiService.userGet(email, token);
    } catch (e) {
        console.log(`Fetch User Error: ${e}`);
    }
};

const setAuthUser = async (authUser, accessToken) => {
    await fetchUser(authUser.email, accessToken);
    clubs.addClubs({ _id: usersReq.clubs[0]._id });
    if (!usersReq._id) {
        user.set({
            email: authUser.email,
        });
        navigate('/user/add');
    } else if (!usersReq.profile) {
        user.set(usersReq);
        navigate('/profile/add');
    } else {
        user.set({ ...usersReq, token: accessToken });
    }
}

const checkAuthUser = async () => {
    auth0Client = await createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());

    const authUser = await auth0Client.getUser();

    // In DEV we load the user from settings
    if (SNOWPACK_PUBLIC_LOGGED_IN_USER_ID) {
        isAuthenticated.set(true);
        await fetchUser(
            SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
            SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
        );
        user.set({
            _id: SNOWPACK_PUBLIC_LOGGED_IN_USER_ID,
            email: SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
            name: SNOWPACK_PUBLIC_LOGGED_IN_USER_NAME,
            token: SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
            ...usersReq,
        });
        // setFontSize({ fontSize: 1 });
        clubs.addClubs({ _id: usersReq.clubs[0]._id });
    } else {
        isAuthenticated.subscribe(isLoggedIn => {
            if (isLoggedIn && authUser) {
                if (!user._id) {
                    setAuthUser(authUser);
                }
            } else {
                navigate('/');
            }
        });
    }
}

function handleLogin() {
    loginWithRedirect();
}

function handleLogout() {
    return auth0Client.logout({
        returnTo: 'https://locomotivehouse.com',
    });
}

const auth = {
    loginWithRedirect,
    handleLogin,
    handleLogout,
    setAuthUser,
    checkAuthUser
};

export default auth;