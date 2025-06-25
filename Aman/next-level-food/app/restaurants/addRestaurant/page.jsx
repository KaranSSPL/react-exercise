'use client';

import ImagePicker from '@/_components/meals/image-picker'
import classes from './page.module.css'
import { addRestaurant, updateRestaurant } from '@/lib/actions'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Share = () => {
    const [state, formAction] = React.useActionState(addRestaurant, { message: null });

    const [stateUpdate, formActionUpdate] = React.useActionState(updateRestaurant, { message: null });

    const router = useRouter();
    const searchParams = useSearchParams();

    const restaurantName = searchParams.get('restaurant');
    const [formData, setFormData] = useState(null);

    const fetchRestaurant = async (name) => {
        const slug = name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/'/g, '')
            .replace(/&/g, '');

        const res = await fetch(`/api/restaurant/${slug}`);

        if (!res.ok) {
            throw new Error('Restaurant not found');
        }

        return await res.json();
    };

    useEffect(() => {
        if (restaurantName) {
            fetchRestaurant(restaurantName).then(data => setFormData(data));
        }
    }, [restaurantName]);

    useEffect(() => {
        if (state.message === "Restaurant saved successfully!" || stateUpdate.message === "Restaurant updated successfully!") {
            router.push('/admin/restaurant');
        }
    }, [state.message, stateUpdate.message, router]);

    return (
        <>
            <header className={classes.header}>
                <h1>
                    {restaurantName ? 'Edit' : 'Add'} <span className={classes.highlight}>restaurant</span>
                </h1>
                <p>{restaurantName ? `Update ${formData?.name} restaurant details.` : 'List your restaurant to reach more food lovers!'}</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={restaurantName ? formActionUpdate : formAction}>
                    <input type='hidden' name="id" defaultValue={formData?.id || ''} />
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Restaurant Name</label>
                            <input type="text" id="name" name="name" defaultValue={formData?.name || ''} required />
                        </p>
                        <p>
                            <label htmlFor="email">Restaurant Email</label>
                            <input type="email" id="email" name="email" defaultValue={formData?.email || ''} required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" defaultValue={formData?.location || ''} required />
                    </p>
                    <p>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" defaultValue={formData?.description || ''} rows="5" required></textarea>
                    </p>
                    <p>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" name="rating" step="0.1" min="0" max="5" defaultValue={formData?.rating || ''} />
                    </p>
                    <ImagePicker label="Restaurant Image" name="image" existingImage={formData?.image} />

                    {state.message && <p>{state.message}</p>}

                    <p className={classes.actions}>
                        <button type="submit">{restaurantName ? 'Update Restaurant' : 'Create Restaurant'}</button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default Share