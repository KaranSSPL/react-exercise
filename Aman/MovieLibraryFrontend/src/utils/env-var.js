/**
 * Gets environment variables
 */
export const envVar = {
    tmdbApi: {
        baseUrl: import.meta.env.VITE_APP_MOVIE_API_BASE_URL ?? '',
        language: import.meta.env.VITE_APP_MOVIE_API_LANGUAGE ?? '',
        token: import.meta.env.VITE_APP_MOVIE_TOKEN ?? '',
        image: {
            baseUrl: import.meta.env.VITE_APP_IMAGE_URL ?? ''
        }
    },
    reviewApi: {
        baseUrl: import.meta.env.VITE_APP_REVIEW_API_BASE_URL ?? ''
    }
};