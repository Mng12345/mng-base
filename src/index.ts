import data_structure from "./data_structure"
import types_ from './types'
import { ModuleOption as ModuleOption_ } from "./option"
import { ModuleResult as ModuleResult_ } from "./result"

/**
 * @deprecated
 */
namespace base {
  export namespace pipe {
    interface Pipe<I> {
      x: I
      to<R>(f: (x: I) => R): Pipe<R>
    }
  
    export function make<I>(x: I): Pipe<I> {
      return {
        x,
        to<R>(f: (x: I) => R): Pipe<R> {
          return make(f(x))
        },
      }
    }
  }

  /**
   * @deprecated
   */
  export namespace result {
    export type Result<V, E> =
      | {
          type: 'ok'
          value: V
        }
      | {
          type: 'err'
          value: E
        }
  
    export function map<V, E, O>(
      result: Result<V, E>,
      f: (value: V) => O
    ): Result<O, E> {
      switch (result.type) {
        case 'ok': {
          return {
            type: 'ok',
            value: f(result.value),
          }
        }
        case 'err': {
          return result
        }
      }
    }
  
    export function flatMap<V, E, O>(
      result: Result<V, E>,
      f: (value: V) => Result<O, E>
    ): Result<O, E> {
      switch (result.type) {
        case 'ok': {
          return f(result.value)
        }
        case 'err': {
          return result
        }
      }
    }
  }

  export function block<R>(f: () => R): R {
    return f()
  }

  export const isNotNull = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined
  }

  export import ds = data_structure
  export import types = types_
}


export default base

export const isNotNull = base.isNotNull
export const isNullable = (value: any): value is (null | undefined) => {
  return value === null || value === undefined
} 
export const block = base.block
export import types = types_
export import ds = data_structure 

export class ResultOk<T> {
  tag: 'ok' = 'ok'
  constructor(readonly value: T) {}
}

export class ResultErr<E> {
  tag: 'err' = 'err'
  constructor(readonly value: E) {}
}

/**
 * @deprecated
 */
export class Result<T, E> {
  constructor(readonly value: ResultOk<T> | ResultErr<E>) {}

  static ok<T, E=any>(value: T): Result<T, E> {
    return new Result<T, E>(new ResultOk(value))
  } 

  static err<E, T=any>(value: E): Result<T, E> {
    return new Result<T, E>(new ResultErr(value))
  }

  isOk(): this is {value: ResultOk<T>} {
    return this.value instanceof ResultOk
  }

  isErr(): this is {value: ResultErr<E>} {
    return this.value instanceof ResultErr
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.value.value
    } else {
      throw new Error(`this.value is not an instanceof ResultOk<T>`)
    }
  }

  unwrapOr(defaultValue: T): T {
    if (this.isOk()) {
      return this.value.value
    } else {
      return defaultValue
    }
  }

  unwrapOrElse(defaultF: () => T): T {
    if (this.isOk()) {
      return this.value.value
    } else {
      return defaultF()
    }
  }

  expect(message: string): T {
    if (this.isOk()) {
      return this.value.value
    } else {
      throw new Error(message)
    }
  }

  map<U>(op: (value: T) => U): Result<U, E> {
    if (this.value instanceof ResultOk) {
      return Result.ok(op(this.value.value))
    } else {
      return Result.err(this.value.value)
    }
  }

  flatMap<U>(op: (value: T) => Result<U, E>): Result<U, E> {
    if (this.value instanceof ResultOk) {
      return op(this.value.value)
    } else {
      return Result.err(this.value.value)
    }
  }

  mapOr<U>(defaultValue: U, op: (value: T) => U): U {
    if (this.value instanceof ResultOk) {
      return op(this.value.value)
    } else {
      return defaultValue
    }
  }

  mapOrElse<U>(defaultF: () => U, op: (value: T) => U): U {
    if (this.isOk()) {
      return op(this.value.value)
    } else {
      return defaultF()
    }
  }

  mapErr<U>(op: (error: E) => U): Result<T, U> {
    if (this.value instanceof ResultErr) {
      return Result.err(op(this.value.value))
    } else {
      return Result.ok(this.value.value)
    }
  }
}

/**
 * @deprecated
 */
export class Option<T> {
  constructor(readonly value: T | undefined) {}

  static some<T>(value: T): Option<T> {
    return new Option(value)
  }

  static none<T>(): Option<T> {
    return new Option<T>(undefined)
  }

  isSome(): this is {value: T} {
    return this.value !== undefined
  }

  isNone(): this is {value: undefined} {
    return this.value === undefined
  }

  unwrap(): T {
    if (this.value !== undefined) {
      return this.value
    } else {
      throw new Error(`this.value is None`)
    }
  }

  expect(message: string): T {
    if (this.value !== undefined) {
      return this.value
    } else {
      throw new Error(message)
    }
  }

  unwrapOr(defaultValue: T): T {
    if (this.isSome()) {
      return this.value
    } else {
      return defaultValue
    }
  }

  unwrapOrElse(op: () => T): T {
    if (this.isSome()) {
      return this.value
    } else {
      return op()
    }
  }

  map<U>(op: (value: T) => U): Option<U> {
    if (this.isSome()) {
      return Option.some(op(this.value))
    } else {
      return Option.none()
    }
  }

  mapOr<U>(defaultValue: U, op: (value: T) => U): U {
    if (this.isSome()) {
      return op(this.value)
    } else {
      return defaultValue
    }
  }

  mapOrElse<U>(defaultF: () => U, op: (value: T) => U): U {
    if (this.isSome()) {
      return op(this.value)
    } else {
      return defaultF()
    }
  }
}

export class Pipe<T> {
  private constructor(readonly value: T) {}

  static of<T>(value: T): Pipe<T> {
    return new Pipe(value)
  }

  next<U>(f: (value: T) => U): Pipe<U> {
    return new Pipe(f(this.value))
  }

  get(): T {
    return this.value
  }
}

export class ObjectExt {
  static keys<T extends Object>(object: T): (keyof T)[] {
    const keys = Object.keys(object)
    const isKey = (key: any): key is keyof T => object.hasOwnProperty(key)
    const result: (keyof T)[] = []
    for (const key of keys) {
      if (isKey(key)) {
        result.push(key)
      }
    }
    return result
  }
}

export namespace ModuleBase {
  export import ModuleOption = ModuleOption_
  export import ModuleResult = ModuleResult_
}