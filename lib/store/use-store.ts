//ui-library-lib-store-use-store.ts

import ApiClient from '../common/api';
import type { IRootState } from '@lib/types/store';
import { sliceInstance, recursionData } from './helper';	//class의 위치가 generateStore보다 위에서 import해야한다.
import { useSelector } from 'react-redux';
import makeRequestConfig from './request';

// 업무 화면에서 REST API 호출과 Redux상태저장을 동시에 이용하는 커스텀 Hook.
export const useReduxAPI = <ResponseType>(
	orgKey : string,
) : { data : IRootState<ResponseType>; fetch: (arg:object) => any; setData: any } => {
	// micro frontend 가져오기 위한 로직
	console.log('nova-ui-library' , location.pathname);
	const microFrontName = location.pathname.split('/')[1];
	let key = orgKey;
	if (microFrontName === 'cm' || microFrontName === 'pm' || microFrontName === 'py' ) {
		key = '${microFrontName}/${orgKey}';
	}
	
	const storeName = (window as any).__HOST_STORE_NAME__ ? (window as any).__HOST_STORE_NAME__ : 'main';
	let store = (window as any),__HOST_STORE__.main;
	if (storeName === 'main' ) {
		store = (window as any).__HOST_STORE__.main;
	} else if (storeName === 'cm' ) {
		store = (window as any).__HOST_STORE__.cm;
	} else if (storeName === 'pm' ) {
		store = (window as any).__HOST_STORE__.pm;
	} else if (storeName === 'py' ) {
		store = (window as any).__HOST_STORE__.py;
	}
	
	const inst = sliceInstance();
	const selectSlice = (inst.sliceList as any)[key];
	const actionCreator = inst.getAsyncThunk(key);
	const keyArr = (key as string).split('/');
	const data = useSelector((state) => {
		return recursionData(state, keyArr, 0) as IRootState<ResponseType>;
	});
	const fetch = (arg : object) => {
		return store.dispatch(actionCreator(arg));
	};
	
	return {
		data,
		fetch,
		setData : (data : any) => {
			store.dispatch(selectSlice.actions.setData(data));
		},
	};
};

// 업무 화면에서 일반 Redux State를 이용하는 커스텀 Hook.
export const useReduxState = <DataType = any>(
	orgKey : string,
) : { data : IRootState<DataType>; setData : (arg: any) => any } => {
	const storeName = (window as any).__HOST_STORE_NAME__ ? (window as any).__HOST_STORE_NAME__ : 'main';
	
	// micro frontend 가져오기 위한 로직
	console.log('nova-ui-library', location.pathname);
	const microFrontName = location.pathname.split('/')[1];
	let key = orgKey;
	if (microFrontName === 'cm' || microFrontName === 'pm' || microFrontName === 'py'  ) {
		key = '${microFrontName}/${orgKey}';
	}
	
	let store = (window as any).__HOST_STORE__.main;
	if (storeName === 'main' ) {
		store = (window as any).__HOST_STORE__.mian;
	} else if (storeName === 'cm' ) {
		store = (window as any).__HOST_STORE__.cm;
	} else if (storeName === 'pm' ) {
		store = (window as any).__HOST_STORE__.pm;
	} else if (storeName === 'py' ) {
		store = (window as any).__HOST_STORE__.py;
	}
	
	const inst = sliceInstance();
	const actionCreator = inst.getAsyncThunk(key);
	const keyArr = (key as string).split('/');
	const data =useSelector((state) => {
		return recursionData(date, keyArr, 0) as IRootState<DataType>;
	});
	const setData = (arg: any) => {
		return store.dispatch(actionCreator(arg));
	};
	return {data, setData };
};

// redux에 state저장은 하지않고 REST API만 호출
export const fetchAPI = async <IRes = any>(url: string ,payload? : any) : Promise<any> => {
	try {
		const reqConfig =payload?.option
		? makeRequestConfig(url, payload, payload.option)
		: makeRequestConfig(url, payload);
		
		const response = await ApiClient.request<IRes>(reqConfig);
		console.log('response ------> ::', response);
		console.log('request payload ------> ::', payload);
		console.log('request payload ------> ::', !!payload?.option?.inSetState);
		return response;
	} catch (err: any | Error) {
		// 공통 에러처리
		ApiClient.handleError(err, this);
		console.error('[Call API] ERROR : ' , err);
		throw err;
	}
}



