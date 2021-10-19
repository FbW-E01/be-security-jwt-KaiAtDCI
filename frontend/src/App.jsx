import './App.scss';
import {Switch, Route} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

export default function App() {

  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/*' component={Login}/>
      </Switch>
    </div>
  );
}
