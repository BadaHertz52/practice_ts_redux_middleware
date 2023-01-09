# Typescript 에서 redux middleware 사용하기 3. redux- thunk, redux-saga 리팩토링

### <"Typescript 에서 redux middleware 사용하기" 시리즈>
###### * 위의 시리즈는✨ **[해당 수업 내용](https://react.vlpt.us/using-typescript/06-ts-redux-middleware.html)** 을 실습하고 공부하며 개인적으로 보충한 것입니다. ☺

#### 1. 시리즈
  * [redux- thunk](https://github.com/BadaHertz52/practice_ts_redux-thunk)
  * [redux- saga](https://github.com/BadaHertz52/practic_ts_redux-saga)
  * [redux- thunk, redux-saga 리팩토링](https://github.com/BadaHertz52/practice_ts_redux_middleware ) 

#### 2. 구현하고자 한 기능 
#####  redux-thunk 와 redux-saga 버튼을 누르면 각각의 라이브러리를 사용하여 검색창에 사용자명을 조회할 수 있고  Git hub에서의 조회한 사용자가 있는 지 확인하고, 사용자가 있을 시 해당 계정의 username, thumbnail, bio, blog  를 보여주고 사용자가 없을 시 에러가 발생했다는 것을 보여주는 것을 구현하고 자 했다. 
-------------------------------------------------------------------------------------------------------------------------------------

### < Typescript 에서 redux-thunk, redux-saga 사용하기 - AsyncActionCreatorBuilder 으로 리팩토링>

#### 1. 사용된 라이브러리
##### react, redux, redux-react, typesafe-actions, redux-thunk, redux-saga, acxios 


#### 2. 코드 구성
|reducer store |middleware|presentational components|container|
|--------------|----------|-------------------------|-------------------|
|ations <br >types <br> reducers <br> index|createAsyncThunk <br>createAsyncSaga <br> thunks<br> sagas     |GithubProfileInfo <br> GithubUsernameForm        |GithubProfileLoaderThunk <br> GithubProfileLoaderSaga|

* ations : 액션 타입과 액션 생성함수 정의

* types : 리듀서 함수의 인자인 state, action의 타입을 정의

* reducer : 초기 상태와 리듀서 함수 정의

* index : 
  *  moduels/github/index.ts : actions , types,reducers, thunks 를 외부로 내보냄 
  * moduels/index.ts : 루트 리듀서와 Rootstate (루트 리듀서와 같은 타입) 을 생성하고 외부로 보냄 

* thunks : redux-thunk 함수 정의 

* sagas : redux-saga 함수 정의 

* GithubProfileInfo : 조회 결과에 따른 사용자 정보를 보여주는 뷰

* GithubUsername : username을 입력하고 결과를 조회할 수 있는 뷰 

* GithubProfileLoaderThunk : redux-thunk를 기반으로 스토어에 상태 조회, 액션을 디스패치 함 

* GithubProfileLoaderThunk : redux-sga를 기반으로 스토어에 상태 조회, 액션을 디스패치 함 


#### 3. 배운 내용 

##### 1)  AsyncActionCreatorBuilder

* 수업 내용 중 추가해야 할 사항 :  AsyncActionCreactor 가 AsyncActionBuilder로 바뀜

##### ① what is AsyncActionBuilder?
``` typescript
type AsyncActionCreatorBuilder<TRequest extends [TType1, TPayload1] | [TType1, [TPayload1, TMeta1]] | [TType1, TArgs1, TPayload1] | [TType1, TArgs1, [TPayload1, TMeta1]], TSuccess extends [TType2, TPayload2] | [TType2, [TPayload2, TMeta2]] | [TType2, TArgs2, TPayload2] | [TType2, TArgs2, [TPayload2, TMeta2]], TFailure extends [TType3, TPayload3] | [TType3, [TPayload3, TMeta3]] | [TType3, TArgs3, TPayload3] | [TType3, TArgs3, [TPayload3, TMeta3]], TCancel extends [TType4, TPayload4] | [TType4, [TPayload4, TMeta4]] | [TType4, TArgs4, TPayload4] | [TType4, TArgs4, [TPayload4, TMeta4]] = never, TType1 extends TypeConstant = TRequest[0], TPayload1 = TRequest extends [TType1, any, [any, any]] ? TRequest[2][0] : TRequest extends [TType1, any, any] ? TRequest[2] : TRequest extends [TType1, [any, any]] ? TRequest[1][0] : TRequest[1], TMeta1 = TRequest extends [TType1, any, [any, any]] ? TRequest[2][1] : TRequest extends [TType1, [any, any]] ? TRequest[1][1] : never, TArgs1 extends any[] = TRequest extends [TType1, any, any] ? TRequest[1] : never, TType2 extends TypeConstant = TSuccess[0], TPayload2 = TSuccess extends [TType2, any, [any, any]] ? TSuccess[2][0] : TSuccess extends [TType2, any, any] ? TSuccess[2] : TSuccess extends [TType2, [any, any]] ? TSuccess[1][0] : TSuccess[1], TMeta2 = TSuccess extends [TType2, any, [any, any]] ? TSuccess[2][1] : TSuccess extends [TType2, [any, any]] ? TSuccess[1][1] : never, TArgs2 extends any[] = TSuccess extends [TType2, any, any] ? TSuccess[1] : never, TType3 extends TypeConstant = TFailure[0], TPayload3 = TFailure extends [TType3, any, [any, any]] ? TFailure[2][0] : TFailure extends [TType3, any, any] ? TFailure[2] : TFailure extends [TType3, [any, any]] ? TFailure[1][0] : TFailure[1], TMeta3 = TFailure extends [TType3, any, [any, any]] ? TFailure[2][1] : TFailure extends [TType3, [any, any]] ? TFailure[1][1] : never, TArgs3 extends any[] = TFailure extends [TType3, any, any] ? TFailure[1] : never, TType4 extends TypeConstant = TCancel[0], TPayload4 = TCancel extends [TType4, any, [any, any]] ? TCancel[2][0] : TCancel extends [TType4, any, any] ? TCancel[2] : TCancel extends [TType4, [any, any]] ? TCancel[1][0] : TCancel[1], TMeta4 = TCancel extends [TType4, any, [any, any]] ? TCancel[2][1] : TCancel extends [TType4, [any, any]] ? TCancel[1][1] : never, TArgs4 extends any[] = TCancel extends [TType4, any, any] ? TCancel[1] : never> = [TCancel] extends [never] ? {
    request: [TArgs1] extends [never] ? ActionCreatorBuilder<TType1, TPayload1, TMeta1> : (...args: TArgs1) => ActionBuilder<TType1, TPayload1, TMeta1>;
    success: [TArgs2] extends [never] ? ActionCreatorBuilder<TType2, TPayload2, TMeta2> : (...args: TArgs2) => ActionBuilder<TType2, TPayload2, TMeta2>;
    failure: [TArgs3] extends [never] ? ActionCreatorBuilder<TType3, TPayload3, TMeta3> : (...args: TArgs3) => ActionBuilder<TType3, TPayload3, TMeta3>;
} : {
    request: [TArgs1] extends [never] ? ActionCreatorBuilder<TType1, TPayload1, TMeta1> : (...args: TArgs1) => ActionBuilder<TType1, TPayload1, TMeta1>;
    success: [TArgs2] extends [never] ? ActionCreatorBuilder<TType2, TPayload2, TMeta2> : (...args: TArgs2) => ActionBuilder<TType2, TPayload2, TMeta2>;
    failure: [TArgs3] extends [never] ? ActionCreatorBuilder<TType3, TPayload3, TMeta3> : (...args: TArgs3) => ActionBuilder<TType3, TPayload3, TMeta3>;
    cancel: [TArgs4] extends [never] ? ActionCreatorBuilder<TType4, TPayload4, TMeta4> : (...args: TArgs4) => ActionBuilder<TType4, TPayload4, TMeta4>;
};
```
* AsyncActionBuilder는 최소 3개의 인자와 그의 타입이 설정되어 있어야 하므로 AsyncActionBuilder의 타입을 받는 함수는 3가지 인자와 그의 타입이 설정되어 있어야 한다. 

##### ② 코드 사용
##### A. redux-thunk
##### a. createAsyncThunk.ts
``` typescript
type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any,any,any>;
type AnyPromiseCreator = (...params: any[]) => Promise<any>;

export default function createAsyncThunk<
A extends AnyAsyncActionCreator ,
F extends AnyPromiseCreator
>(asyncActionCreator:A , promiseCreator :F){
  type Params = Parameters<F> ; // F에 어떤 type의 Parameter를 넣어주어야 하는 지 추출 
  return function thunk(...params:Params){
    return async (dispatch :Dispatch) => {
      const {request, success, failure} = asyncActionCreator;
      dispatch(request(undefined));
      try {
        const result =await promiseCreator(...params);
        dispatch(success(result));
      } catch (e) {
        dispatch(failure(e)) ; 
      }};};}
```
##### b. thunks.ts
``` typescript
export const getUserProfileThunk = createAsyncThunk(getUserProfileAsync ,getUserProfile);

```

##### B. redux-saga

##### a. createAsyncSaga.ts
``` typescript
type PromiseCreatorFunction< P , T > =  
|((payload: P )=> Promise<T>)
| (()=> Promise<T>);

function isPayloadAction (action :any): action is PayloadAction<string, any>{
  return action.payload !== undefined; 
}

export default function createAsyncSaga 
<T1, P1 ,T2, P2 ,T3, P3>
( aysncActionCreator :AsyncActionCreatorBuilder<[T1,[P1 ,undefined]],[T2,[P2, undefined]],[T3,[P3,undefined]]>
  , promiseCreator:PromiseCreatorFunction<P1 , P2>){
     return function* saga(action:ReturnType<typeof aysncActionCreator.request>){
      try {
        //계정명 조회로 api 가져옴 
        const result:P2 = isPayloadAction(action) 
        ? yield call(promiseCreator, action.payload) 
        : yield call (promiseCreator)
        ;
        // request 성공 시 결과 보여줌 
        yield  put (aysncActionCreator.success(result)); 
      } catch (e) {
        //request fauilure 
        yield put(aysncActionCreator.failure(e))
      }}}
```
##### b.sagas.ts 
```typescript
const getUserProfileSaga = createAsyncSaga(getUserProfileAsync ,getUserProfile);

export function* githubSaga(){
  yield takeEvery(GET_USER_PROFILE ,getUserProfileSaga);
}
```
##### 2)  redux-thunk 와 redux-saga 의 리팩토링 시 차이 
 리팩토링 함수인 createAsync~ 의 두번째 인자의 type이 다르다. 
 type 의 차이는 redux-thunk와 redux-saga가 디스패치하는 것이 다르다는 것에서 비롯된 것이라고 생각한다.</br>
 redux-thunk는 parameter를 인자로 하는 함수를 생성하여 반환하는 라이브러리 이고 redux-saga는 특정 액션이 발생하면 이에 기반한 다른 액션을 생성하고 이를 반환하는 라이브러리이다. </br>
 그래서  redux-tunk는 username (string type)을 인자로 받아 success와 failure의 함수를 디스패치하고, redux-thunk는 ation ( reuquest의 type을 받음)을 인자로 받아 request가 성공으로 이루어지면 success를, 조회가 성공하지 못하면 failure을 디스패치했다. 
