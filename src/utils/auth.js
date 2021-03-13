import createAuth0Client from "@auth0/auth0-spa-js";
import sanity from '../lib/sanity';
import { user, isAuthenticated, popupOpen } from "../store/user";
import config from "../lib/authConfig";

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

const fetchUser = async function (email) {
    const query = `*[_type == 'user' && email == '${email}']{ _id, name, email }`;
    try {
        usersReq = await sanity.fetch(query);
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
        await fetchUser(theUser.email)
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;