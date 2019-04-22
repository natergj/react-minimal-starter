import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import useReactRouter from "use-react-router";
import { ListItem, List, Typography } from "@material-ui/core";
import { RECIPE_LIST_QUERY } from "../graphql/queries";

const RecipeList: React.FunctionComponent<{}> = () => {
  const { history } = useReactRouter();
  const { data, loading, error } = useQuery(RECIPE_LIST_QUERY);

  if (loading)
    return (
      <List>
        <ListItem>Loading...</ListItem>
      </List>
    );
  if (error)
    return (
      <List>
        <ListItem>There was an error loading recipes</ListItem>
      </List>
    );
  return (
    <List>
      {data.recipes.map(recipe => (
        <ListItem
          button={true}
          key={recipe.id}
          onClick={() =>
            history.push(
              `/view/${recipe.id}/${recipe.title.replace(/[^a-zA-Z0-9-_]/g, "-")}`
            )
          }
        >
          <Typography variant="body2" component="span">
            {recipe.title}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default RecipeList;
