import { navigate } from 'svelte-navigator';
import createAuth0Client from '@auth0/auth0-spa-js';
import clubs from '../store/clubs';
import { user, isAuthenticated, isUserLoading } from '../store/user';
import config from '../lib/authConfig';
import apiService from '../lib/API';
import { Magic } from 'magic-sdk';

const m = new Magic('pk_live_0A88D3AFB56EDE91'); // ✨
const {
  SNOWPACK_PUBLIC_LOGGED_IN_USER_ID,
  SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
  SNOWPACK_PUBLIC_LOGGED_IN_USER_NAME,
  SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
  SNOWPACK_PUBLIC_CLUB_ID,
} = import.meta.env;

let auth0Client;
let usersReq = null;
let accessToken = null;

const createClient = async () => {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });

  const params = new URLSearchParams(window.location.search);

  if (params.has('error')) {
    window.history.replaceState({}, document.title, '/login');
    console.log(`Error: ${params.get('error_description')}`);
    // authError.set(new Error(params.get('error_description')));
  }

  if (params.has('code')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
    // authError.set(null);
    const authUser = await auth0Client.getUser();
    const token = await auth0Client.getIdTokenClaims();
    isAuthenticated.set(true);
  }

  return auth0Client;
};

const loginWithRedirect = async ({ selectedEmail }) => {
  const magicUser = await m.auth.loginWithMagicLink({ email: selectedEmail });
  setAuthUser({ email: selectedEmail }, magicUser);
};

const fetchUser = async function (email, token) {
  try {
    usersReq = await apiService.userGet(email, token);
  } catch (e) {
    console.log(`Fetch User Error: ${e}`);
  }
};

const setAuthUser = async (authUser, token) => {
  usersReq = await apiService.userGet(authUser.email, token);
  if (!usersReq._id) {
    user.set({
      email: authUser.email,
      token: token,
    });
    navigate('/user/add');
  } else if (!usersReq.profile) {
    user.set({ ...usersReq, token: token });
    navigate('/profile/add');
  } else if (usersReq) {
    user.set({
      ...usersReq,
      _id: usersReq._id,
      email: usersReq.email,
      name: usersReq.name,
      token,
      isAdmin: usersReq.isAdmin,
    });
    clubs.addClubs({ _id: usersReq.clubs[0]._id });
    isAuthenticated.set(true);
    navigate('/');
  } else if (!usersReq) {
    navigate('/login');
  }
  isUserLoading.set(false);
};

const checkAuthUser = async () => {
  // In DEV we load the user from settings
  if (SNOWPACK_PUBLIC_LOGGED_IN_USER_ID) {
    isAuthenticated.set(true);
    user.set({
      ...usersReq,
      _id: SNOWPACK_PUBLIC_LOGGED_IN_USER_ID,
      email: SNOWPACK_PUBLIC_LOGGED_IN_USER_EMAIL,
      name: SNOWPACK_PUBLIC_LOGGED_IN_USER_NAME,
      token: SNOWPACK_PUBLIC_LOGGED_IN_USER_TOKEN,
      isAdmin: true,
    });
    clubs.addClubs({ _id: SNOWPACK_PUBLIC_CLUB_ID });
    isUserLoading.set(false);
  } else {
    if (window.location.pathname !== '/login') {
      isAuthenticated.subscribe((isLoggedIn) => {
        if (isLoggedIn && authUser && token.__raw) {
          if (!user._id) {
            setAuthUser(authUser, token.__raw);
          }
        } else {
          isUserLoading.set(false);
          navigate('/');
        }
      });
    }
  }
};

function handleLogin() {
  navigate('/login');
}

const handleLogout = async () => {
  await m.user.logout();
  isAuthenticated.set(false);
  navigate('/login');
};

const auth = {
  loginWithRedirect,
  handleLogin,
  handleLogout,
  setAuthUser,
  checkAuthUser,
};

export default auth;
