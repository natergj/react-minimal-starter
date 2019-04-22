import * as React from "react";
import useRouter from "use-react-router";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  Typography,
  List,
  ListItem,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Amount from "./Amount";
import { RECIPE_DETAILS_QUERY, COMPLETE_INGREDIENT } from "../graphql/queries";

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    display: "table-row"
  },
  listItemCell: {
    display: "table-cell",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  }
}));

const RecipeDetails: React.FunctionComponent<{}> = () => {
  const { match } = useRouter<{ recipeId: string }>();
  const { data, loading, error } = useQuery(RECIPE_DETAILS_QUERY, {
    variables: { id: match.params.recipeId }
  });
  const completeIngredient = useMutation(COMPLETE_INGREDIENT);

  const classes = useStyles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  const { title, instructions, description, ingredients } = data.recipeById;
  return (
    <div>
      <Typography variant="h2" component="header">
        {title}
      </Typography>
      <Typography variant="subtitle1" component="p">
        {description}
      </Typography>
      <Typography variant="body1">{instructions}</Typography>
      <List>
        {ingredients.map(
          ({ measure, amount, ingredient, completed }, index) => (
            <ListItem key={index} className={classes.listItem}>
              <input
                type="checkbox"
                className={classes.listItemCell}
                checked={completed}
                onChange={() =>
                  completeIngredient({
                    variables: {
                      recipeId: match.params.recipeId,
                      ingredientIndex: index,
                      completed: !completed
                    }
                  })
                }
              />
              <div className={classes.listItemCell}>
                <Amount num={amount} />
              </div>
              <div className={classes.listItemCell}>{measure}</div>
              <div className={classes.listItemCell}>{ingredient}</div>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
};

export default RecipeDetails;
