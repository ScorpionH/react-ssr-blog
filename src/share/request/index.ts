import api from './api'
const BASE_URL = "http://localhost:4396/";
type option = {
    method: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK" | undefined,
    url: string,
    params?: any,
    data?: any,
    header?: any

}
async function request(option: option): Promise<{ status?: number, data?: any }> {
    const response = await api.request({
        ...option,
        url: BASE_URL + option.url
    });
    const { status, data } = response;
    if (200 <= status && status < 400)
        return { data };
    else {
        throw new Error(status.toString())
    }

}
export async function getList() {
    return request({
        method: 'get',
        url: 'api/data'
    })
}