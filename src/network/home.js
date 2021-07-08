import { request } from "./request";
export function getHomeMutlidata() {
    return request({
        url: '/home/multidata'
    })
}
