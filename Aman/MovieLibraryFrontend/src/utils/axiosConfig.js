import { envVar } from "./env-var";

export const config = {
    headers: {
        Authorization: `Bearer ${envVar.tmdbApi.token}`,
    }
};