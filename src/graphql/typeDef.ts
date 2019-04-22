import gql from "graphql-tag";

export default gql`
  extend type Query {
    recipeEditorById(id: ID!): RecipeForm
  }

  extend type Mutation {
    completeIngredient(
      recipeId: ID!
      ingredientIndex: Int
      completed: Boolean
    ): Boolean
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
