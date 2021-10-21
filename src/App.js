import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Form from "./components/Form";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { AuthContextProvider, useAuthState } from './firebase';

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  )
}

const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
          <Link to="/signup">SignUp</Link> 
        </div>
        <AuthenticatedRoute exact path="/form" component={Form} />
        <AuthenticatedRoute exact path="/" component={Home} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <UnauthenticatedRoute exact path="/signup" component={Signup} />
      </Router>
    </AuthContextProvider>
  )
}

export default App;
