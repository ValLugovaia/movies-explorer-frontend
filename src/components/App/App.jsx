import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  return (
    <div className="root">
        <Route path="/">
            <Header />
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
    </div>
  );
}

export default App;