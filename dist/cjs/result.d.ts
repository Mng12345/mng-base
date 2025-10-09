import type { ExtractByType } from "./types";
export type Result<T, E> = ModuleResult.Result<T, E>;
/** @deprecated */
export declare const ResultModule: {
    ok: <T, E>(value: T) => Result<T, E>;
    err: <T, E>(value: E) => Result<T, E>;
    map: <T, E, R>(result: Result<T, E>, map: (value: T) => R, defaultValue?: R) => Result<R, E>;
    mapErr: <T, E, R>(result: Result<T, E>, map: (err: E) => R) => Result<T, R>;
};
export declare namespace ModuleResult {
    type Result<T, E> = {
        type: 'ok';
        value: T;
    } | {
        type: 'err';
        value: E;
    };
    function ok<T, E>(value: T): Result<T, E>;
    function err<T, E>(value: E): Result<T, E>;
    function map<T, E, R>(result: Result<T, E>, map: (value: T) => R, defaultValue?: R): Result<R, E>;
    function mapErr<T, E, R>(result: Result<T, E>, map: (err: E) => R): Result<T, R>;
    function isOk<T, E>(result: Result<T, E>): result is ExtractByType<Result<T, E>, 'ok'>;
    function isErr<T, E>(result: Result<T, E>): result is ExtractByType<Result<T, E>, 'err'>;
}
export declare const ok: typeof ModuleResult.ok;
export declare const err: typeof ModuleResult.err;
export declare const map: typeof ModuleResult.map;
export declare const mapErr: typeof ModuleResult.mapErr;
