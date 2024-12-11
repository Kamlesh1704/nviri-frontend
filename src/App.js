import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import UserLogin from './components/UserLogin';
import BusinessLogin from './components/BusinessLogin';
import Header from './components/Header';
import Home from './components/Home';
function App() {
  return (
    <>
        <BrowserRouter>
        <Header />
          <Routes>
          <Route exact path = "/" element= {<Home />} />
          <Route exact path="/user-login"  element= { <UserLogin />}/>
          <Route exact path="/business-login"  element = {<BusinessLogin /> } />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
