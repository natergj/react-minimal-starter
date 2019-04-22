import * as React from "react";
import { AppBar, Toolbar, Typography, Drawer, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Route } from "react-router-dom";
import useRouter from "use-react-router";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import RecipeEditor from "./RecipeEditor";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarLink: {
    cursor: "pointer",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const RecipeLayout = () => {
  const classes = useStyles();
  const { history, match } = useRouter();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap={true}
            onClick={() => history.push("/")}
            className={classes.appBarLink}
          >
            Grandma Jorde's Recipe Box
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <RecipeList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path={`${match.path}view/:recipeId`} component={RecipeDetails} />
        <Route path={`${match.path}edit/:recipeId`} component={RecipeEditor} />
      </main>
    </div>
  );
};

export default RecipeLayout;
