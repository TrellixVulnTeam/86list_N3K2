import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import "./App.css";
import Home from "./screens/Home";
import Landing from "./screens/Landing";
import Layout from "./layouts/Layout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from "./services/auth";
import CreatePost from "./screens/CreatePost";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
      if (!userData) {
        history.push("/");
      }
    };
    handleVerify();
  }, []);

  const handleLogin = async (loginData) => {
    const userData = await loginUser(loginData);
    setCurrentUser(userData);
    history.push("/");
  };

  const handleRegister = async (registerData) => {
    const userData = await registerUser(registerData);
    setCurrentUser(userData);
    history.push("/");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/");
  };

  return (
    <Layout currentUser={currentUser} handleLogout={handleLogout}>
      <Switch>
        <Route exact path="/posts/new" component={CreatePost} />
        {/* <Route exact path="/posts/:id/edit" component={EditPost} /> */}

        <Route path="/login">
          {/* login */}
          <Login handleLogin={handleLogin} />
        </Route>

        <Route path="/register">
          {/* register */}
          <Register handleRegister={handleRegister} />
        </Route>

        <Route path="/">
          {/* container */}
          {currentUser ? (
            <>
              <Home currentUser={currentUser} />
            </>
          ) : (
            <>
              <Landing />
            </>
          )}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
