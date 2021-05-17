import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "../storage/Contexts";
import Register from "../client/users/Register";
import Login from "../client/users/Login";
import Home from "../client/users/Home";
import History from "../client/users/History";
import BookTickets from "../client/users/BookTickets";
import Admin from "../client/admin/Admin";

export default function Routes() {
  const localData = localStorage.getItem("isLogged");

  let initial = "";
  if (localData !== null) {
    initial = localData;
  }

  const [data, setData] = useState(initial);

  useEffect(() => {
    localStorage.setItem("isLogged", data);
  }, [data]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <UserContext.Provider value={{ data, setData }}>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/bookTickets">
              <BookTickets />
            </Route>
            <Route path="/history">
              <History />
            </Route>
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}
