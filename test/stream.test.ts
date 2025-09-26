import { block } from '../src';
import { Stream } from './../src/stream';
test('Stream', () => {
  const data = [1, 2, 3, 4, 5]
  const stream = Stream.of(data)
  expect(stream.collect()).toStrictEqual([1, 2, 3, 4, 5])
  const stream2 = Stream.of(data).filter(v => v > 3)
  expect(stream2.collect()).toStrictEqual([4, 5])
  const stream3 = Stream.of(data).filter(v => v > 3)
    .map(v => v * 2)
  expect(stream3.collect()).toStrictEqual([8, 10])
  const stream4 = Stream.of(data).filter(v => v > 3)
    .map(v => v * 2)
    .filter(v => v !== 8)
  expect(stream4.collect()).toStrictEqual([10])
  const stream5 = Stream.of(data).filter(v => v > 3)
    .map(v => v * 2)
    .filter(v => v !== 8)
    .flatMap(v => [v])
  expect(stream5.collect()).toStrictEqual([10])
  const stream6 = Stream.of(data).filter(v => v > 3)
    .map(v => v * 2)
    .filter(v => v !== 8)
    .flatMap(v => [v])
  stream6.each(v => expect(v).toBe(10))
  const stream7 = Stream.of(data).filter(v => v > 3)
    .map(v => v * 2)
    .filter(v => v !== 8)
    .flatMap(v => [v])
  stream7.forEach(v => expect(v).toBe(10))
  Stream.of(data)
    .filter(v => v === 5)
    .groupBy(v => `${v}`)
    .each(v => {
      const [key, value] = v
      expect(value).toStrictEqual([5])
      expect(key).toBe(`5`)
    })
  const bigArray: number[] = []
  for (let i=0; i<30000000; i++) {
    bigArray.push(1)
  }
  const normalTime = block(() => {
    const timeStart = new Date().getTime()
    const sum = bigArray.map(v => v + 1)
      .map(v => v * 2)
      .filter(v => v % 2 === 0)
      .reduce((result: number, item: number) => result + item, 0)
    const timeEnd = new Date().getTime()
    return [timeEnd - timeStart, sum] as const
  })
  const streamTime = block(() => {
    const timeStart = new Date().getTime()
    const sum = Stream.of(bigArray)
      .map(v => v + 1)
      .map(v => v * 2)
      .filter(v => v % 2 === 0)
      .collect()
      .reduce((result: number, item: number) => result + item, 0)
    const timeEnd = new Date().getTime()
    return [timeEnd - timeStart, sum]
  })
  const loopTime = block(() => {
    const timeStart = new Date().getTime()
    let sum = 0
    const map1 = (v: number) => v + 1
    const map2 = (v: number) => v * 2
    const filter = (v: number) => v % 2 === 0
    for (let i=0; i<bigArray.length; i++) {
      const v = map2(map1(bigArray[i]))
      if (filter(v)) {
        sum += v
      }
    }
    const timeEnd = new Date().getTime()
    return [timeEnd - timeStart, sum]
  })
  expect(normalTime[1]).toBe(streamTime[1])
  expect(normalTime[1]).toBe(loopTime[1])
  console.log(`normal time: `, normalTime[0])
  console.log(`stream time: `, streamTime[0])
  console.log(`loop time: `, loopTime[0])
})