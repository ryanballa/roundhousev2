const { SNOWPACK_PUBLIC_LOGGED_IN_USER_ID } = import.meta.env;
const apiURL = SNOWPACK_PUBLIC_LOGGED_IN_USER_ID ? "http://localhost:4000/" : "https://sandingtowerapi.herokuapp.com/";

class api {
    async userGet(email, token) {
        try {
            this.response = await fetch(`${apiURL}api/user/${email}`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const user = await this.response.json();
            return { _id: user[0]._id, email: user[0].email, name: user[0].name, profile: user[0].profiles[0] };
        } catch (e) {
            return e;
        }
    }
}

const apiService = new api();

export default apiService;