import React from "react";
import { Link, HashRouter, Route } from "react-router-dom";
import GitHubUserClass from "./GitHubUserClass";
import GitHubUserHooks from "./GitHubUserHooks";
import SideBySide from "./SideBySide";
import SideBySideShared from "./SideBySideShared";

const Hello = () => (
  <div>
    <h1>Hello World</h1>
    <Link to="/github/class">Github with Class</Link>
    <br />
    <Link to="/github/hooks">Github with Hooks</Link>
    <br />
    <Link to="/side-by-side">Side by Side Class vs Hooks</Link>
    <br />
    <Link to="/shared">Shared Hooks</Link>
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Hello} />
      <Route path="/github/class" component={GitHubUserClass} />
      <Route path="/github/hooks" component={GitHubUserHooks} />
      <Route path="/side-by-side" component={SideBySide} />
      <Route path="/shared" component={SideBySideShared} />
    </HashRouter>
  );
};

export default App;
