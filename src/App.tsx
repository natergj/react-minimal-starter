import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo-hooks";
import client from "./graphql/client";
import RecipeLayout from "./components/RecipeLayout";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const App = () => {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={createMuiTheme()}>
          <CssBaseline />
          <Route path="/" component={RecipeLayout} />
        </ThemeProvider>
      </ApolloProvider>
    </HashRouter>
  );
};

export default App;
