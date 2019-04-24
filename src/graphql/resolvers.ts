import { RECIPE_DETAILS_QUERY } from "./queries";

export default {
  Ingredient: {
    completed(ingredient) {
      return typeof ingredient.completed === "boolean"
        ? ingredient.completed
        : false;
    }
  },
  
  Query: {
    async recipeEditorById(_, vars, ctx) {
      const { data: { recipeById }} = await ctx.client.query({
        query: RECIPE_DETAILS_QUERY,
        variables: { id: vars.id },
      });
      return {
        ...recipeById,
        __typename: "RecipeForm",
      }
    },
  },

  Mutation: {
    completeIngredient(_, vars, ctx) {
      ctx.client.writeData({
        id: `Recipe:${vars.recipeId}.ingredients.${vars.ingredientIndex}`,
        data: {
          completed: vars.completed
        }
      });
    },
    setRecipeTitle(_, vars, ctx) {
      ctx.client.writeData({
        id: `RecipeForm:${vars.recipeId}`,
        data: {
          title: vars.title
        }
      });
    }
  }
};
