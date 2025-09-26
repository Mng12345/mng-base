import { IOMonad } from './../src/io-monad';
import * as fsp from 'fs/promises'

test("io-monad", async (): Promise<void> => {

  const read = _read()
  const result = read.map(async content => _handle(await content))
    .flatMap(lines => IOMonad.of(async () => _log(await lines)))
  const executeResult = (await result.effect()).effect()
  expect(executeResult).toBe(undefined)
  const readTwotimes = read.combine(read).map(async ([content1, content2]) => await Promise.all([content1, content2]))
    .map(async (promise) => {
      const [content1, content2] = await promise
      return content1.split('\n').length + content2.split('\n').length
    })
  expect(await readTwotimes.effect()).toBe(62)
  
  function _read(): IOMonad<Promise<string>> {
    return IOMonad.of(async () => {
      return await fsp.readFile('./src/io-monad.ts', {encoding: 'utf-8'})
    })
  }

  function _log(lines: string[]): IOMonad<void> {
    return IOMonad.of(() => {
      lines.forEach(line => console.log(line))
    })
  }

  function _handle(content: string): string[] {
    return content.split('\n').map(line => `io-monad.ts >>> ${line}`)
  }
})