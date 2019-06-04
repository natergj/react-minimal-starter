import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "0px"
  },
  expanded: {
    color: "orange",
    margin: 0,
  }
}));
const App = () => {
  const classes = useStyles();
  return (
    <div style={{ height: 600, width: 300 }}>
      <h1>Hello World</h1>
      <ExpansionPanel classes={classes}>
        <ExpansionPanelSummary>Title 1</ExpansionPanelSummary>
        <ExpansionPanelDetails>My Details 1</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel classes={classes}>
        <ExpansionPanelSummary>Title 2</ExpansionPanelSummary>
        <ExpansionPanelDetails>My Details 2</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default App;
