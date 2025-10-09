declare namespace types {
    type Narrow<T, P> = T extends P ? T : never;
    type Undefined2Null<T> = {
        [K in keyof T]-?: T[K] extends infer Value ? undefined extends Value ? NonNullable<Value> extends infer NonNullableValue ? NonNullableValue extends never ? null : NonNullableValue extends object ? Undefined2Null<NonNullableValue> : NonNullableValue | null : null : null : null;
    };
}
export default types;
declare const __typeid__: unique symbol;
export type nominal<Type, Identifier> = Type & {
    readonly [__typeid__]: Identifier;
};
export type structural<Type> = Omit<Type, typeof __typeid__>;
export declare function nominal<Type, const Identifier>(value: Type, typeName: Identifier): nominal<Type, Identifier>;
export declare function structural<Type, const Identifier>(value: nominal<Type, Identifier>): Type;
/** @deprecated */
export type ExtractUnion<T, P> = T extends P ? T : never;
/** @deprecated */
export type ExtractUnionByType<T, type extends string> = ExtractUnion<T, {
    type: type;
}>;
export type ExtractByType<T extends {
    type: string;
}, TypeTag extends T['type']> = Extract<T, {
    type: TypeTag;
}>;
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
export type NoKeyEmpty<T extends Object> = {
    [K in keyof Required<T>]: NonNullable<Required<T>[K]>;
};
