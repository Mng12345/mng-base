export type Result<T, E> = {
    type: 'ok';
    value: T;
} | {
    type: 'err';
    value: E;
};
/** @deprecated */
export declare const ResultModule: {
    ok: <T, E>(value: T) => Result<T, E>;
    err: <T_1, E_1>(value: E_1) => Result<T_1, E_1>;
    map: <T_2, E_2, R>(result: Result<T_2, E_2>, map: (value: T_2) => R, defaultValue?: R) => Result<R, E_2>;
    mapErr: <T_3, E_3, R_1>(result: Result<T_3, E_3>, map: (err: E_3) => R_1) => Result<T_3, R_1>;
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
}
export declare const ok: typeof ModuleResult.ok;
export declare const err: typeof ModuleResult.err;
export declare const map: typeof ModuleResult.map;
export declare const mapErr: typeof ModuleResult.mapErr;
