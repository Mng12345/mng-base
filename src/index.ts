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

/**
 * @deprecated
 */
export class ResultOk<T> {
  tag: 'ok' = 'ok'
  constructor(readonly value: T) {}
}

/**
 * @deprecated
 */
export class ResultErr<E> {
  tag: 'err' = 'err'
  constructor(readonly value: E) {}
}

const enum ResultTag {
  Ok = 0,
  Err = 1
}

export class Result<T, E> {
  private constructor(private readonly tag: ResultTag, readonly value?: T, readonly error?: E) {}

  static ok<T, E=any>(value: T): Result<T, E> {
    return new Result<T, E>(ResultTag.Ok, value, undefined)
  } 

  static err<E, T=any>(error: E): Result<T, E> {
    return new Result<T, E>(ResultTag.Err, undefined, error)
  }

  isOk(): this is Result<T, E> & {value: T} {
    return this.tag === ResultTag.Ok
  }

  isErr(): this is Result<T, E> & {error: E} {
    return this.tag === ResultTag.Err
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.value
    } else {
      throw new Error(`this.value is undefined`)
    }
  }

  getError(): E {
    if (this.isErr()) {
      return this.error
    } else {
      throw new Error(`the result is not err but called getError`)
    }
  }

  unwrapOr(defaultValue: T): T {
    if (this.isOk()) {
      return this.value
    } else {
      return defaultValue
    }
  }

  unwrapOrElse(defaultF: () => T): T {
    if (this.isOk()) {
      return this.value
    } else {
      return defaultF()
    }
  }

  expect(message: string): T {
    if (this.isOk()) {
      return this.value
    } else {
      throw new Error(message)
    }
  }

  map<U>(op: (value: T) => U): Result<U, E> {
    if (this.isOk()) {
      return Result.ok(op(this.value))
    } else {
      return Result.err(this.getError())
    }
  }

  flatMap<U>(op: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return op(this.value)
    } else {
      return Result.err(this.getError())
    }
  }

  mapOr<U>(defaultValue: U, op: (value: T) => U): U {
    if (this.isOk()) {
      return op(this.value)
    } else {
      return defaultValue
    }
  }

  mapOrElse<U>(defaultF: () => U, op: (value: T) => U): U {
    if (this.isOk()) {
      return op(this.value)
    } else {
      return defaultF()
    }
  }

  mapErr<U>(op: (error: E) => U): Result<T, U> {
    if (this.isErr()) {
      return Result.err(op(this.error))
    } else {
      return Result.ok(this.unwrap())
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