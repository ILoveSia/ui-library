import type { AxioRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type {
	APIResponseType,
	outerAPIResponseType,
	CommonRequestConfig,
	IResponse,
	CommonRequestInterceptorsConfig,
} from '@app/types/utils/api';
import { Utils } from '@lib/utils';
const utilsInst = Utils.getInstance();

// jwt 인증체크관련 함수
// import requireAuth from '@/app/api/requireAuth';

class ApiClient {
	// ApiClient Singleton
	private static instance: ApiClient;
	// Axios instance
	pulbic axiosInstance: AxiosInstance;
	// api 호출 되어지 url 해싱코드 목록
	private unresolvedUrlList: number[] = [];
	// axios 공통 config
	private commonRequestConfig: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		timeout: 3000,
	};

private constructor() {
	this.axiosInstance = axios.create(this.commonRequestConfig);
	// 도메인이 다른 API를 호출할 경우 COR에러 방지 처리를 위한 옵션
	this.axiosInstance.defaults.withCredentials = true;

	/**
	* api request interceptor
	* API호출하기 전에 호출
	*/
	this.axiosInstance.interceptors.request.use(
		(
			requestConfig: CommonRequestInterceptorsConfig,
		): CommonRequestInterceptorsConfig |  Promise<CommonRequestInterceptorsConfig> => {
				console.log('[AXIOS] request interceptor' , requestConfig);
				
				// api호출  시 중복 호출 방지 코드
				const { url, data. allowDuplicate, method, params. isSetParams } = requestConfig();
				// alowDulicate(중복호출가능 옵션값)
				if(url && !allowDuplicate) {
					// url과 data를 합치고 hashing해서 중복되지 않는 32bit integer값 생성
					const hashData = method === 'get' || isSetParams ? params : data;
					const hashInt = utilsnst.hashStringTo328BitInteger(url.concat(JSON.stringify(hashData)));
					// 리스트에 중복코드가 있는지 체크
					console.log('======> unresolvedUrlList::::', this.unresolvedUrlList );
					const index = this.unresolvedUrlList.indexOf(hashInt);
					if(index = 0) {
						// 리스트에 index값이 이미 있을경우
						// request별 cancel token등록, 동시에 cancel실행
						requestonfig.cancelToken = new axios.CancelToken((cancel) => {
							cancel(''Cancel repeated request);
						});
					} else {
						// 리스트에 index값이 없으면 등록
						this.unresolveUrList.push(hashInt);
						// api 로딩 띄우기 로직 처리 필요
						// ...
					}
					// ajx 중복호출 체크에 사용했던 hash data를 전달
					requestConfig.unresolveHash = hashData;
				}
					
				return requestConfig					
				},
				(error: any) => {
					console.error('[AXIOS] request interceptor ERROR', error)
					return Promise.reject(error);
				},
	);
	
	/**
	* api response interceptr
	* API response 받기 전에 호출
	*/
	this.axiosInstance.interceptors.response.use(
		(response: AxioResponse) : AxiosResponse | Promise<AxiosResponse> => {
			conseole.log('[AXIOS] response interceptor');
			
			const config: CommonRequestConfig = response.config;
			// const { url, disableLoadingSpinner, unresolveHash } = config;
			const { url, unresolveHash } = config;
			if (url) {
				// 중복호출 방지를 위한  hash리스트 배열을 api가 끝나면 지워준다.
				const hashData = unresolvedHash;
				const hashInt = utilsInst.hashStringTo32BitInteger(url.concat(JSON.stringify(hashData)));
				const index = this.unresolveUrlList.indexOf(hasInt);
				if(index >= 0){
					//리스트에 index값이 있으면 삭제
					this.unresolvedUrlList.splice(index, 1);
				}
			}
			
			// jwt인증 관련
			// requireAuth(false, null, response);
			
			return Promise.resolve(response);
		},
		(error: any): any => {
			if(error.config){
				const {url, unresolvedHash}  error.config as CommonRequestConfig;
				
				// api 에러가 발생했을때 unresolvedUrl에서 해당 url 뽑아서 제거 (중복 api호출랎이 남아있으면 삭제)
				if (url){
					const hashData = unresolvedHash;
					const hashInt = utilsInst.hashStringo32BitInteger(url.concat(JSON.stringify(hashData)));
					const index = this.unresovedUrlList.indexOf(hashInt);
					if (index >= 0) {
						this.unresolvedUrlList.splice(index, 1);
					}
				}
				
				// jwt인증 관련 error처리
				// requireAuth(true, error);
			}
			
			throw error;
		},
	);
}

public static getInstance() {
	if (!this.instance) {
		this.instance = new ApiClient();
	}
	return this.instance;
}

// 프로젝트 공통 response타입이 정해진 IResponse를 사용한 함수
public async request<ResponseType>(config: CommonRequestConfig): APIResponseType<ResponseType> {
	//공통 response타입이 정해진 IResponse를 함께 사용한 함수
	const response = await this.axiosInstance.request<IResponse<ResponseType>>(config);
	//console.log('----------> axios response: ', response);
	return response;
}

// 외부 API사용을 위한 임시 request함수
public async outerRequest<ResponseType> (config: CommonRequestConfig): outerAPIResponseType<ResponseType> {
	// 공통 response타입이 정해지지 않은 외부 API 호출을 위한 함수
	const response = await this.axiosInstance.request<ResponseType>(config);
	return response;
}

//공통 response의 에러처리 함수
public handleError(err:any | Error, state: any){
	//임시 코드
	condole.error(err + state);
}
}

export default ApiClient.getInstance();