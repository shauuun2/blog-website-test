(function () {
'use strict';
// Illustrative recipe data. Prices and nutrition are not verified dietary guidance.
const recipes = [
  {
    slug: 'lemon-chicken-rice-bowls', title: 'Lemon Chicken & Rice Bowls', description: 'Juicy lemon chicken, fluffy rice, and crisp cucumber. A little prep, a lot to look forward to.', intro: 'Meet your new lunch-on-repeat. Golden chicken, warm chickpeas, and a lemony yogurt drizzle make a simple bowl feel like something special. Cook once, and you have four satisfying meals ready to go.', cost: 1.48, protein: 42, calories: 510, carbs: 54, fat: 14, fiber: 6, prep: 10, cook: 20, servings: 4, photo: 0, tags: ['40g+ Protein', 'Meal Prep'], label: 'THE EVERYDAY FAVORITE',
    ingredients: [
      ['600 g', 'boneless, skinless chicken breast', 3.20], ['1 cup', 'dry long-grain rice', .60], ['1 can (15 oz)', 'chickpeas, drained and rinsed', .80], ['1 medium', 'cucumber, diced', .45], ['1', 'lemon, zest and juice', .35], ['¼ cup', 'plain Greek yogurt', .30], ['1 tbsp', 'olive oil', .12], ['1 tsp', 'dried oregano, plus salt and pepper', .10]
    ], steps: [
      ['Get the rice going', 'Rinse the rice, then combine with water according to the package directions. Bring to a boil, cover, and simmer until tender, about 15–20 minutes. Fluff with a fork.'],
      ['Season the chicken', 'Cut the chicken into even strips. Toss with the olive oil, oregano, half the lemon juice, the lemon zest, and a pinch each of salt and pepper.'],
      ['Cook until golden', 'Heat a large skillet over medium-high heat. Add the chicken in a single layer, cooking in batches if needed. Cook for 6–8 minutes, turning halfway, until the thickest piece reaches 165°F / 74°C.'],
      ['Make the lemon yogurt', 'Stir the Greek yogurt with the remaining lemon juice and 1–2 tablespoons of water until drizzleable. Season to taste.'],
      ['Build your bowls', 'Divide the rice, chicken, chickpeas, and cucumber among four bowls. Spoon over the lemon yogurt. Serve warm, or cool promptly and refrigerate for meal prep.']
    ], tip: 'Store in sealed containers in the fridge for up to 3–4 days. Keep the cucumber and yogurt separate, and reheat the chicken and rice to 165°F / 74°C before adding them.'
  },
  {
    slug: 'cozy-red-lentil-bowls', title: 'Cozy Red Lentil Bowls', description: 'Pantry staples, warming spices, and a spoonful of yogurt. Comfort food on a tiny budget.', intro: 'Red lentils soften into a creamy, richly spiced bowl with almost no effort. A generous spoonful of Greek yogurt adds creaminess and extra protein.', cost: .92, protein: 28, calories: 390, carbs: 57, fat: 7, fiber: 14, prep: 5, cook: 20, servings: 4, photo: 1, tags: ['Vegetarian', 'Meal Prep'], label: 'PANTRY HERO',
    ingredients: [['1½ cups', 'dry red lentils, rinsed', 1.50], ['1 can (14 oz)', 'chopped tomatoes', .75], ['1 medium', 'onion, diced', .30], ['1 cup', 'plain Greek yogurt', .80], ['1 tbsp', 'olive oil', .12], ['2 tsp', 'cumin and smoked paprika', .15], ['3 cups', 'water, plus salt to taste', .06]],
    steps: [['Soften the onion', 'Heat the oil in a pot over medium heat. Add the onion and cook for 5 minutes, stirring occasionally.'], ['Add a little warmth', 'Stir in the cumin and smoked paprika for 30 seconds, then add the rinsed lentils, tomatoes, and water.'], ['Let it simmer', 'Bring to a boil, reduce the heat, and simmer for 15–20 minutes until the lentils are soft. Stir often and add more water if needed.'], ['Finish and serve', 'Season with salt to taste. Divide among four bowls and top each with a quarter of the Greek yogurt.']], tip: 'Refrigerate the lentils for up to 4 days. Store the yogurt separately and add after reheating.'
  },
  {
    slug: 'tuna-white-bean-salad', title: 'Tuna & White Bean Salad', description: 'Fresh, lemony, and wonderfully filling. No stove, no fuss, no expensive ingredients.', intro: 'A no-cook lunch with pantry staying power. Tuna and white beans meet crunchy vegetables in a bright lemon dressing. It is the kind of meal you can put together between meetings.', cost: 1.32, protein: 36, calories: 370, carbs: 32, fat: 10, fiber: 9, prep: 15, cook: 0, servings: 4, photo: 2, tags: ['20-Minute Meals', 'Meal Prep'], label: 'NO-COOK FAVORITE',
    ingredients: [['3 cans (5 oz each)', 'light tuna in water, drained', 2.70], ['2 cans (15 oz each)', 'white beans, rinsed', 1.40], ['1 medium', 'cucumber, diced', .45], ['1 cup', 'cherry tomatoes, halved', .30], ['1', 'lemon, juiced', .25], ['1 tbsp', 'olive oil', .12], ['2 tbsp', 'chopped parsley, plus salt and pepper', .06]],
    steps: [['Prep the vegetables', 'Dice the cucumber and halve the tomatoes. Drain the tuna and rinse the beans thoroughly.'], ['Shake up the dressing', 'Whisk the lemon juice and olive oil with salt and pepper in a large bowl.'], ['Toss it together', 'Add the tuna, beans, cucumber, tomatoes, and parsley. Fold gently to keep some texture.'], ['Serve or chill', 'Divide into four portions. Serve immediately or refrigerate in sealed containers.']], tip: 'Keep refrigerated and enjoy within 3 days. Stir before serving, as the dressing may settle.'
  },
  {
    slug: 'creamy-spinach-bean-pasta', title: 'Creamy Spinach & Bean Pasta', description: 'All the creamy comfort, with a clever little protein boost from white beans.', intro: 'White beans do double duty: blend some into a silky sauce and leave the rest whole for texture. Add spinach and a little cheese for an easy, satisfying weeknight dinner.', cost: 1.18, protein: 30, calories: 480, carbs: 71, fat: 10, fiber: 11, prep: 5, cook: 15, servings: 4, photo: 3, tags: ['Vegetarian', '20-Minute Meals'], label: 'WEEKNIGHT WINNER',
    ingredients: [['300 g', 'dry penne pasta', .90], ['2 cans (15 oz each)', 'white beans, drained', 1.40], ['200 g', 'frozen spinach', .70], ['¾ cup', 'plain Greek yogurt', .60], ['¼ cup', 'grated Parmesan', .75], ['2 cloves', 'garlic, minced', .15], ['1 tbsp', 'olive oil', .12], ['½ tsp', 'salt and black pepper', .10]],
    steps: [['Cook the pasta', 'Boil the pasta according to the package directions. Reserve 1 cup of cooking water before draining.'], ['Make a creamy base', 'Mash or blend half the beans with the yogurt and half a cup of pasta water.'], ['Warm the greens', 'Heat oil in a large skillet. Cook the garlic for 30 seconds, add the spinach, and cook until hot throughout. Stir in the remaining beans.'], ['Bring it together', 'Remove the skillet from the heat. Fold in the pasta and bean sauce, adding pasta water a splash at a time. Stir in Parmesan and season to taste.']], tip: 'Add the yogurt sauce off the heat to keep it smooth. Refrigerate leftovers for up to 3 days; reheat gently with a splash of water.'
  }
];
const categories = [
  { name: 'Under $1', filter: 'under-1', icon: 'coin', text: 'Small spend. Big satisfaction.' },
  { name: 'Under $1.50', filter: 'under-150', icon: 'wallet', text: 'Your budget-friendly sweet spot.' },
  { name: '40g+ Protein', filter: 'high-protein', icon: 'bolt', text: 'A little extra staying power.' },
  { name: '20-Minute Meals', filter: 'quick', icon: 'clock', text: 'Real food. Less waiting.' },
  { name: 'Meal Prep', filter: 'meal-prep', icon: 'box', text: 'A good week starts here.' }
];
const matches = (r, filter) => filter === 'under-1' ? r.cost < 1 : filter === 'high-protein' ? r.protein >= 40 : filter === 'quick' ? r.prep + r.cook <= 20 : filter === 'meal-prep' ? r.tags.includes('Meal Prep') : true;

window.LeanForLess = { recipes, categories, matches };
})();
