declare interface Action<T, P>{
    type: T,
    payload: P
}

declare type ActionFunction<T, P> = (payload: P)  => Action<T, P>