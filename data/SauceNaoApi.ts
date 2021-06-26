import Axios, { AxiosResponse } from 'axios';
import { GetFileNameFromUri, GetMimeFromUri } from '../util';
import Constants from 'expo-constants';
import * as qs from 'querystring';
import FormData from 'form-data';

export default class SauceNaoApi {
    static BaseUri = Constants.manifest.extra!!.sauceNaoBaseUrl + "/search.php";

    static DefaultQueryParameters = {
        output_type: 2
    };

    static GetQueryString(parameters : Object|null=null) {
        let paramObject : any = {
            ...this.DefaultQueryParameters,
            ...parameters,
        };
        return qs.stringify(paramObject);
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

    static async SearchByFile(uri : string) : Promise<SearchResponse|null> {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri,
                name: GetFileNameFromUri(uri),
                type: GetMimeFromUri(uri)
            });

            const requestUrl = this.BaseUri + '?' + this.GetQueryString();
            const resp : AxiosResponse<SearchResponse> = await Axios.post(requestUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(!resp.data.header.message) {
                return resp.data;
            }
            console.log(resp.data.header.message); // TODO: Show as error to user?
        }
        catch(e) { console.log('Exception: ' + e); }
        return null;
    }
}