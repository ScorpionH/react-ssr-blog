
import axios from 'axios'
const BASE_URL = "http://localhost:4396/api/";
type option = {
    method: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK" | undefined,
    url: string,
    params?: object,
    data?: object,
    headers?: any

}
async function request<T>(option: option): Promise<{ status?: number, data?: T}> {
    const response = await axios({
        ...option,
        url: BASE_URL + option.url,
    });
    const { status, data } = response;
    if (200 <= status && status < 400)
        return {status: 1, data};
    else {
        return {status: 0}
    }

}
export function getArticleList<T>() {
    return request<T>({
        method: 'get',
        url: 'articleList'
    })
}
export function getArticle<T>(id: string){
    return request<T>({
        method: 'get',
        url: 'article',
        params: {id}
    })
}
export function insert<T>(data: object){
    return request<T>({
        method: 'post',
        url: 'article/insert',
        data,
        headers: {
            'Content-Type': 'application/form-data'
        }
    });
}