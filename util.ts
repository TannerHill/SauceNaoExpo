import mime from 'mime-types';
export const GetFileNameFromUri = (uri : string) => {
    return uri.split('/').pop();
}

export const GetFileTypeFromUri = (uri : string) => {
    return GetFileNameFromUri(uri)?.split('.').pop();
}

export const GetMimeFromUri = (uri : string) => {
    const fileName = GetFileNameFromUri(uri);
    return fileName ? mime.lookup(fileName) : null;
}