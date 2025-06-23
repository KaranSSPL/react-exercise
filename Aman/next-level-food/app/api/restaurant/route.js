import sequelize from "@/config/database";
import { Recipe, Restaurant } from "@/models";

export const GetRestaurant = async () => {
    await sequelize.authenticate();
    return await Restaurant.findAll();
}

export const InsertRestaurant = async (restaurantData) => {
    try {
        await sequelize.authenticate();

        await Restaurant.sync();

        const newRestaurant = await Restaurant.create({
            name: restaurantData.name,
            email: restaurantData.email,
            image: restaurantData.image,
            description: restaurantData.description,
            location: restaurantData.location,
            rating: restaurantData.rating
        });

        return new Response(JSON.stringify(newRestaurant), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to insert restaurant', { status: 500 });
    }
}

export const GetRestaurantBySlug = async (resturantName) => {
    try {
        await sequelize.authenticate();
        // name = name.toLowerCase().replaceAll("-", " ");
        // console.log(name)
        // const restaurant = await Restaurant.findOne({
        //     where: { name },
        //     include: {
        //         model: Recipe,
        //         as: 'recipes',
        //         attributes: ['id', 'title', 'summary', 'image', 'price']
        //     }
        // });
        // return restaurant;

        const [rows] = await sequelize.query(`
            SELECT
                r.id, r.name, r.email, r.image, r.description, r.location, r.rating, re.id AS recipeId, re.title AS recipeTitle, re.summary AS recipeSummary, re.image AS recipeImage, re.price AS recipePrice
            FROM restaurant r
            INNER JOIN recipe re ON re.restaurant_id = r.id
            WHERE LOWER(REPLACE(REPLACE(REPLACE(r.name, ' ', '-'), '''', ''), '&', '')) = ?
            `, { replacements: [resturantName] });

        if (rows.length === 0) return null;

        const { id, name, email, image, description, location, rating } = rows[0]

        const recipes = rows.map(row => ({
            id: row.recipeId,
            title: row.recipeTitle,
            summary: row.recipeSummary,
            image: row.recipeImage,
            price: row.recipePrice
        }));

        return {
            id,
            name,
            email,
            image,
            description,
            location,
            rating,
            recipes
        };

    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
}


// === API handler ===
export const GET = async () => {
    try {
        const restaurants = await GetRestaurant();
        return Response.json(restaurants);
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch restaurants", { status: 500 });
    }
}