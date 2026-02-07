export const generatePrice = (recipe) => {
  const basePrice = 8.99;
  const timeMultiplier =
    (((recipe.prepTimeMinutes || 15) + (recipe.cookTimeMinutes || 20)) / 60) *
    4;
  const calorieMultiplier = ((recipe.caloriesPerServing || 300) / 500) * 2;
  const price = basePrice + timeMultiplier + calorieMultiplier;
  return Math.round(price * 100) / 100;
};

export const mapMealType = (mealType) => {
  if (!mealType) return "Main Course";

  const type = mealType.toLowerCase();
  const categoryMap = {
    breakfast: "Appetizer",
    snack: "Appetizer",
    snacks: "Appetizer",
    "side dish": "Appetizer",
    appetizer: "Appetizer",
    lunch: "Main Course",
    dinner: "Main Course",
    "main course": "Main Course",
    dessert: "Dessert",
    desserts: "Dessert",
    beverage: "Drinks",
    beverages: "Drinks",
    drink: "Drinks",
    drinks: "Drinks",
  };

  return categoryMap[type] || "Main Course";
};

export const transformRecipeToProduct = (recipe) => ({
  id: recipe.id,
  title: recipe.name,
  price: generatePrice(recipe),
  category: mapMealType(recipe.mealType?.[0]),
  thumbnail: recipe.image,
  rating: recipe.rating,
  cuisine: recipe.cuisine,
  prepTime: recipe.prepTimeMinutes,
  cookTime: recipe.cookTimeMinutes,
  difficulty: recipe.difficulty,
});

export const transformRecipes = (recipes) =>
  recipes.map(transformRecipeToProduct);
