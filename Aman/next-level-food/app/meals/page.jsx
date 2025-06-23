import Link from 'next/link'
import classes from './page.module.css'
import MealsGrid from '@/_components/meals/meals-grid'
import { GetMeals } from '../api/meal/route'
import { Suspense } from 'react'
import MealsLoadingPage from './loading-out'
import { notFound } from 'next/navigation'

const MealsPage = async () => {
    const meals = await GetMeals();
    if (!meals) {
        notFound();
    }

    // const meals = await res.json();
    return <MealsGrid meals={meals} />
}

const Meals = () => {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Discover delicious meals <span className={classes.highlight}>near you</span>
                </h1>
                <p>Browse restaurants and explore their most popular dishes. Ordering made easy!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share" style={{ marginRight: '10px' }}>
                        <Suspense fallback={<MealsLoadingPage />}>
                            Inquiry for new restaurant
                        </Suspense>
                    </Link>
                    <Link href="/meals/addMeal">
                        <Suspense fallback={<MealsLoadingPage />}>
                            Add new Meal
                        </Suspense>
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<MealsLoadingPage />}>
                    <MealsPage />
                </Suspense>
            </main>
        </>
    )
}

export default Meals