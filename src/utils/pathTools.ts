export function combine(path: string, filePath: string) {
    const result = 
        (path.endsWith('/') ? path : `${path}/`) +
        (filePath.startsWith('/') ? filePath.substring(1) : filePath)
    return result
}