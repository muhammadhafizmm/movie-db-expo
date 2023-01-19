import { httpGet } from "./http-common";

export async function getPopuler(page?:number) {
    return await httpGet('/tv/popular', {page: page})
}

export async function getTVItem(tvId: number) {
    return await httpGet(`/tv/${tvId}`)
}