/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import HeaderMain from '../HeaderMain/HeaderMain';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavBar from '../NavBar/NavBar';
import mainApi from '../../utils/MainApi'

function App() {
  const token = localStorage.getItem('jwt');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavBarOpen, setNavBarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [count, setCount] = useState(0);
  const [row, setRow] = useState(0);
  const [resStatus, setResStatus] = useState('');
  const [isVisibleButton, setIsVisibleButton] = useState(true);
  
  function handleLoading() {
    setIsLoading(false);
  };

  function handleLogout() {
    mainApi.logout()
    .then(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      setSavedMovies([]);
      setCurrentUser({});
      history.push('/');
    })
    .catch((err) => {
      console.log(err)
    }) 
  };

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi.authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setIsLoggedIn(true);
      setResStatus('');
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      setResStatus(err);
      setIsLoading(false);
    });
  };

  function handleRegistration(name, email, password) {
    setIsLoading(true);
    mainApi.register(name, email, password)
    .then(() => {
      handleLogin(email, password);
      setResStatus('');
    })
    .catch((err) => {
      console.log(err);
      setResStatus(err);
      setIsLoading(false);
    });
  };

  function setUserInfo() {
    mainApi.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleUpdateUser(name, email) {
    mainApi.changeUserInfo(name, email)
    .then((data) => {
      setResStatus(200);
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
      setResStatus(err);
    });
  };
    
  function checkToken() {
    if (token) {
      mainApi.getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
    };
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token) {
      setUserInfo();
    }
  }, []);

  useEffect(() => {
    if (width > 1280) {
      setCount(3);
      setRow(4);
      return;
    } else if (1280 > width && width > 768) {
      setCount(2);
      setRow(4);
      return;
    } else {
      setCount(1);
      setRow(5);
      return;
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  function handleResize() {
    setTimeout(() => {
      setWidth(window.innerWidth);
    }, 1500);
  };

  function handleShowedMovies(movies) {
    const visibleMovies = movies.slice(0, count * row);
    setShowedMovies(visibleMovies);
  }

  function handleMoreButton() {
    if (width < 768) {
      setShowedMovies(foundMovies.slice(0, showedMovies.length + count * 5));
      handleVisibilityButton(foundMovies);
    } else {
      setShowedMovies(foundMovies.slice(0, showedMovies.length + count));
      handleVisibilityButton(foundMovies);
    };
  };

  function handleVisibilityButton(movies) {
      setIsVisibleButton(movies.length > showedMovies.length);
  };

  function saveItemsInLocalStorage(textSearch, isChecked, movies) {
    localStorage.setItem('textSearch', textSearch);
    localStorage.setItem('isChecked', isChecked);
    localStorage.setItem('foundMovies', JSON.stringify(movies));
  };

  function searchMovies(textSearch, isChecked, movies) {
    const entryRU = movies.filter((movie) => movie.nameRU.toLowerCase().includes(textSearch.toLowerCase()));
    const entryEN = movies.filter((movie) => movie.nameEN.toLowerCase().includes(textSearch.toLowerCase()));
    const allMovies = entryRU.concat(entryEN);
    const shortMovies = allMovies.filter((movie) => movie.duration < 40);
  
    if (isChecked) {
      return [...new Set(shortMovies)]
    }
    return [...new Set(allMovies)];
  };

  function filterMovies({ textSearch, isChecked }) {
    setIsLoading(true);
    moviesApi.getAllMovies()
    .then((movies) => {
      const searchedMovies = searchMovies(textSearch, isChecked, movies);
      setMovies(searchedMovies);
      saveItemsInLocalStorage(textSearch, isChecked, searchedMovies);
      setFoundMovies(searchedMovies);
      handleShowedMovies(searchedMovies)
      handleVisibilityButton(searchedMovies);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false))
  };

  function getSavedMovies() {
    mainApi.getUserInfo()
    .then((res) => {
      mainApi.getMyMovies()
      .then((movies) => {
        const mySavedMovies = movies.data.filter(i => i.owner === res.data._id)
        setSavedMovies(mySavedMovies);
        setFoundSavedMovies(mySavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function filterSavedMovies({ textSearch, isChecked }) {
    const searchedMovies = searchMovies(textSearch, isChecked, savedMovies);
    setFoundSavedMovies(searchedMovies);
  };
  
  function handleSaveMovie(movie) {
    const isSaved = savedMovies.some((i) => i.movieId === movie.id);
    if (!isSaved) {
      mainApi.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
      } else {
        const relevantMovie = savedMovies.find((i) => i.movieId === movie.id);
        mainApi.removeMovie(relevantMovie._id)
        .then(() => {
          setSavedMovies(savedMovies.filter((i) => i.movieId !== relevantMovie.movieId));
        })
        .catch((err) => {
          console.log(err);
        });
      };
    };
    
  function handleRemoveMovie(movie) {
    mainApi.removeMovie(movie._id)
    .then(() => {
      setSavedMovies(savedMovies.filter((i) => i.movieId !== movie.movieId));
      setFoundSavedMovies(savedMovies.filter((i) => i.movieId !== movie.movieId));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    if (showedMovies) {
      handleVisibilityButton(showedMovies);
    }
  }, []);

  function handleResStatus() {
    setResStatus('');
  };

  function openNavBar() {
    setNavBarOpen(true);
  };
    
  function closeNavBar() {
    setNavBarOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <HeaderMain isLoggedIn={isLoggedIn} openNavBar={openNavBar} />
              <Main />
              <Footer />
          </Route>
          <ProtectedRoute path="/movies" isLoggedIn={token} components={(
            <>
              <Header isLoggedIn={isLoggedIn} openNavBar={openNavBar} />
              <Movies
                onSearch={filterMovies}
                films={movies}
                movies={showedMovies}
                handleShowedMovies={handleShowedMovies}
                savedMovies={savedMovies}
                getSavedMovies={getSavedMovies}
                onSave={handleSaveMovie}
                onDelete={handleRemoveMovie}
                onMore={handleMoreButton}
                isVisibleButton={isVisibleButton}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <Footer />
            </>
            )}
          />
          <ProtectedRoute path="/saved-movies" isLoggedIn={token} components={(
            <>
              <Header isLoggedIn={isLoggedIn} openNavBar={openNavBar} />
              <SavedMovies
                onSearch={filterSavedMovies}
                movies={foundSavedMovies}
                savedMovies={savedMovies}
                getSavedMovies={getSavedMovies}
                onDelete={handleRemoveMovie}
                isVisibleButton={isVisibleButton}
              />
              <Footer />
            </>
            )}
          />
          <ProtectedRoute path="/profile" isLoggedIn={token} components={(
            <>
              <Header openNavBar={openNavBar} />
              <Profile onUpdate={handleUpdateUser} onLogout={handleLogout} resStatus={resStatus} setResStatus={handleResStatus} isLoading={isLoading} />
            </>
            )}
          />
          <Route path="/signup">
            {!isLoggedIn ?
              <Register onRegistrate={handleRegistration} resStatus={resStatus} setResStatus={handleResStatus} isLoading={!isLoading} setIsLoading={handleLoading} />
            :
              <Redirect to="/" />
            }   
          </Route>
          <Route path="/signin">
            {!isLoggedIn ?
              <Login onLogin={handleLogin} resStatus={resStatus} setResStatus={handleResStatus} isLoading={!isLoading} setIsLoading={handleLoading} />
            :
              <Redirect to="/" />
            }
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <NavBar isOpen={isNavBarOpen} onClose={closeNavBar} />
      </div>
    </CurrentUserContext.Provider> 
  );
}

export default App;