import { httpGet } from "./http-common";

export async function getPopuler(page?:number) {
    return await httpGet('/tv/popular')
}