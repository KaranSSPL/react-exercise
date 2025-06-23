'use client';

import ImagePicker from '@/_components/meals/image-picker'
import classes from './page.module.css'
import { addMeal } from '@/lib/actions'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantDropdown from '@/_components/restaurant/restaurant-dropdown';

const AddMeal = () => {
    const [state, formAction] = React.useActionState(addMeal, { message: null });

    const router = useRouter();

    useEffect(() => {
        if (state.message === "Meal saved successfully!") {
            router.push('/meals');
        }
    }, [state.message, router]);

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Add your <span className={classes.highlight}>meal</span>
                </h1>
                <p>List your meal in your particular restaurant!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Meal Name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <RestaurantDropdown />
                    </div>
                    <p>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="5" required></textarea>
                    </p>
                    <p>
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" step="0.1" />
                    </p>
                    <ImagePicker label="Meal Image" name="image" />

                    {state.message && <p>{state.message}</p>}

                    <p className={classes.actions}>
                        <button type="submit">Create Meal</button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default AddMeal