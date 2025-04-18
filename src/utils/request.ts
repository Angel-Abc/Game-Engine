import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'

interface AxiosApiClient {
    instance: AxiosInstance
    get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
    getString: (url: string, config?: AxiosRequestConfig) => Promise<string>
    getWithMapping: <T>(url: string, mapper: (data: any) => T, config?: AxiosRequestConfig) => Promise<T>
    post: <T, R>(url: string, body: R, config?: AxiosRequestConfig) => Promise<T>
    setBearerToken: (token: string) => void
}

// Function to create a custom axios instance with default interceptors
const createApiClient = (config?: AxiosRequestConfig, token?: string, customErrorHandler?: (error: AxiosError) => boolean): AxiosApiClient => {
    let bearerToken = token
    const instance = axios.create(config)
    const errorHandler = customErrorHandler

    // Add the bearer token to each axios request, when set
    instance.interceptors.request.use((config) => {
        if (bearerToken) {
            config.headers.Authorization = `Bearer ${bearerToken}`
        }
        return config
    })

    // Default error handling for all requests
    instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (errorHandler && errorHandler(error)) {
                return Promise.reject(error)
            }

            if (!error.response) {
                console.error('Network or unknown error', error.message)
                return Promise.reject(error)
            }

            const { data, status } = error.response

            // TODO: proper error handling
            switch (status) {
                case 400:
                    console.error('Bad Request:', data)
                    break
                case 401:
                    console.warn('Unauthorized. Consider refreshing the token.')
                    // handle unauthorized
                    break
                default:
                    console.error(`Unexpected Error [${status}]:`, data)
                    break
            }

            return Promise.reject(error)
        }
    )

    // Helper function to extract the data from the response
    const extractResponseData = <T>(response: AxiosResponse<T>) => response.data

    // Helper function to map response data using a provided mapper
    const mapResponseData = async <T>(url: string, mapper: (data: any) => T, config?: AxiosRequestConfig): Promise<T> => {
        const response = await instance.get(url, config)
        const data = extractResponseData(response)
        return mapper(data)
    }

    return {
        instance,
        get: <T>(url: string, config?: AxiosRequestConfig) => instance.get<T>(url, config).then(extractResponseData),
        getString: (url: string, config?: AxiosRequestConfig) => instance.get(url, config).then(response => response.data),
        getWithMapping: <T>(url: string, mapper: (data: any) => T, config?: AxiosRequestConfig) => mapResponseData(url, mapper, config),
        post: <T, R>(url: string, body: R, config?: AxiosRequestConfig) => instance.post<T>(url, body, config).then(extractResponseData),
        setBearerToken: (token: string) => {
            bearerToken = token
        }
    }
}

// Export createApiClient
export default createApiClient
export {
    AxiosApiClient
}