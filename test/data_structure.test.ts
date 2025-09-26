import base from "../src";
import list = base.ds.list
import pipe = base.pipe

test("fromArray", () => {
  const l = list.fromArray([1, 2, 3])
  const ary = list.toArray(l)
  expect(ary).toStrictEqual([1, 2, 3])
})

test("length", () => {
  const l = list.fromArray([])
  const l1 = list.fromArray([1])
  const l2 = list.fromArray([1, 2])
  expect(list.length(l)).toBe(0)
  expect(list.length(l1)).toBe(1)
  expect(list.length(l2)).toBe(2)
})

test("iter", () => {
  const l = list.fromArray([1, 2, 3])
  const buffer: number[] = []
  list.iter(l, v => {
    buffer.push(v)
  })
  expect(buffer).toStrictEqual(list.toArray(l))
})

test("iteri", () => {
  const l = list.fromArray([1, 2, 3])
  const buffer: [number, number][] = []
  list.iteri(l, (v, i) => {
    buffer.push([v, i])
  })
  expect(buffer).toStrictEqual(list.toArray(l).map((item, i) => [item, i]))
})

test("map", () => {
  const l = list.fromArray([1, 2, 3])
  const l1 = list.map(l, v => v + 1)
  expect(list.toArray(l1)).toStrictEqual([2, 3, 4])
})

test("mapi", () => {
  const l = list.fromArray([1, 2, 3])
  const l1 = list.mapi(l, (v, i) => {
    return [v, i]
  })
  expect(list.toArray(l1)).toStrictEqual(list.toArray(l).map((v, i) => [v, i]))
})

test("toArray", () => {
  const l = list.fromArray([1, 2, 3])
  expect(list.toArray(l)).toStrictEqual([1, 2, 3])
})

test("filter", () => {
  const l = list.fromArray([1, 2, 3])
  const l1 = list.filter(l, v => v !== 2)
  expect(list.toArray(l1)).toStrictEqual([1, 3])
})

test("filteri", () => {
  const l = list.fromArray([1, 2, 3])
  const l1 = list.filteri(l, (v, i) => {
    return i !== 1
  })
  expect(list.toArray(l1)).toStrictEqual([1, 3])
})

test("all", () => {
  const l = list.fromArray([1, 2, 3])
  const allBigThanZero = list.all(l, v => v > 0)
  expect(allBigThanZero).toBe(true)
  const allLessThanFour = list.all(l, v => v < 4)
  expect(allLessThanFour).toBe(true)
})

test("any", () => {
  const l = list.fromArray([1, 2, 3])
  const hasTwo = list.any(l, v => v === 2)
  expect(hasTwo).toBe(true)
})

test("concat", () => {
  const l = list.concat(list.fromArray([1, 2]), list.fromArray([3]))
  expect(list.toArray(l)).toStrictEqual([1, 2, 3])
})

test("reverse", () => {
  const l = list.fromArray([1, 2, 3])
  const rl = list.reverse(l)
  expect(list.toArray(rl)).toStrictEqual([3, 2, 1])
})

test("fold", () => {
  const l = list.fromArray([1, 2, 3])
  const result = list.fold(l, 0, (result, v) => {
    return result + v
  })
  expect(result).toBe(6)
})

test("zip", () => {
  const l1 = list.fromArray([1, 2, 3])
  const l2 = list.fromArray([1, 2])
  const l3 = list.fromArray([1, 1, 2])
  expect(() => list.zip(l1, l2)).toThrow('the lists be zipped should have the same length')
  const l4 = list.zip(l1, l3)
  expect(list.toArray(l4)).toStrictEqual([[1, 1], [2, 1], [3, 2]])
})

test("unzip", () => {
  const l = pipe.make(list.fromArray<[number, number]>([[1, 2], [3, 4]]))
    .x
  const [l1, l2] = list.unzip(l)
  expect(list.toArray(l1)).toStrictEqual([1, 3])
  expect(list.toArray(l2)).toStrictEqual([2, 4])
})

test("flatten", () => {
  const l = pipe.make(list.fromArray([1, 2, 3]))
    .to(v => list.map(v, item => list.fromArray([item, item])))
    .to(list.flatten)
    .to(list.toArray)
    .x
  expect(l).toStrictEqual([1, 1, 2, 2, 3, 3])
})

test("max", () => {
  expect(() => list.max(list.nil, () => -1)).toThrow('the list is empty')
  expect(list.max(list.fromArray([1, 2, 4, 3, 8, 2]), (v1, v2) => {
    if (v1 < v2) {
      return -1
    } else if (v1 === v2) {
      return 0
    } else {
      return 1
    }
  })).toBe(8)
})

test("min", () => {
  expect(() => list.min(list.nil, () => -1)).toThrow('the list is empty')
  expect(list.min(list.fromArray([1, 2, 3, 0]), (v1, v2) => {
    if (v1 < v2) {
      return -1
    } else if (v1 === v2) {
      return 0
    } else {
      return 1
    }
  })).toBe(0)
})

test("sort", () => {
  const l = pipe.make(list.fromArray([1, 2, 3, 4, 2, 1]))
    .to(v => list.sort(v, (v1, v2) => {
      if (v1 < v2) {
        return -1
      } else if (v1 > v2) {
        return 1
      } else {
        return 0
      }
    }))
    .to(list.toArray)
    .x
  expect(l).toStrictEqual([1, 1, 2, 2, 3, 4])
})

test("contain", () => {
  const l = list.fromArray([1, 2, 3])
  expect(list.contain(l, v => v === 2)).toBe(true)
})

test("unfold", () => {
  const l = pipe.make(list.unfold(3, v => {
    if (v > 0) {
      return [v, v - 1]
    } else {
      return undefined
    }
  })).to(list.toArray).x
  expect(l).toStrictEqual([3, 2, 1])
})

test("splitBy", () => {
  const l = list.fromArray([1, 2, 3, 4 ,5])
  const splittedl = list.splitBy(l, v => v === 3)
  const splittedAry = list.toArray(list.map(splittedl, list.toArray))
  expect(splittedAry[0]).toStrictEqual([1, 2])
  expect(splittedAry[1]).toStrictEqual([4, 5])
})

