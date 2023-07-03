class MoviesApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers
    }
  
    _handleResponse(res) {
        return (res.ok) ? (res.json()) : (Promise.reject(`Ошибка: ${res.status}`))
    }

    getAllMovies() {
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(this._handleResponse)
    }
}
    
const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
});
  
export default moviesApi;