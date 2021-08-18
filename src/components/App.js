import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";

import Header from "components/Header";
import LoginPage from "components/LoginPage";
import LandingPage from "components/LandingPage";

function App() {
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);

  return (
    <div>
      <Header />
      <Switch>
        {!isLoggedIn && (
          <>
            <Route exact path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route exact path="/welcome" component={LandingPage} />
            <Redirect to="/welcome" />
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
