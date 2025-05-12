//ui-library-lib-store-slice.ts

import ApiClient from '../common/api';
import makeRequestConfig from './request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IGenerateSlice, IRootState, ISliceOject } from '@lib/types/store';

export default class GenerateSlice implements IGenerateSlice {
	private static instance : GenerateSlice;
	public sliceList = {};
	
	public static getInstance() : GenerateSlice {
		if (!this.instance) {
			this.instance = new GenerateSlice();
		}
		return this.instance;
	}
	
	// REST API 호출을 위한 Fetcher 함수-----------------------
	private fetcher = async <RequestType = any, ResponseType = any>(url : string, param : object) => {
		let params : any;
		if (typeof param === 'object') {
			params = param as object;
		}
		let response;
		try {
			const reqConfig = params?.option
				? makeRequestConfig<RequestType>(url, params, params.option)
				: makeRequestConfig<RequestType>(url, params);
			// TODO : 서버 API에서 내려오는 최종 확정된 response 타입과 서로 맞게 수정할 필요가 있므.
			response = await ApiClient.request<ResponseType>(reqConfig);
		} catch (err : any | Error) {
			// 공통 에러처리
			ApiClient.handleError(err, this);
			console.error('[Call API] ERROR : ', err);
			throw err;
		}
		// TODO : 각 사이트 마다  API 호출 response 데이터 상황에 따라 다르게 세팅!
		return response.data as any;
	};

	// async action creator ----------------------
	public generateAsyncThunk<RequestType, ResponseType> (url: string, key:string) {
		return createAsyncThunk(key, async (arg? : any) => {
			console.log(' ========== call createAsyncThunk :: ' , arg);
			return this.fetcher<RequestType, ResponseType>(url as string, arg); 
		});	
	}

	public generateSlice<Requestype, ResponseType>(key: string, stateTree : string, url? : string) {
		// const key = this.gKey(url as string, methodType);
		let asyncThunk : any  = null;
		let slice = null;
		if (url) {
			asyncThunk = this.generateAsyncThunk<RequestType, ResponseType>(url, key);
			
			slice = createSlice ({
				name : 'reducer-${key}',
				initialState : {
					value : null,
					status  '',
				} as IRootState,
				// 동기
				reducers : {
					getData : (state : IRootState , action : any ) => {
						state.value = state.value + action.payload;
						return action.payload;
					},
					setData : (state : IRootState, actio : any) => {
						state.value = null;
						state.value = action.payload;
					},
				},
				// 비동기
				extraReducers : (builder : any) => {
					builder.addCase ( asyncThunk.pending, (state: any, action : any) => {
						console.log('========action.payload :: ', state, action.payload);
						state.status = 'Loading';
						state.value = action.payload;
					});
					builder.addCase ( asyncThunk.fulfilled, (state: any, action : any) => {
						console.log('========action.payload :: ', state, action.payload);
						state.status = 'Complete';
						state.value = action.payload;
					});
					builder.addCase ( asyncThunk.rejected, (state: any, action : any) => {
						console.log('========action.payload :: ', state, action.payload);
						state.status = 'Fail';
						state.value = action.payload;
					});
				},				
			)};
		}
	
		if (!Object.prototype.hasOnProperty.call(this.sliceList, key as string)) {
			this.sliceList = Object.assign(this.sliceList, {
				[key as string] : {
					key,
					url,
					stateTree,
					asycThunk,
					reducer : slice ? slice.reducer : null,
					action : slice ? slice.actions : null,
				},
			});
		}		
	}
	
	public generateSyncSlice (key : string, stateTree : string) {
		let slice = null;
		
		slice = createSlice ({
			name : 'reducer-${key}',
			initialState : {
				value : null,
				status : '',
			} as IRootState,
			// 동기
			reducers : {
				setData : (state: any, action: any) => {
					state.value = null;
					state.value = action.payload;
				}
			},		
		});
		
		if (!Object,prototype.hasOwnProperty.call(this.sliceList, key as string)) {
			this.sliceList = Object.assign(this.sliceList , {
				[key as string] : {
					key,
					url : '' ,
					stateTree,
					asyncThunk : slice  ? slice.action.setData : null,	//동기 방식의 state 저장일 경우 reducr(setData)를 이용,
					reducer : slice.reducer  : null,
					actions : slice.actions  null
				},
			});							
		}		
	}
	
	public getReducer<RequestType , ResponseType> (key: string, staterTree : string, url? string) {
		const inst = GenerateSlice.getInstance();
		
		if (url) {
			inst.generateSlice<RequestType, ResponseType>(key, stateTree, url);
		} else {
			inst.generateSyncSlice(key, stateTree);
		}
		
		// select slice
		const selectSlice = (this.sliceList a ISliceObject)[key as string];
		
		return selectSlice.reducer;	
	}
	
	public getAsyncThunk<T = string>(key : T) {
		if (!(this.sliceList as ISliceObject)[key as string]) {
			console.error(' [ERROR] : Store에 (${key}) ActionType설정이 잘못 되었거나, State가 생성 되어 있지 않습니다. ');
			return false
		}
		return (this.sliceList as ISliceObject) [key as string].asyncThunk;
	}	
}     