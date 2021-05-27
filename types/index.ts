interface SearchResponse {
    results?: SearchResult[];
    header: SearchResponseHeader;
}

interface SearchResponseHeader {
    message?: string;
}

interface SearchResult {
    header: SearchResultData;
    data: SearchResultData;
}

interface SearchResultHeader {
    similarity: string;
    thumbnail: string;
    index_name: string;
}

interface SearchResultData {
    ext_urls: string[];
    title?: string;
}

type SearchType = "Url" | "File";