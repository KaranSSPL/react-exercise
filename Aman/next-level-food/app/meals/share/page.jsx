'use client';

import ImagePicker from '@/_components/meals/image-picker'
import classes from './page.module.css'
import { addRestaurant } from '@/lib/actions'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Share = () => {
    const [state, formAction] = React.useActionState(addRestaurant, { message: null });

    const router = useRouter();

    useEffect(() => {
        if (state.message === "Restaurant saved successfully!") {
            router.push('/meals');
        }
    }, [state.message, router]);

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Add your <span className={classes.highlight}>restaurant</span>
                </h1>
                <p>List your restaurant to reach more food lovers!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Restaurant Name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Restaurant Email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" required />
                    </p>
                    <p>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="5" required></textarea>
                    </p>
                    <p>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" name="rating" step="0.1" min="0" max="5" />
                    </p>
                    <ImagePicker label="Restaurant Image" name="image" />

                    {state.message && <p>{state.message}</p>}

                    <p className={classes.actions}>
                        <button type="submit">Create Restaurant</button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default Share