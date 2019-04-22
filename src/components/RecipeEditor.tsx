import * as React from "react";
import useReactRouter from "use-react-router";
import { AddCircle, Delete } from "@material-ui/icons";
import { RECIPE_EDITOR_QUERY } from "../graphql/queries";
import { useQuery } from "react-apollo-hooks";
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
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const { match } = useReactRouter<{ recipeId: string }>();

  const { data, loading } = useQuery(RECIPE_EDITOR_QUERY, {
    variables: { id: match.params.recipeId }
  });

  React.useEffect(() => {
    if (data.recipeEditorById) {
      const {
        title,
        description,
        instructions,
        ingredients
      } = data.recipeEditorById;
      setTitle(title);
      setDescription(description);
      setInstructions(instructions);
      setIngredients(ingredients);
    }
  }, [data]);

  const updateIngredient = (index, property, e) => {
    const nextIngredients = [...ingredients];
    const updatedIngredient = { ...ingredients[index] };
    updatedIngredient[property] = e.target.value;
    nextIngredients.splice(index, 1, updatedIngredient);
    setIngredients(nextIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { measure: "", amount: "", ingredient: "" }])
  }

  const deleteIngredient = (index) => {
    const nextIngredients = [...ingredients];
    nextIngredients.splice(index, 1);
    setIngredients(nextIngredients);
  }

  if (loading) return <div>Loading</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        classes={{ root: classes.textFieldRoot }}
        fullWidth={true}
        variant="outlined"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
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
        {ingredients.map(({ ingredient, amount, measure }, index) => {
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
        })}
        <ListItem>
          <IconButton onClick={addIngredient} >
            <AddCircle />
          </IconButton> Add Ingredient
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
