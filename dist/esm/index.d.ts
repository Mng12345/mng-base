import data_structure from "./data_structure";
import types_ from './types';
import { ModuleOption as ModuleOption_ } from "./option";
import { ModuleResult as ModuleResult_ } from "./result";
/**
 * @deprecated
 */
declare namespace base {
    namespace pipe {
        interface Pipe<I> {
            x: I;
            to<R>(f: (x: I) => R): Pipe<R>;
        }
        export function make<I>(x: I): Pipe<I>;
        export {};
    }
    /**
     * @deprecated
     */
    namespace result {
        type Result<V, E> = {
            type: 'ok';
            value: V;
        } | {
            type: 'err';
            value: E;
        };
        function map<V, E, O>(result: Result<V, E>, f: (value: V) => O): Result<O, E>;
        function flatMap<V, E, O>(result: Result<V, E>, f: (value: V) => Result<O, E>): Result<O, E>;
    }
    function block<R>(f: () => R): R;
    const isNotNull: <T>(value: T) => value is NonNullable<T>;
    export import ds = data_structure;
    export import types = types_;
}
export default base;
export declare const isNotNull: <T>(value: T) => value is NonNullable<T>;
export declare const isNullable: (value: any) => value is (null | undefined);
export declare const block: typeof base.block;
export import types = types_;
export import ds = data_structure;
/**
 * @deprecated
 */
export declare class ResultOk<T> {
    readonly value: T;
    tag: 'ok';
    constructor(value: T);
}
/**
 * @deprecated
 */
export declare class ResultErr<E> {
    readonly value: E;
    tag: 'err';
    constructor(value: E);
}
export declare class Result<T, E> {
    private readonly tag;
    readonly value?: T | undefined;
    readonly error?: E | undefined;
    private constructor();
    static ok<T, E = any>(value: T): Result<T, E>;
    static err<E, T = any>(error: E): Result<T, E>;
    isOk(): this is Result<T, E> & {
        value: T;
    };
    isErr(): this is Result<T, E> & {
        error: E;
    };
    unwrap(): T;
    getError(): E;
    unwrapOr(defaultValue: T): T;
    unwrapOrElse(defaultF: () => T): T;
    expect(message: string): T;
    map<U>(op: (value: T) => U): Result<U, E>;
    flatMap<U>(op: (value: T) => Result<U, E>): Result<U, E>;
    mapOr<U>(defaultValue: U, op: (value: T) => U): U;
    mapOrElse<U>(defaultF: () => U, op: (value: T) => U): U;
    mapErr<U>(op: (error: E) => U): Result<T, U>;
}
/**
 * @deprecated
 */
export declare class Option<T> {
    readonly value: T | undefined;
    constructor(value: T | undefined);
    static some<T>(value: T): Option<T>;
    static none<T>(): Option<T>;
    isSome(): this is {
        value: T;
    };
    isNone(): this is {
        value: undefined;
    };
    unwrap(): T;
    expect(message: string): T;
    unwrapOr(defaultValue: T): T;
    unwrapOrElse(op: () => T): T;
    map<U>(op: (value: T) => U): Option<U>;
    mapOr<U>(defaultValue: U, op: (value: T) => U): U;
    mapOrElse<U>(defaultF: () => U, op: (value: T) => U): U;
}
export declare class Pipe<T> {
    readonly value: T;
    private constructor();
    static of<T>(value: T): Pipe<T>;
    next<U>(f: (value: T) => U): Pipe<U>;
    get(): T;
}
export declare class ObjectExt {
    static keys<T extends Object>(object: T): (keyof T)[];
}
export declare namespace ModuleBase {
    export import ModuleOption = ModuleOption_;
    export import ModuleResult = ModuleResult_;
}
