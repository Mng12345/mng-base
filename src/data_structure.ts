namespace data_structure {
  export namespace list {

    export type List<T> = Nil | Cons<T>

    export type Nil = {readonly type: 'nil'}

    export type Cons<T> = {
      readonly type: 'cons'
      readonly head: T
      readonly tail: List<T>
    }

    export const nil: Nil = {type: 'nil'}

    export const fromArray = <T>(array: T[]): List<T> => {
      let list: List<T> = nil
      for (let i=array.length - 1; i >= 0; i--) {
        list = {
          type: 'cons',
          head: array[i],
          tail: list
        }
      }
      return list
    }

    export const length = <T>(list: List<T>): number => {
      let curr = list
      let count = 0
      for (;;) {
        if (curr.type === 'nil') {
          break
        } else {
          count++
          curr = curr.tail
        }
      }
      return count
    }

    export const iter = <T>(list: List<T>, fn: (value: T) => void): void => {
      let curr = list 
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            fn(curr.head)
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
    }

    export const iteri = <T>(list: List<T>, fn: (value: T, index: number) => void): void => {
      let curr = list 
      let i = 0
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            fn(curr.head, i)
            i++
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
    }

    export const map = <T, R>(list: List<T>, fn: (value: T) => R): List<R> => {
      let curr = list 
      let result: List<R> = nil
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            const item = fn(curr.head)
            result = {
              type: 'cons',
              head: item,
              tail: result
            }
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
      return reverse(result)
    }

    export const mapi = <T, R>(list: List<T>, fn: (value: T, index: number) => R): List<R> => {
      let curr = list 
      let result: List<R> = nil
      let i = 0
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            const item = fn(curr.head, i)
            i++
            result = {
              type: 'cons',
              head: item,
              tail: result
            }
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
      return reverse(result)
    }

    export const toArray = <T>(list: List<T>): T[] => {
      const result: T[] = []
      let curr = list
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            result.push(curr.head)
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
      return result
    }

    export const filter = <T>(list: List<T>, fn: (value: T) => boolean): List<T> => {
      let curr = list
      let result: List<T> = nil
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            if (fn(curr.head)) {
              result = {
                type: 'cons',
                head: curr.head,
                tail: result
              }
            }
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
      return reverse(result)
    }

    export const filteri = <T>(list: List<T>, fn: (value: T, index: number) => boolean): List<T> => {
      let curr = list
      let result: List<T> = nil
      let i = 0
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            if (fn(curr.head, i)) {
              result = {
                type: 'cons',
                head: curr.head,
                tail: result
              }
            }
            curr = curr.tail
            i++
          }
        }
        if (break_) {
          break
        }
      }
      return reverse(result)
    }

    export const all = <T>(list: List<T>, fn: (value: T) => boolean): boolean => {
      let curr = list
      for (;;) {
        let breakLoop = false
        switch (curr.type) {
          case 'nil': {
            breakLoop = true
            break
          }
          case 'cons': {
            if (fn(curr.head)) {
              curr = curr.tail
            } else {
              return false
            }
          }
        }
        if (breakLoop) {
          break
        }
      }
      return true
    }

    export const any = <T>(list: List<T>, fn: (value: T) => boolean): boolean => {
      let curr = list
      for (;;) {
        let breakLoop = false
        switch (curr.type) {
          case 'nil': {
            breakLoop = true
            break
          }
          case 'cons': {
            if (fn(curr.head)) {
              return true
            }
            curr = curr.tail
          }
        }
        if (breakLoop) {
          break
        }
      }
      return false
    }

    export const concat = <T>(list: List<T>, list2: List<T>): List<T> => {
      let curr = list
      let result: List<T> = nil
      let isLoopingList2 = false
      loop: for (;;) {
        switch (curr.type) {
          case 'nil': {
            if (isLoopingList2) {
              break loop
            } else {
              curr = list2
              isLoopingList2 = true
            }
            break
          }
          case 'cons': {
            result = {
              type: 'cons',
              head: curr.head,
              tail: result
            }
            curr = curr.tail
            break
          }
        }
      }
      return reverse(result)
    }

    export const reverse = <T>(list: List<T>): List<T> => {
      let curr = list
      let result: List<T> = nil
      for (;;) {
        let break_ = false
        switch (curr.type) {
          case 'nil': {
            break_ = true
            break
          }
          case 'cons': {
            result = {
              type: 'cons',
              head: curr.head,
              tail: result
            }
            curr = curr.tail
          }
        }
        if (break_) {
          break
        }
      }
      return result
    }

    export const fold = <T, U>(list: List<T>, initial: U, fn: (result: U, item: T) => U): U => {
      let curr = list
      let result = initial
      for (;;) {
        let breakLoop = false
        switch (curr.type) {
          case 'nil': {
            breakLoop = true
            break
          }
          case 'cons': {
            result = fn(result, curr.head)
            curr = curr.tail
            break
          }
        }
        if (breakLoop) {
          break
        }
      }
      return result
    }

    export const zip = <T, T2>(list: List<T>, list2: List<T2>): List<[T, T2]> => {
      let curr = list
      let curr2 = list2
      let result: List<[T, T2]> = nil
      for (;;) {
        switch (curr.type) {
          case 'nil': {
            switch (curr2.type) {
              case 'nil': {
                return reverse(result)
              }
              case 'cons': {
                throw new Error(`the lists be zipped should have the same length`)
              }
            }
          }
          case 'cons': {
            switch (curr2.type) {
              case 'nil': {
                throw new Error(`the lists be zipped should have the same length`)
              }
              case 'cons': {
                result = {
                  type: 'cons',
                  head: [curr.head, curr2.head],
                  tail: result
                }
                curr = curr.tail
                curr2 = curr2.tail
              }
            }
          }
        }
      }
    }

    export const splitBy = <T>(list: List<T>, fn: (value: T) => boolean): List<List<T>> => {
      const ary = toArray(list)
      const result: T[][] = []
      for (const item of ary) {
        if (fn(item)) {
          if (result.length === 0) {
            continue
          } else {
            result.push([])
          }
        } else {
          if (result.length === 0) {
            result.push([item])
          } else {
            const lastEle = result[result.length - 1]
            lastEle.push(item)
          }
        }
      }
      return fromArray(result.map(fromArray))
    }

    export const unzip = <T, T2>(list: List<[T, T2]>): [List<T>, List<T2>] => {
      let l1: List<T> = nil
      let l2: List<T2> = nil
      let curr = list
      for (;;) {
        switch (curr.type) {
          case 'nil': {
            return [reverse(l1), reverse(l2)]
          }
          case 'cons': {
            const [v1, v2] = curr.head
            l1 = {
              type: 'cons',
              head: v1,
              tail: l1
            }
            l2 = {
              type: 'cons',
              head: v2,
              tail: l2
            }
            curr = curr.tail
          }
        }
      }
    }

    export const flatten = <T>(list: List<List<T>>): List<T> => {
      let curr = list
      let result: List<T> = nil
      for (;;) {
        switch (curr.type) {
          case 'nil': {
            return reverse(result)
          }
          case 'cons': {
            let tempCurr = curr.head
            curr = curr.tail
            loop2: for (;;) {
              switch (tempCurr.type) {
                case 'nil': {
                  break loop2
                }
                case 'cons': {
                  result = {
                    type: 'cons',
                    head: tempCurr.head,
                    tail: result
                  }
                  tempCurr = tempCurr.tail
                }
              }
            }
          }
        }
      }
    }

    export const max = <T>(list: List<T>, compare: (value1: T, value2: T) => -1 | 1 | 0): T => {
      let maxValue: undefined | T = undefined
      switch (list.type) {
        case 'nil': {
          throw new Error(`the list is empty`)
        }
        case 'cons': {
          let curr: List<T> = list
          for (;;) {
            switch (curr.type) {
              case 'cons': {
                if (maxValue === undefined) {
                  maxValue = curr.head
                  curr = curr.tail
                } else {
                  const c = compare(maxValue, curr.head)
                  if (c === -1) {
                    maxValue = curr.head
                  } 
                  curr = curr.tail
                }
                break
              }
              case 'nil': {
                if (maxValue !== undefined) {
                  return maxValue
                }
              }
            }
          }
        }
      }
    }

    export const min = <T>(list: List<T>, compare: (value1: T, value2: T) => -1 | 1 | 0): T => {
      let minValue: undefined | T = undefined
      switch (list.type) {
        case 'nil': {
          throw new Error(`the list is empty`)
        }
        case 'cons': {
          let curr: List<T> = list
          for (;;) {
            switch (curr.type) {
              case 'cons': {
                if (minValue === undefined) {
                  minValue = curr.head
                  curr = curr.tail
                  continue
                } else {
                  const c = compare(minValue, curr.head)
                  if (c === 1) {
                    minValue = curr.head
                  }
                  curr = curr.tail
                }
                break
              }
              case 'nil': {
                if (minValue !== undefined) {
                  return minValue
                }
              }
            }
          }
        }
      }
    }

    export const sort = <T>(list: List<T>, compare: (value1: T, value2: T) => -1 | 1 | 0): List<T> => {
      const ary = toArray(list)
      ary.sort(compare)
      return fromArray(ary)
    }

    export const contain = <T>(list: List<T>, fn: (value: T) => boolean): boolean => {
      let curr = list
      for (;;) {
        switch (curr.type) {
          case 'nil': {
            return false
          }
          case 'cons': {
            if (fn(curr.head)) {
              return true
            }
            curr = curr.tail
          }
        }
      }
    }

    export const unfold = <State, T>(init: State, fn: (state: State) => [T, State] | undefined): List<T> => {
      let result: List<T> = nil
      let state = init
      for (;;) {
        const value = fn(state)
        if (value === undefined) {
          return reverse(result)
        } else {
          const [value_, newState] = value
          state = newState
          result = {
            type: 'cons',
            head: value_,
            tail: result
          }
        }
      }
    }
  }
}

export default data_structure