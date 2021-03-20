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
    async userPost(doc, token) {
        try {
            this.response = await fetch(`${apiURL}api/user/`, {
                method: "post",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const user = await this.response.json();
            return user;
        } catch (e) {
            return e;
        }
    }
    async usersGet(clubId) {
        try {
            this.response = await fetch(`${apiURL}api/users/${clubId}`, {
                method: "GET",
            });
            const users = await this.response.json();
            return users;
        } catch (e) {
            return e;
        }
    }
    async clubsGet() {
        try {
            this.response = await fetch(`${apiURL}api/clubs`, {
                method: "GET",
            });
            const clubs = await this.response.json();
            return clubs;
        } catch (e) {
            return e;
        }
    }
    async locomotivesGet(token) {
        try {
            this.response = await fetch(`${apiURL}api/locomotives`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const locomotives = await this.response.json();
            return locomotives;
        } catch (e) {
            return e;
        }
    }
    async locomotivePost(doc, token) {
        try {
            this.response = await fetch(`${apiURL}api/locomotives`, {
                method: "post",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const locomotive = await this.response.json();
            return locomotive;
        } catch (e) {
            return e;
        }
    }
    async locomotiveDelete(locomotiveId, token) {
        try {
            this.response = await fetch(`${apiURL}api/locomotives/${locomotiveId}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const locomotive = await this.response.json();
            return locomotive;
        } catch (e) {
            return e;
        }
    }
    async cabsGet(clubId, token) {
        try {
            this.response = await fetch(`${apiURL}api/cabs/${clubId}`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const cabs = await this.response.json();
            return cabs;
        } catch (e) {
            return e;
        }
    }
    async cabPost(doc, token) {
        try {
            this.response = await fetch(`${apiURL}api/cab`, {
                method: "post",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const cab = await this.response.json();
            return cab;
        } catch (e) {
            return e;
        }
    }
    async cabsDelete(cabId, token) {
        try {
            this.response = await fetch(`${apiURL}api/cabs/${cabId}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const cab = await this.response.json();
            return cab;
        } catch (e) {
            return e;
        }
    }
    async consistsGet(clubId, token) {
        try {
            this.response = await fetch(`${apiURL}api/consists/${clubId}`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const consists = await this.response.json();
            return consists;
        } catch (e) {
            return e;
        }
    }
    async consistPost(doc, token) {
        try {
            this.response = await fetch(`${apiURL}api/consist`, {
                method: "post",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const consist = await this.response.json();
            return consist;
        } catch (e) {
            return e;
        }
    }
    async consistsDelete(consistId, token) {
        try {
            this.response = await fetch(`${apiURL}api/consists/${consistId}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const consist = await this.response.json();
            return consist;
        } catch (e) {
            return e;
        }
    }
    async scheduleGet(clubId, token) {
        try {
            this.response = await fetch(`${apiURL}api/schedule/${clubId}`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const schedule = await this.response.json();
            return schedule;
        } catch (e) {
            return e;
        }
    }
    async scheduleGetUsersByDate(clubId, token, date) {
        try {
            this.response = await fetch(`${apiURL}api/schedule/${clubId}/users/${date}`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const scheduleByUser = await this.response.json();
            return scheduleByUser;
        } catch (e) {
            return e;
        }
    }
    async schedulePost(doc, token) {
        try {
            this.response = await fetch(`${apiURL}api/schedule`, {
                method: "post",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const schedule = await this.response.json();
            return schedule;
        } catch (e) {
            return e;
        }
    }
    async scheduleDelete(scheduleId, token) {
        try {
            this.response = await fetch(`${apiURL}api/schedule/${scheduleId}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const schedule = await this.response.json();
            return schedule;
        } catch (e) {
            return e;
        }
    }
}

const apiService = new api();

export default apiService;