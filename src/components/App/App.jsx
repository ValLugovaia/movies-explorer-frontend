/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
/* import moviesApi from '../../utils/MoviesApi'; */
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

function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNavBarOpen, setNavBarOpen] = useState(false);

    const token = localStorage.getItem('jwt');

    function handleRegistration(email, password, name) {
        mainApi.register(email, password, name)
          .then(() => {
            handleLogin(email, password);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    
      function handleLogin(email, password) {
        setIsLoading(true);
        mainApi.authorize(email, password)
        .then((res) => {
            localStorage.setItem('jwt', res.token);
            /* checkToken(); */
            setIsLoggedIn(true);
            history.push('/movies');
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false)
          });
      }
    
      function handleLogout() {
        localStorage.clear();
        setIsLoggedIn(false);
        history.push('/signin');
      }
    
      function checkToken() {
        if (token) {
            mainApi.getUserInfo()
            .then(() => {
                setUserInfo();
              setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
                localStorage.clear();
            });
          }
      }

      useEffect(() => {
        if (isLoggedIn) {
          Promise.all([mainApi.getUserInfo()])
            .then(([data]) => {
              setCurrentUser(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [isLoggedIn]);
    
      useEffect(() => {
        checkToken();
      }, [history]);

      function handleUpdateUser({ name, email }) {
        mainApi.changeUserInfo({ name, email })
        .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }

    function setUserInfo() {
        setIsLoading(true)
        mainApi.getUserInfo()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
    }

    function handleLoading() {
        setIsLoading(false);
    }

 
    function openNavBar() {
        setNavBarOpen(true);
    };

    function closeNavBar() {
        setNavBarOpen(false);
    };

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Route exact path="/">
                <HeaderMain />
                <Main />
                <Footer />
            </Route>
           <Route path="/movies" element={
            <>
                    <Header openNavBar={openNavBar} />
                    <Movies loggedIn={isLoggedIn} setIsLoading={handleLoading} isLoading={isLoading} />
                    <Footer />
                    </>
                  }
                />
            <Route path="/saved-movies" element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <Header openNavBar={openNavBar} />
                    <SavedMovies loggedIn={isLoggedIn} isLoading={isLoading} />
                    <Footer />
                  </ProtectedRoute>
                  }
                />
            <Route path="/profile" element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <Header openNavBar={openNavBar} />
                    <Profile loggedIn={isLoggedIn} onUpdate={handleUpdateUser} onLogout={handleLogout} isLoading={isLoading} />
                  </ProtectedRoute>
                  }
                />
            <Route path="/signup">
                <Register onRegistrate={handleRegistration} />
            </Route>
            <Route path="/signin">
                <Login onLogin={handleLogin} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <NavBar isOpen={isNavBarOpen} onClose={closeNavBar} />
        </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;