interface Effect<T> {
    (): T;
}
export declare class IOMonad<E> {
    readonly effect: Effect<E>;
    _classId: "IOMonad";
    constructor(effect: Effect<E>);
    static of<E>(effect: Effect<E>): IOMonad<E>;
    map<E2>(f: (e: E) => E2): IOMonad<E2>;
    flatMap<E2>(f: (e: E) => IOMonad<E2>): IOMonad<E2>;
    combine<E2>(monad2: IOMonad<E2>): IOMonad<[E, E2]>;
}
export {};
