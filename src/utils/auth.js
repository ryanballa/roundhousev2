import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../store/user";
import config from "../lib/authConfig";
import apiService from '../lib/API';

let usersReq = null;

async function createClient() {
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
    }

    return auth0Client;
}

const fetchUser = async function (email, token) {
    try {
        usersReq = await apiService.userGet(email, token);
        user.set(usersReq[0]);
    } catch (e) {
        console.log(`Error: ${e}`);
    }
};

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithRedirect({
            redirect_uri: window.location.origin,
            prompt: 'login' // Force login prompt. No silence auth for you!
        });
        const theUser = await client.getUser();
        const accessToken = await auth0Client.getIdTokenClaims();
        accessToken = accessToken.__raw;
        await fetchUser(theUser.email, accessToken);
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout({
        returnTo: window.location.origin,
    });
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;