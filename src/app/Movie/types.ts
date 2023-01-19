export type PopulerTV = {
    id: number
    name: string
    vote_average: string
    first_air_date: string
    backdrop_path: string
    poster_path: string
    overview: string
    seasons: Season[]
}

export type Season = {
    poster_path: string,
    name: string,
    air_date: string,
    episode_count: number,
    overview: string,
}