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
import {
  MOBILE_COUNT,
  MOBILE_MORE_COUNT,
  TABLET_WIDTH,
  TABLET_COUNT,
  TABLET_MORE_COUNT,
  DESKTOP_WIDTH,
  DESKTOP_COUNT,
  DESKTOP_MORE_COUNT,
  SHORT_MOVIE_DURATION,
 } from '../../utils/constants';

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
  const [countShowedMovies, setCountShowedMovies] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [resStatus, setResStatus] = useState('');
  const [isVisibleButton, setIsVisibleButton] = useState(true);
  const [countMoreMovies, setCountMoreMovies] = useState(0);
  
  function handleLoading() {
    setIsLoading(false);
  };

  function handleLogout() {
    const userEmail = localStorage.getItem('email');
    mainApi.logout(userEmail)
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
      localStorage.setItem('email', email);
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
    .then(() => {
      setResStatus(200);
      setUserInfo();
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
      setUserInfo();
    }
  }, [isLoggedIn]);

  function handleDefaultShowedMovies() {
    if (width > DESKTOP_WIDTH) {
      return DESKTOP_COUNT;
    } else if (DESKTOP_WIDTH > width && width > TABLET_WIDTH) {
      return TABLET_COUNT;
    } else {
      return MOBILE_COUNT;
    };
  };

  function handleCountMoreMovies() {
    if (width > DESKTOP_WIDTH) {
      setCountMoreMovies(DESKTOP_MORE_COUNT);
    } else if (DESKTOP_WIDTH > width && width > TABLET_WIDTH) {
      setCountMoreMovies(TABLET_MORE_COUNT);
    } else {
      setCountMoreMovies(MOBILE_MORE_COUNT);
    };
  };

  function handleShowedMovies(movies) {
    const visibleMovies = movies.slice(0, countShowedMovies);
    setShowedMovies(visibleMovies);
  }

  function handleMoreButton() {
    setCountShowedMovies(countShowedMovies + countMoreMovies);
  };

  function handleVisibilityButton(movies) {
    setIsVisibleButton(movies.length > countShowedMovies);
  };

  function handleResize() {
    setTimeout(() => {
      setWidth(window.innerWidth);
    }, 1500);
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
    const shortMovies = allMovies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION);
  
    if (isChecked) {
      return [...new Set(shortMovies)]
    }
    return [...new Set(allMovies)];
  };

  function filterMovies({ textSearch, isChecked }) {
    const searchedMovies = searchMovies(textSearch, isChecked, movies);
    if (movies.length === 0 && textSearch) {
      setIsLoading(true);
      moviesApi.getAllMovies()
      .then((movies) => {
        const searchedMovies = searchMovies(textSearch, isChecked, movies);
        setMovies(movies);
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
    saveItemsInLocalStorage(textSearch, isChecked, searchedMovies);
    setFoundMovies(searchedMovies);
    handleShowedMovies(searchedMovies)
    handleVisibilityButton(searchedMovies);
  };

  function getSavedMovies() {
    if (savedMovies.length === 0) {
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
    handleCountMoreMovies();
    setCountShowedMovies(handleDefaultShowedMovies());
  }, [width]);

  useEffect(() => {
    handleVisibilityButton(foundMovies);
  }, [countShowedMovies]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

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
                countShowedMovies={countShowedMovies}
                handleShowedMovies={handleShowedMovies}
                savedMovies={savedMovies}
                getSavedMovies={getSavedMovies}
                onSave={handleSaveMovie}
                onDelete={handleRemoveMovie}
                onMore={handleMoreButton}
                isVisibleButton={isVisibleButton}
                isLoading={isLoading}
                setIsLoading={handleLoading}
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
              <Register onRegistrate={handleRegistration} resStatus={resStatus} setResStatus={handleResStatus} isLoading={!isLoading} />
            :
              <Redirect to="/" />
            }   
          </Route>
          <Route path="/signin">
            {!isLoggedIn ?
              <Login onLogin={handleLogin} resStatus={resStatus} setResStatus={handleResStatus} isLoading={!isLoading} />
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