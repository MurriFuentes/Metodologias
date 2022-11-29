import React from 'react';
import './css/NavBar.css';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./components/NavBar/Navbar";
import Footer from './components/Footer';
import PageHome from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends React.Component {

  authenticate() {
    return new Promise(resolve => setTimeout(resolve, 300)) // 2 seconds
  }

  componentDidMount() {
    this.authenticate().then(() => {
      const ele = document.getElementById('ipl-progress-indicator')
      if (ele) {
        ele.classList.add('available')
        setTimeout(() => {
          ele.outerHTML = ''
        }, 300)
      }
    })
  }

  render() {
    return (
        <BrowserRouter>
          <Navbar />
          <div className='alturaMinima'>
            <Switch>
              <Route path="/" exact component={PageHome}></Route>
              <Route path="/Login" exact component={Login}></Route>
              <Route path="/SignUp" exact component={Register}></Route>
            </Switch>
          </div>
          
        </BrowserRouter>
    );
  }
}

export default App;
