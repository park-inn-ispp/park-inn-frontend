import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './Client/ClientList';
import ClientEdit from "./Client/ClientEdit";
import ReservaDetails from './Reserva/ReservaDetails';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/clients' exact={true} component={ClientList}/>
            <Route path='/clients/:id' component={ClientEdit}/>
            <Route path='/reserva/:id' component={ReservaDetails}/>
          </Switch>
        </Router>
    )
  }

  
}
export default App;
