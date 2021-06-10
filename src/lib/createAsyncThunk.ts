import { Dispatch } from "redux";
import { AsyncActionCreatorBuilder } from "typesafe-actions";

type AnyAsyncActionCreator = AsyncActionCreatorBuilder <any, any, any> ;

type AnyPromiseCreator = (...params : any[]) => Promise<any>;

export default function createAsyncThunk< A extends AnyAsyncActionCreator ,F extends AnyPromiseCreator>( asyncActionCreator :A , promiseCreator :F){
  type Params = Parameters<F>;
  return function thunk(...parmas :Params) {
    return async(dispatch: Dispatch) =>{
      const {request, success, failure} = asyncActionCreator ;
      dispatch(request(undefined));
      try {
        const result = await promiseCreator(...parmas);

        dispatch(success(result));
      } catch (e) {
        dispatch(failure(e));
      }
    }
  }
}