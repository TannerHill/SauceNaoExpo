import Axios, { AxiosResponse } from 'axios';

export default class SauceNaoApi {
    static BaseUri = "https://saucenao.com/search.php";

    static DefaultQueryParameters = {
        output_type: 2
    }

    static GetQueryString(parameters : Object|null=null) {
        const searchParams = new URLSearchParams();
        if(process.env.API_KEY)
            searchParams.append("api_key", process.env.API_KEY);
        for(let [key,val] of Object.entries({ ...this.DefaultQueryParameters, ...parameters })) {
            searchParams.set(key, val!!.toString());
        }
        return searchParams.toString();
    }

    static async SearchByUrl(url : string) : Promise<SearchResponse|null> {
        try {
            const requestUrl = this.BaseUri + '?' + this.GetQueryString({ url });
            const resp : AxiosResponse<SearchResponse> = await Axios.get(requestUrl);
            if(!resp.data.header.message) {
                return resp.data;
            }
            console.log(resp.data.header.message); // TODO: Show as error to user?
        }
        catch(e) { console.log(e) }
        return null;
    }

    static async SearchByFile(file : ArrayBuffer) : Promise<SearchResponse|null> {

        return null;
    }
}