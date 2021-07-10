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
            return { _id: user._id, email: user.email, name: user.name, clubs: user.membership, profile: user.profiles[0], isAdmin: user.isAdmin };
        } catch (e) {
            console.log(e);
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
    async usersGet(clubId, token) {
        try {
            this.response = await fetch(`${apiURL}api/users/${clubId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
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
    async profilePost(doc, token) {
        try {
            this.response = await fetch(`${apiURL}api/profile`, {
                method: "post",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const profile = await this.response.json();
            return profile;
        } catch (e) {
            return e;
        }
    }
    async changelogGet() {
        try {
            this.response = await fetch(`${apiURL}api/changelog`, {
                method: "GET",
            });
            const changelog = await this.response.json();
            return changelog;
        } catch (e) {
            return e;
        }
    }
    async towersGet(token, clubId) {
        try {
            this.response = await fetch(`${apiURL}api/towers/${clubId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const towers = await this.response.json();
            return towers;
        } catch (e) {
            return e;
        }
    }
    async issuesGet(token, clubId) {
        try {
            this.response = await fetch(`${apiURL}api/issues/${clubId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const issues = await this.response.json();
            return issues;
        } catch (e) {
            return e;
        }
    }
    async issueClose(doc, token) {
        const updatedIssue = { ...doc };
        updatedIssue.status = "Complete";
        try {
            this.response = await fetch(`${apiURL}api/issue/${doc._id}`, {
                method: "POST",
                body: JSON.stringify(updatedIssue),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const issue = await this.response.json();
            return issue;
        } catch (e) {
            return e;
        }
    }
    async issuesPost(doc, token, clubId) {
        try {
            this.response = await fetch(`${apiURL}api/issues/${clubId}`, {
                method: "POST",
                body: JSON.stringify(doc),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const issue = await this.response.json();
            return issue;
        } catch (e) {
            return e;
        }
    }
    async issueDelete(issueId, token) {
        try {
            this.response = await fetch(`${apiURL}api/issue/${issueId}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: 'Bearer ' + token,
                }
            });
            const issue = await this.response.json();
            return issue;
        } catch (e) {
            return e;
        }
    }
}

const apiService = new api();

export default apiService;