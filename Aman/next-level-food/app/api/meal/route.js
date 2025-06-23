import { Recipe, Restaurant } from "@/models";
import sequelize from "@/config/database";

export const GetMeals = async () => {
    try {
        await sequelize.authenticate();
        const [recipes] = await sequelize.query(`
            SELECT r.*, res.name AS restaurant_name
    FROM recipe r
    JOIN (
        SELECT restaurant_id, MIN(id) AS min_id
        FROM recipe
        GROUP BY restaurant_id
    ) AS grouped ON r.id = grouped.min_id
    JOIN restaurant res ON r.restaurant_id = res.id
        `);

        return recipes.map(recipe => ({
            ...recipe,
            restaurant: { name: recipe.restaurant_name },
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const GetImagesOfMeals = async () => {
    try {
        await sequelize.authenticate();
        const recipe = await Recipe.findAll({
            attributes: ['title', 'image'],
            raw: true
        });
        return recipe
    } catch (err) {
        console.error(err);
        return new Response('Failed to fetch recipe', { status: 500 });
    }
}

export const InsertMeals = async (mealData) => {
    try {
        await sequelize.authenticate();

        const newRecipe = await Recipe.create({
            title: mealData.name,
            restaurant_id: mealData.restaurantId,
            summary: mealData.description,
            price: mealData.price,
            image: mealData.image
        });

        return new Response(JSON.stringify(newRecipe), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to insert recipe', { status: 500 });
    }
}
