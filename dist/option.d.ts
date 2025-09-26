export type Option<T> = T | null | undefined;
/** @deprecated */
export declare const OptionModule: {
    map: <T, R>(option: Option<T>, map: (value: T) => R, defaultValue?: R) => Option<R>;
    isNonNullable: <T_1>(option: Option<T_1>) => option is NonNullable<T_1>;
    isNullable: <T_2>(option: Option<T_2>) => option is null | undefined;
    empty: <T_3>() => Option<T_3>;
    flatMap<T_4, R_1>(option: Option<T_4>, map: (value: T_4) => Option<R_1>): Option<R_1>;
};
export declare namespace ModuleOption {
    type Option<T> = T | null | undefined;
    function map<T, R>(option: Option<T>, map: (value: T) => R, defaultValue?: R): Option<R>;
    function isNonNullable<T>(option: Option<T>): option is NonNullable<T>;
    function isNullable<T>(option: Option<T>): option is undefined | null;
    function empty<T>(): Option<T>;
    function flatMap<T, R>(option: Option<T>, map: (value: T) => Option<R>): Option<R>;
}
export declare const map: typeof ModuleOption.map;
export declare const isNonNullable: typeof ModuleOption.isNonNullable;
export declare const isNullable: typeof ModuleOption.isNullable;
export declare const empty: typeof ModuleOption.empty;
export declare const flatMap: typeof ModuleOption.flatMap;
