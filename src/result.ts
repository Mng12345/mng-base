import type { ExtractByType } from "./types"

export type Result<T, E> = ModuleResult.Result<T, E>

/** @deprecated */
export const ResultModule = {
  ok: <T, E>(value: T): Result<T, E> => {
    return {
      type: 'ok',
      value
    }
  },
  err: <T, E>(value: E): Result<T, E> => {
    return {
      type: 'err',
      value
    }
  },
  map: <T, E, R>(result: Result<T, E>, map: (value: T) => R, defaultValue?: R): Result<R, E> => {
    if (result.type === 'ok') {
      return ResultModule.ok(map(result.value))
    } else {
      if (defaultValue !== undefined) {
        return ResultModule.ok(defaultValue)
      } else {
        return result
      }
    }
  },
  mapErr: <T, E, R>(result: Result<T, E>, map: (err: E) => R): Result<T, R> => {
    if (result.type === 'err') {
      return ResultModule.err(map(result.value))
    } else {
      return result
    }
  }
}

export namespace ModuleResult {
  export type Result<T, E> = {
    type: 'ok',
    value: T
  } | {
    type: 'err',
    value: E
  }

  export function ok<T, E>(value: T): Result<T, E> {
    return {
      type: 'ok',
      value
    }
  }
  
  export function err<T, E>(value: E): Result<T, E> {
    return {
      type: 'err',
      value
    }
  }
  
  export function map<T, E, R>(result: Result<T, E>, map: (value: T) => R, defaultValue?: R): Result<R, E> {
    if (result.type === 'ok') {
      return ok(map(result.value))
    } else {
      if (defaultValue !== undefined) {
        return ok(defaultValue)
      } else {
        return result
      }
    }
  }
  export function mapErr<T, E, R>(result: Result<T, E>, map: (err: E) => R): Result<T, R> {
    if (result.type === 'err') {
      return err(map(result.value))
    } else {
      return result
    }
  }

  export function isOk<T, E>(result: Result<T, E>): result is ExtractByType<Result<T, E>, 'ok'> {
    return result.type === 'ok'
  }

  export function isErr<T, E>(result: Result<T, E>): result is ExtractByType<Result<T, E>, 'err'> {
    return result.type === 'err'
  }
}

export const ok = ModuleResult.ok
export const err = ModuleResult.err
export const map = ModuleResult.map
export const mapErr = ModuleResult.mapErr