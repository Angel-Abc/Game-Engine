import { AxiosError } from 'axios'
import createApiClient, { AxiosApiClient } from 'Utils/request'

const apiClient: AxiosApiClient = createApiClient(undefined, undefined, (error: AxiosError<unknown, any>) => {
    const { status } = error
    if (status === 401){
        document.location = '/api/admin/login'
        return true
    }
    return false
})

export default {
    get: <T>(url: string):Promise<T> => apiClient.get<T>(url),
    getWithMapping: <T>(url: string, mapper: (data: any) => T): Promise<T> => apiClient.getWithMapping<T>(url, mapper),
    post: <T, R>(url: string, body: R):Promise<T> => apiClient.post<T, R>(url, body),
    setBearerToken: (token: string): void => apiClient.setBearerToken(token),
    getString: (url: string): Promise<string> => apiClient.getString(url, {responseType: 'text'})
}
