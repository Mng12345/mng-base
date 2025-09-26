import {ObjectExt, Option, Pipe, Result, ResultErr, ResultOk, isNullable} from '../src'

test('Result', () => {
  const createResult = (): Result<number, string> => {
    return Result.ok(1)
  }
  const createResult2 = (): Result<number, string> => {
    return Result.err("error")
  }
  const r1 = createResult()
  const r2 = createResult2()
  const r3 = Result.ok<string, string>("1")
  if (r1.isOk()) {
    expect(r1.value.value).toBe(1)
    expect(r1.unwrap()).toBe(1)
  } else if (r1.isErr()) {
    expect(r1.value.value).toBe("error")
  }
  if (r2.isOk()) {
    expect(r2.value.value).toBe(1)
  } else if (r2.isErr()) {
    expect(r2.value.value).toBe("error")
  }
  expect(r1.expect("number")).toBe(1)
  expect(() => r2.expect("error in expect")).toThrow(new Error('error in expect'))
  expect(r1.map(v => v + 1).unwrap()).toBe(2)
  expect(r1.flatMap(v => Result.ok(v + 1)).unwrap()).toBe(2)
  expect(r2.mapOr<number>(1, v => v)).toBe(1)
  expect(r2.mapOrElse(() => 1, v => v)).toBe(1)
  expect(r1.mapOr<number>(1, v => v + 1)).toBe(2)
  expect(r2.mapErr(err => "map error").value.value).toBe("map error")
  expect(r2.unwrapOr(1)).toBe(1)
  expect(r2.unwrapOrElse(() => 1)).toBe(1)
  if (r3.isOk()) {
    expect(r3.value.value).toBe("1")
  } else {
    expect(typeof r3.value.value).toBe("string")
  }
})

test('Result instanceof', () => {
  const ok = new ResultOk(1)
  const err = new ResultErr(1)
  expect(ok instanceof ResultOk).toBe(true)
  expect(ok instanceof ResultErr).toBe(false)
  expect(err instanceof ResultOk).toBe(false)
  expect(err instanceof ResultErr).toBe(true)
})

test('Option', () => {
  const some = Option.some(1)
  const none = Option.none<number>()
  expect(some.isSome()).toBe(true)
  expect(some.isNone()).toBe(false)
  expect(none.isNone()).toBe(true)
  expect(none.isSome()).toBe(false)
  expect(some.unwrap()).toBe(1)
  expect(() => none.expect("error in expect")).toThrow("error in expect")
  expect(none.unwrapOr(1)).toBe(1)
  expect(some.unwrapOr(2)).toBe(1)
  expect(none.unwrapOrElse(() => 2)).toBe(2)
  expect(some.map(v => v + 1).unwrap()).toBe(2)
  expect(() => none.map(v => v + 1).expect("error in expect")).toThrow("error in expect")
  expect(none.mapOr(1, v => v + 1)).toBe(1)
  expect(none.mapOrElse(() => 1, v => v + 1)).toBe(1)
})

test('Pipe', () => {
  const v = Pipe.of(1)
    .next(v => v + 1)
    .next(v => v * 2)
    .get()
  expect(v).toBe(4)
})

test('ObjectExt', () => {
  type T = {
    name: string
    sex: boolean
  }

  const object: T = {
    name: 'name',
    sex: true
  }
  const object2 = {
    name: 'name',
    sex: 1,
    age: 12
  }
  const keys = ObjectExt.keys(object)
  const keys2 = ObjectExt.keys(object2)
  expect(keys).toStrictEqual(['name', 'sex'])
  expect(keys2).toStrictEqual(['name', 'sex', 'age'])
})