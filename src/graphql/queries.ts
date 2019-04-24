import gql from "graphql-tag";

export const RECIPE_LIST_QUERY = gql`
  query recipes {
    recipes {
      id
      title
    }
  }
`;

export const RECIPE_DETAILS_QUERY = gql`
  query recipeById($id: ID!) {
    recipeById(id: $id) {
      id
      title
      description
      instructions
      ingredients {
        completed @client
        measure
        amount
        ingredient
      }
    }
  }
`;

export const RECIPE_EDITOR_QUERY = gql`
  query recipeEditorById($id: ID!) {
    recipeEditorById(id: $id) @client {
      id
      title
      description
      instructions
      ingredients {
        measure
        amount
        ingredient
      }
    }
  }
`;

export const COMPLETE_INGREDIENT = gql`
  mutation completeIngredient(
    $recipeId: ID!
    $ingredientIndex: Int
    $completed: Boolean
  ) {
    completeIngredient(
      recipeId: $recipeId
      ingredientIndex: $ingredientIndex
      completed: $completed
    ) @client
  }
`;

export const SET_RECIPE_TITLE = gql`
  mutation setRecipeTitle($recipeId: ID!, $title: String!) {
    setRecipeTitle(recipeId: $recipeId, title: $title) @client
  }
`;

export const MODIFIY_INGREDIENT = gql`
  mutation modifyIngredient(
    $recipeId: ID!
    $ingredientIndex: Int
    $modifications: IngredientInput
  ) {
    modifyIngredient(
      recipeId: $recipeId
      ingredientIndex: $ingredientIndex
      modifications: $modifications
    ) {
      id
      title
      description
      instructions
      ingredients {
        completed @client
        measure
        amount
        ingredient
      }
    }
  }
`;
