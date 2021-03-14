
const apiURL = "https://sandingtowerapi.herokuapp.com/";

class api {
    async userGet(email) {
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