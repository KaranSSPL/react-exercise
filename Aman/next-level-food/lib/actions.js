'use server';

import { InsertRestaurant } from "@/app/api/restaurant/route";
import { InsertMeals } from "@/app/api/meal/route";
import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const isInvalidText = (text) => {
    return !text || text.trim() === '';
}

export const addRestaurant = async (prevState, formData) => {
    const restaurant = {
        name: formData.get('name'),
        email: formData.get('email'),
        location: formData.get('location'),
        description: formData.get('description'),
        rating: formData.get('rating'),
        image: formData.get('image')
    }

    if (isInvalidText(restaurant.name)) return { message: "Restaurant Name is required." };
    if (isInvalidText(restaurant.email) || !restaurant.email.includes('@')) return { message: "Valid email is required." };
    if (isInvalidText(restaurant.location)) return { message: "Location is required." };
    if (isInvalidText(restaurant.description)) return { message: "Description is required." };
    if (isInvalidText(restaurant.rating)) return { message: "Rating is required." };
    if (!restaurant.image || restaurant.image.size === 0) return { message: "Image is required." };

    try {
        const imageBuffer = Buffer.from(await restaurant.image.arrayBuffer());
        const ext = path.extname(restaurant.image.name);
        const fileName = `${randomUUID()}${ext}`
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

        await writeFile(filePath, imageBuffer);

        restaurant.image = `/uploads/${fileName}`;

        const result = await InsertRestaurant(restaurant);
        if (result.status === 201) {
            return { message: "Restaurant saved successfully!" }
        } else {
            return { message: "Failed to save restaurant." }
        }
    } catch (error) {
        console.error("Error saving restaurant:", error);
        return { message: "An error occurred while saving the restaurant." };
    }
}

export const addMeal = async (prevState, formData) => {
    const meal = {
        name: formData.get('name'),
        restaurantId: formData.get('restaurantId'),
        description: formData.get('description'),
        price: formData.get('price'),
        image: formData.get('image')
    }

    if (isInvalidText(meal.name)) return { message: "Meal Name is required." };
    if (isInvalidText(meal.restaurantId)) return { message: "Restaurant is required." };
    if (isInvalidText(meal.description)) return { message: "Description is required." };
    if (isInvalidText(meal.price)) return { message: "Price is required." };
    if (!meal.image || meal.image.size === 0) return { message: "Image is required." };

    try {
        const imageBuffer = Buffer.from(await meal.image.arrayBuffer());
        const ext = path.extname(meal.image.name);
        const fileName = `${randomUUID()}${ext}`
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

        await writeFile(filePath, imageBuffer);

        meal.image = `/uploads/${fileName}`;

        const result = await InsertMeals(meal);
        if (result.status === 201) {
            return { message: "Meal saved successfully!" }
        } else {
            return { message: "Failed to save meal." }
        }
    } catch (error) {
        console.error("Error saving meal:", error);
        return { message: "An error occurred while saving the meal." };
    }
}