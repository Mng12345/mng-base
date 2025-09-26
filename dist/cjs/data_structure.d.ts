declare namespace data_structure {
    namespace list {
        type List<T> = Nil | Cons<T>;
        type Nil = {
            readonly type: 'nil';
        };
        type Cons<T> = {
            readonly type: 'cons';
            readonly head: T;
            readonly tail: List<T>;
        };
        const nil: Nil;
        const fromArray: <T>(array: T[]) => List<T>;
        const length: <T>(list: List<T>) => number;
        const iter: <T>(list: List<T>, fn: (value: T) => void) => void;
        const iteri: <T>(list: List<T>, fn: (value: T, index: number) => void) => void;
        const map: <T, R>(list: List<T>, fn: (value: T) => R) => List<R>;
        const mapi: <T, R>(list: List<T>, fn: (value: T, index: number) => R) => List<R>;
        const toArray: <T>(list: List<T>) => T[];
        const filter: <T>(list: List<T>, fn: (value: T) => boolean) => List<T>;
        const filteri: <T>(list: List<T>, fn: (value: T, index: number) => boolean) => List<T>;
        const all: <T>(list: List<T>, fn: (value: T) => boolean) => boolean;
        const any: <T>(list: List<T>, fn: (value: T) => boolean) => boolean;
        const concat: <T>(list: List<T>, list2: List<T>) => List<T>;
        const reverse: <T>(list: List<T>) => List<T>;
        const fold: <T, U>(list: List<T>, initial: U, fn: (result: U, item: T) => U) => U;
        const zip: <T, T2>(list: List<T>, list2: List<T2>) => List<[T, T2]>;
        const splitBy: <T>(list: List<T>, fn: (value: T) => boolean) => List<List<T>>;
        const unzip: <T, T2>(list: List<[T, T2]>) => [List<T>, List<T2>];
        const flatten: <T>(list: List<List<T>>) => List<T>;
        const max: <T>(list: List<T>, compare: (value1: T, value2: T) => -1 | 1 | 0) => T;
        const min: <T>(list: List<T>, compare: (value1: T, value2: T) => -1 | 1 | 0) => T;
        const sort: <T>(list: List<T>, compare: (value1: T, value2: T) => -1 | 1 | 0) => List<T>;
        const contain: <T>(list: List<T>, fn: (value: T) => boolean) => boolean;
        const unfold: <State, T>(init: State, fn: (state: State) => [T, State] | undefined) => List<T>;
    }
}
export default data_structure;
