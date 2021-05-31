export const GetFileNameFromUri = (uri : string) => {
    return uri.split('/').pop();
}

export const GetFileTypeFromUri = (uri : string) => {
    return GetFileNameFromUri(uri)?.split('.').pop();
}