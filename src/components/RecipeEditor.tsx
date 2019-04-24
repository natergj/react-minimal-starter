import * as React from "react";
import useReactRouter from "use-react-router";
import { AddCircle, Delete } from "@material-ui/icons";
import {
  RECIPE_EDITOR_QUERY,
  SET_RECIPE_TITLE,
  MODIFIY_INGREDIENT
} from "../graphql/queries";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  TextField,
  makeStyles,
  Theme,
  Button,
  ListItem,
  List,
  Select,
  MenuItem,
  IconButton
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  textFieldRoot: {
    marginBottom: theme.spacing(2)
  }
}));

const RecipeEditor: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  const [description, setDescription] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const { match } = useReactRouter<{ recipeId: string }>();

  const setTitle = useMutation(SET_RECIPE_TITLE);
  const setIngredient = useMutation(MODIFIY_INGREDIENT);
  const { data, loading } = useQuery(RECIPE_EDITOR_QUERY, {
    variables: { id: match.params.recipeId }
  });

  React.useEffect(() => {
    if (data.recipeEditorById) {
      const { description, instructions } = data.recipeEditorById;
      setDescription(description || "");
      setInstructions(instructions || "");
    }
  }, [data]);

  const updateIngredient = (index, property, e) => {
    if (!data.recipeEditorById) return;
    const updatedIngredient = data.recipeEditorById.ingredients[index];
    updatedIngredient[property] = e.target.value;
    setIngredient({
      variables: {
        recipeId: match.params.recipeId,
        ingredientIndex: index,
        modifications: {
          amount: Number(updatedIngredient.amount),
          measure: updatedIngredient.measure,
          ingredient: updatedIngredient.ingredient
        }
      }
    });
  };

  const addIngredient = () => {
    console.log("add ingredient");
  };

  const deleteIngredient = index => {
    console.log("remove ingredient");
  };

  if (loading) return <div>Loading</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        classes={{ root: classes.textFieldRoot }}
        fullWidth={true}
        variant="outlined"
        label="Title"
        value={data.recipeEditorById.title || ""}
        onChange={e =>
          setTitle({
            variables: {
              recipeId: match.params.recipeId,
              title: e.target.value
            }
          })
        }
      />
      <TextField
        classes={{ root: classes.textFieldRoot }}
        fullWidth={true}
        multiline={true}
        variant="outlined"
        rows={4}
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <TextField
        classes={{ root: classes.textFieldRoot }}
        fullWidth={true}
        multiline={true}
        variant="outlined"
        rows={4}
        label="Instructions"
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />
      <List style={{ borderSpacing: "16px" }}>
        {data.recipeEditorById.ingredients.map(
          ({ ingredient, amount, measure }, index) => {
            return (
              <ListItem key={index} style={{ display: "table-row" }}>
                <TextField
                  value={amount}
                  label="Amount"
                  style={{ display: "table-cell" }}
                  onChange={updateIngredient.bind(null, index, "amount")}
                >
                  {amount}
                </TextField>
                <Select
                  value={measure}
                  style={{ display: "table-cell" }}
                  onChange={updateIngredient.bind(null, index, "measure")}
                >
                  <MenuItem value="cup">Cup</MenuItem>
                  <MenuItem value="teaspoon">Teaspoon</MenuItem>
                  <MenuItem value="tablespoon">Tablespoon</MenuItem>
                  <MenuItem value="ounce">Ounce</MenuItem>
                  <MenuItem value="fluid_once">Fluid Ounce</MenuItem>
                  <MenuItem value="gram">Gram</MenuItem>
                  <MenuItem value="pound">Pound</MenuItem>
                </Select>
                <TextField
                  value={ingredient}
                  label="Ingredient"
                  style={{ display: "table-cell" }}
                  onChange={updateIngredient.bind(null, index, "ingredient")}
                >
                  {ingredient}
                </TextField>
                <IconButton onClick={deleteIngredient.bind(null, index)}>
                  <Delete />
                </IconButton>
              </ListItem>
            );
          }
        )}
        <ListItem>
          <IconButton onClick={addIngredient}>
            <AddCircle />
          </IconButton>{" "}
          Add Ingredient
        </ListItem>
      </List>
      <div style={{ alignSelf: "flex-end" }}>
        <Button value="Save" variant="contained" size="medium" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default RecipeEditor;
