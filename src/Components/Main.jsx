import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactsList from "../Components/CreateContact/ContactsList";
import CreateContact from "../Components/CreateContact/CreateContact";

class Main extends Component {

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/" exact render={(props) => <ContactsList {...props}/>} />
            <Route path="/home" exact render={(props) => <ContactsList {...props}/>} />
            <Route path="/create-contact" render={(props) => <CreateContact {...props}/>} />
            <Route path="/edit-contact/:id" render={(props) => <CreateContact {...props} updating={true} />} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Main;
