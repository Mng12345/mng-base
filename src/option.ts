

export type Option<T> = T | null | undefined

/** @deprecated */
export const OptionModule = {
  map: <T, R>(option: Option<T>, map: (value: T) => R, defaultValue?: R): Option<R> => {
    if (option === null || option === undefined) {
      return defaultValue ?? undefined
    } else {
      return map(option)
    }
  },
  isNonNullable: <T>(option: Option<T>): option is NonNullable<T> => {
    return option !== null && option !== undefined
  },
  isNullable: <T>(option: Option<T>): option is undefined | null => {
    return !OptionModule.isNonNullable(option)
  },
  empty: <T>(): Option<T> => {
    return undefined
  },
  flatMap<T, R>(option: Option<T>, map: (value: T) => Option<R>): Option<R> {
    if (OptionModule.isNullable(option)) {
      return option
    } else {
      return map(option)
    }
  }
}

export namespace ModuleOption {
  export type Option<T> = T | null | undefined

  export function map<T, R>(option: Option<T>, map: (value: T) => R, defaultValue?: R): Option<R> {
    if (option === null || option === undefined) {
      return defaultValue ?? undefined
    } else {
      return map(option)
    }
  }
  export function isNonNullable<T>(option: Option<T>): option is NonNullable<T> {
    return option !== null && option !== undefined
  }
  export function isNullable<T>(option: Option<T>): option is undefined | null {
    return !isNonNullable(option)
  }
  export function empty<T>(): Option<T> {
    return undefined
  }
  export function flatMap<T, R>(option: Option<T>, map: (value: T) => Option<R>): Option<R> {
    if (isNullable(option)) {
      return option
    } else {
      return map(option)
    }
  }
}

export const map = ModuleOption.map
export const isNonNullable = ModuleOption.isNonNullable
export const isNullable = ModuleOption.isNullable
export const empty = ModuleOption.empty
export const flatMap = ModuleOption.flatMap