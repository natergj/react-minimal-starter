import { RECIPE_DETAILS_QUERY } from "./queries";

export default {
  Ingredient: {
    completed(ingredient, vars, ctx) {
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
      ctx.writeData({
        id: `Recipe:${vars.recipeId}.ingredients.${vars.ingredientIndex}`,
        data: {
          completed: vars.completed
        }
      });
    }
  }
};
