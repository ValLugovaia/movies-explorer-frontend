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
  const [shortMovie, setShortMovie] = useState(false);
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
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    history.push('/');
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
    setShowedMovies(foundMovies.slice(0, count * row));
  }, [row, count, foundMovies]);

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

  function handleMoreButton() {
    if (width < 768) {
      setShowedMovies(foundMovies.slice(0, showedMovies.length + count * 5));
      handleVisibilityButton();
    } else {
      setShowedMovies(foundMovies.slice(0, showedMovies.length + count));
      handleVisibilityButton();
    };
  };

  function handleVisibilityButton() {
    if (width < 768) {
      setIsVisibleButton(foundMovies.length > showedMovies.length + count * 5);
    } else {
      setIsVisibleButton(foundMovies.length > showedMovies.length + count);
    };
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

  function handleResStatus() {
    setResStatus('');
  }

  function openNavBar() {
    setNavBarOpen(true);
  };
    
  function closeNavBar() {
    setNavBarOpen(false);
  };
      
  function saveItemsInLocalStorage(textSearch, isChecked, movies) {
    localStorage.setItem('textSearch', textSearch);
    localStorage.setItem('isChecked', isChecked);
    localStorage.setItem('foundMovies', JSON.stringify(movies));
  };

  function filterMovies(textSearch) {
    setIsLoading(true);
    moviesApi.getAllMovies()
    .then((movies) => {
      setMovies(movies);
      const entryRU = movies.filter((movie) => movie.nameRU.toLowerCase().includes(textSearch.toLowerCase()));
      const entryEN = movies.filter((movie) => movie.nameEN.toLowerCase().includes(textSearch.toLowerCase()));
      const newMovies = entryRU.concat(entryEN);
      const shortMovies = newMovies.filter((movie) => movie.duration < 40);
      if (shortMovie) {
        saveItemsInLocalStorage(textSearch, shortMovie, shortMovies);
        setFoundMovies(shortMovies);
        handleVisibilityButton();
      } else {
        saveItemsInLocalStorage(textSearch, shortMovie, newMovies);
        setFoundMovies(newMovies);
        handleVisibilityButton();
      };
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false))
  };

  function getSavedMovies() {
    mainApi.getMyMovies()
    .then((movies) => {
      setSavedMovies(movies);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function filterSavedMovies(textSearch) {
    setIsLoading(true);
    const entryRU = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(textSearch.toLowerCase()));
    const entryEN = savedMovies.filter((movie) => movie.nameEN.toLowerCase().includes(textSearch.toLowerCase()));
    const newMovies = entryRU.concat(entryEN);
    const shortMovies = newMovies.filter((movie) => movie.duration < 40);
    if (shortMovie) {
      setFoundSavedMovies(shortMovies);
    } else {
      setFoundSavedMovies(newMovies);
    };
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
    if (token) {
      setUserInfo();
    }
  }, []);

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
                movies={movies}
                showedMovies={showedMovies}
                savedMovies={savedMovies}
                setFoundMovies={setFoundMovies}
                onSave={handleSaveMovie}
                onDelete={handleRemoveMovie}
                handleMoreButton={handleMoreButton}
                shortMovie={shortMovie}
                setShortMovie={setShortMovie}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isVisibleButton={isVisibleButton}
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
                movies={savedMovies}
                savedMovies={savedMovies}
                getSavedMovies={getSavedMovies}
                foundSavedMovies={foundSavedMovies}
                onDelete={handleRemoveMovie}
                shortMovie={shortMovie}
                setShortMovie={setShortMovie}
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
              <Register onRegistrate={handleRegistration} isLoading={!isLoading} setIsLoading={handleLoading} resStatus={resStatus} setResStatus={handleResStatus} />
            :
              <Redirect to="/" />
            }   
          </Route>
          <Route path="/signin">
            {!isLoggedIn ?
              <Login onLogin={handleLogin} isLoading={!isLoading} setIsLoading={handleLoading} resStatus={resStatus} setResStatus={handleResStatus} />
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