interface SearchResponse {
    results?: SearchResult[];
    header: SearchResponseHeader;
}

interface SearchResponseHeader {
    message?: string;
}

interface SearchResult {
    header: SearchResultHeader;
    data: SearchResultData;
}

interface SearchResultHeader {
    similarity: string;
    thumbnail: string;
    index_name: string;
    index_id: number
}

interface SearchResultData {
    ext_urls: string[];
    title?: string;
}

type SearchType = "Url" | "File";