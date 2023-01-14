class MainApi {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers
    }
  
    _handleResponse(res) {
        return (res.ok) ? (res.json()) : (Promise.reject(`Ошибка: ${res.status}`))
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
    })
        .then(this._handleResponse)
    };

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        .then(this._handleResponse)
    };
      
    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "no-cors",
            /* credentials: 'include', */
        })
        .then(this._handleResponse)
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(this._handleResponse)
    }
  
    changeUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, email })
        })
        .then(this._handleResponse)
    }

    getMyMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(this._handleResponse)
    }
    
    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(this._handleResponse)
    }
  
    removeMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(this._handleResponse)
    }
}
  
const mainApi = new MainApi({
    baseUrl: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json'
    }
});
  
export default mainApi;