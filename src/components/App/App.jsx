import './App.css';
import React from "react";
import { Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="page">
            <Route exact path="/">
                <HeaderMain />
                <Main />
                <Footer />
            </Route>
           <Route path="/movies">
                <Header />
                <Movies />
                <Footer />
            </Route>
            <Route path="/saved-movies">
                <Header />
                <SavedMovies />
                <Footer />
            </Route>
            <Route path="/profile">
                <Header />
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
    </div>
  );
}

export default App;