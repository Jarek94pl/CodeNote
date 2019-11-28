import React from 'react';
import Header from "../Header/Header";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Playfair from '../Content/Playfair'
import RailFence from '../Content/RailFence'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <main className="App-content">
          <Router>
              <Switch>
                  <Route exact path="/" component={Content}/>
                  <Route exact path="/PlayFair" component={Playfair}/>
                  <Route exact path="/RailFence" component={RailFence}/>
              </Switch>

          </Router>

      </main>
      <footer className="App-footer">
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
