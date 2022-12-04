import './App.css';
import { Route } from 'react-router-dom';
import { useState } from 'react';
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
    const [isNavBarOpen, setNavBarOpen] = useState(false);

    function openNavBar() {
        setNavBarOpen(true);
    };

    function closeNavBar() {
        setNavBarOpen(false);
    };

  return (
    <div className="page">
            <Route exact path="/">
                <HeaderMain />
                <Main />
                <Footer />
            </Route>
           <Route path="/movies">
                <Header openNavBar={openNavBar} />
                <Movies />
                <Footer />
            </Route>
            <Route path="/saved-movies">
                <Header openNavBar={openNavBar} />
                <SavedMovies />
                <Footer />
            </Route>
            <Route path="/profile">
                <Header openNavBar={openNavBar} />
                <Profile />
            </Route>
            <Route path="/signup">
                <Register />
            </Route>
            <Route path="/signin">
                <Login />
            </Route>
            <Route path="/404">
                <NotFoundPage />
            </Route>
            <NavBar isOpen={isNavBarOpen} onClose={closeNavBar} />
    </div>
  );
}

export default App;