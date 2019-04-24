import gql from "graphql-tag";

export default gql`
  extend type Query {
    """ get the form data for a specific recipe by ID """
    recipeEditorById(id: ID!): RecipeForm
  }

  extend type Mutation {
    completeIngredient(
      recipeId: ID!
      ingredientIndex: Int
      completed: Boolean
    ): Boolean
    setRecipeTitle(recipeId: ID! title: String): Boolean
  }

  extend type Ingredient {
    completed: Boolean
  }

  type RecipeForm {
    id: ID
    title: String
    description: String
    instructions: String
    ingredients: [Ingredient]
  }
`;
