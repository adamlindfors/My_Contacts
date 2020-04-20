import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ContactList from "./components/contactlist";
import EditContact from "./components/edit-contact";
import CreateContact from "./components/create-contact";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={ContactList} />
          <Route path="/edit/:id" component={EditContact} />
          <Route path="/create" component={CreateContact} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
