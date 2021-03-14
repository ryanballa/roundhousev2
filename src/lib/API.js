import auth from '../utils/auth';

const apiURL = "https://sandingtowerapi.herokuapp.com/";

class api {
    async userGet(email) {
        let auth0Client
        try {
            auth0Client = await auth.createClient();
            auth0Client
                .getTokenSilently()
                .then(accessToken => {
                    console.log(accessToken);
                }).catch(e => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
        try {
            this.response = await fetch(`${apiURL}api/user/ryan@ryanballa.com`);
            const user = await this.response.json();
            return user[0];
        } catch (e) {
            return e;
        }
    }
}

const apiService = new api();

export default apiService;