import Axios, { AxiosError, AxiosResponse } from 'axios';
import { GetFileNameFromUri, GetMimeFromUri } from '../util';
import Constants from 'expo-constants';
import * as qs from 'querystring';
import FormData from 'form-data';
import { StatusCodes } from 'http-status-codes';

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

    static ParseError(e : Error) {
        const axiosError = e as AxiosError;
        if(axiosError.isAxiosError) {
            const code = axiosError.code ?? axiosError.response?.status;
            switch(axiosError.response?.status) {
                case StatusCodes.REQUEST_TOO_LONG:
                    return 'That file is too large! Try using a compressed version.';
                case StatusCodes.INTERNAL_SERVER_ERROR:
                    return 'The servers encountered an error. Please try again later.';
            }
        }
        return 'Something unexpected happened. If this persists, try restarting the app or coming back later.';
    }

    static async SearchByUrl(url : string) : Promise<SearchResponse|string> {
        try {
            const requestUrl = this.BaseUri + '?' + this.GetQueryString({ url });
            const resp : AxiosResponse<SearchResponse> = await Axios.get(requestUrl);
            if(!resp.data.header.message) {
                return resp.data;
            }
            return resp.data.header.message ?? "Something went wrong!";
        }
        catch(e) { return this.ParseError(e); }
    }

    static async SearchByFile(uri : string) : Promise<SearchResponse|string> {
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
            return resp.data.header.message ?? "Something went wrong!";
        }
        catch(e) { return this.ParseError(e); }
    }
}