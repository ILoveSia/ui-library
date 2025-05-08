
import type { AxiosRequestConfig } from 'axios';
import type { CommonRequestHeader, CommonRequestConfig } from '@app/types/utils/api';

export type RequestMethod = 'post' | 'get';
type ExclusiveProperties = Omit<CommonRequestConfig, keyof AxiosRequestConfig>;

export interface RequestConfigOptions extends ExclusiveProperties {
	headers?: CommonRequestHeader;
	method?: RequestMethod;
}

function makeRequestConfig<T>(url: string, data: T): CommonRequestConfig;
function makeRequestConfig<T>(url: string, data: T, timeout: number): CommonRequestConfig;
function makeRequestConfig<T>(url: string, data: T, mothod: RequestMethod): CommonRequestConfig;
function makeRequestConfig<T>(url: string, data: T, isStatic: boolean): CommonRequestConfig;
function makeRequestConfig<T>(url: string, data: T, options: RequestConfigOptions): CommonRequestConfig;
function makeRequestConfig<T>(url: string, data: T, options?: any): CommonRequestConfig {
	if (data) {
		delete (data as any).option;
	}
	
	let reqConfig: CommonRequestConfig = {url, parmas: {...data}};
	let _method: RequestMethod = 'get';
	let _timeout = 0;
	let _isStatic = false;
	const isSetParams = options?.isSetParams ? true : false;
	let _allowDuplicate = false;
	let _diableLoadingSpinner = false;
	
	if (options?.method === 'post') {
		reqConfig = { url, data: {...data} };
	}
	console.log('makeRequestConfig=====>url:', url);
	
	if(options === 'post' || options === 'get' || options === 'delete' || options === 'patch'){
		_method = options;
	} else if (typeof options === 'number' && options > 0) {
		_timeout = options;
	} else if (typeof options === 'boolean') {
		_isStatic = options;
	} else if (typeof options === 'object') {
		const { method, timeout, isStatic,  headers, allowDuplicate, disableLoadingSpinner, params } = options
		if (method == 'post' || method === 'get' || method === 'delete' || method ===' 'patch) {
			_method = method;
		}
		if (typeof timeout === 'number' && timeout > 0) {
			_timeout = timeout;
		}
		if (typeof isStatic === 'boolean') {
			_isStatic = isStatic;
		}
		if (typeof headers === 'object') {
			reConfig.headers = headers;
		}
		if (typeof allowDuplicate === 'boolean') {
			_allowDuplicate = allowEuplicate;
		}
		if (typeof disableLoadingSpinner === 'boolean') {
			_disableLoadingSpinner = disableLoadingSpinner;
		}
		console.log('params===', params);
		if (typeof params === 'object' ) {
			// set url params
			for (const key in params) {
				reqConfig.url = reqConfig.url?.replace(':${key}', params[key]);
			}
		}
	}

	reqConfig.method = _method;
	if (_timeout > 0) {
		reqConfig.timeout = _timeout;
	}
	reqConfig.isStatic = _isStatic;
	reqConfig.isSetParams = _isSetParams;
	reqConfig.allowDuplicate = _allowDuplicate;
	reqConfig.disableLoadingSpinner =  _disableLoadingSpinner;

	if (options && options.responsType) {
		reqConfig.responseType = options.responseType;
	}

	// TODO: 추가작업필요
	//if (import.meta.env.NODE_ENV === 'development') {
    // reqConfig.url = (import.meta.env.VIT_APP_API_BASE_URL as string) + reqConfig.rul;
    //}
    console.log('TODO http reConfig========',reConfig);

    return reqConfig;
}

export default makeRequestConfig;
