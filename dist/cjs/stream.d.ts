/**
 * @deprecated
 */
export type MngIteratorNextResult<T> = [done: true] | [done: false, value: T];
/**
 * @deprecated
 */
export interface MngIterator<T> {
    next(): MngIteratorNextResult<T>;
}
/**
 * @deprecated
 */
export declare class Stream<T> {
    iterator: MngIterator<T>;
    constructor(data: ArrayLike<T> | MngIterator<T>);
    static of<T>(data: ArrayLike<T> | MngIterator<T>): Stream<T>;
    each(callback: (item: T, index?: number) => void): void;
    forEach(callback: (item: T, index?: number) => void): void;
    map<R>(callback: (item: T, index?: number) => R): Stream<R>;
    flatMap<R>(callback: (item: T, index?: number) => R[]): Stream<R>;
    filter(callback: (item: T, index?: number) => boolean): Stream<T>;
    collect(): T[];
    groupBy(callback: (item: T, index?: number) => string): DictionaryStream<T>;
}
export declare class DictionaryStream<T> extends Stream<[string, T[]]> {
    constructor(stream: Stream<[string, T[]]>);
    toDict(): {
        [index: string]: T[];
    };
}
