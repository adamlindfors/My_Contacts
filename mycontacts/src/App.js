import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ContactList from "./components/contactlist";
import EditContact from "./components/edit-contact";
import CreateContact from "./components/create-contact";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ContactList} />
        <Route path="/edit/:id" component={EditContact} />
        <Route path="/create" component={CreateContact} />
      </div>
    </Router>
  );
}

export default App;
