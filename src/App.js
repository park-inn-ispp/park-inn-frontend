import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './Client/ClientList';
import ClientEdit from "./Client/ClientEdit";
import CreateParking from "./Parking/CreateParking";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/clients' exact={true} component={ClientList}/>
            <Route path='/clients/:id' component={ClientEdit}/>
            <Route path='/parking/create' component={CreateParking}/>
          </Switch>
        </Router>
    )
  }

  
}
export default App;
