import './App.css';
import { Component } from 'react';
import TodoListComponent from './Components/Todo-List-Component';
import interceptor from './Serivces/intreceptor'
import { Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './Components/login-component/Login-Component'
import history from './Serivces/hiostory';
import ProtectRouteComponent from './Components/protected-Route-Component'
import SignupComponent from './Components/signup/Signup-Component'

class App extends Component {

  render() {
    return (
      <div className="App container">
        <Router history={history} >
          <Switch>
            <ProtectRouteComponent component={TodoListComponent} exact path="/todos">
              {/* <Header />
              <TodoListComponent /> */}
            </ProtectRouteComponent>
            <Route exact path="/login" render={data => <LoginComponent {...data} />}>
            </Route>
            <Route render={data => <LoginComponent {...data} />} exact path="/">
            </Route>
            <Route exact path="/signup" render={data=><SignupComponent {...data} />}></Route>
          </Switch>
        </Router>
      </div>
    )
  };
}

export default App;
