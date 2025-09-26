function isArrayLike(data: any): data is ArrayLike<any> {
	return data.length !== undefined
}

/**
 * @deprecated
 */
export type MngIteratorNextResult<T> =
	| [done: true]
	| [done: false, value: T]

/**
 * @deprecated
 */
export interface MngIterator<T> {
	next(): MngIteratorNextResult<T>
}

/**
 * @deprecated
 */
export class Stream<T> {
	iterator: MngIterator<T>

	constructor(data: ArrayLike<T> | MngIterator<T>) {
		if (isArrayLike(data)) {
			let index = 0
			this.iterator = {
				next(): MngIteratorNextResult<T> {
					const value = data[index]
					if (index < data.length) {
						index++
						return [false, value]
					} else {
						return [true]
					}
				},
			}
		} else {
			this.iterator = data
		}
	}

	static of<T>(data: ArrayLike<T> | MngIterator<T>): Stream<T> {
		return new Stream<T>(data)
	}

	each(callback: (item: T, index?: number) => void): void {
		let index = 0
		while (true) {
			const value = this.iterator.next()
			if (value[0]) {
				break
			} else {
				callback(value[1], index++)
			}
		}
	}

	forEach(callback: (item: T, index?: number) => void): void {
		this.each(callback)
	}

	map<R>(callback: (item: T, index?: number) => R): Stream<R> {
		let index = 0
		const outThis = this
		const itor = {
			next(): MngIteratorNextResult<R> {
				const value = outThis.iterator.next()
				if (!value[0]) {
					const result = callback(value[1], index++)
					return [false, result ]
				} else {
					return value
				}
			},
		}
		return new Stream<R>(itor)
	}

	flatMap<R>(callback: (item: T, index?: number) => R[]): Stream<R> {
		let index = 0
		const outThis = this
		let tempResult: R[] = []
		let tempCursor = 0
		const iterator = {
			next(): MngIteratorNextResult<R> {
				if (tempCursor === tempResult.length) {
					const value = outThis.iterator.next()
					if (value[0]) {
						return value
					} else {
						tempResult = callback(value[1], index++)
						tempCursor = 0
					}
				}
				const item = tempResult[tempCursor++]
				return [false, item]
			},
		}
		return new Stream(iterator)
	}

	filter(callback: (item: T, index?: number) => boolean): Stream<T> {
		let index = 0
		const outThis = this
		const itor: MngIterator<T> = {
			next() {
				while (true) {
					const value = outThis.iterator.next()
					if (value[0]) {
						return value
					} else {
						const item = callback(value[1], index++)
						if (item) {
							return [false, value[1]]
						} else {
							continue
						}
					}
				}
			},
		}
		return new Stream<T>(itor)
	}

	collect(): T[] {
		const res: T[] = []
		while (true) {
			const item = this.iterator.next()
			if (item[0]) {
				break
			} else {
				res.push(item[1])
			}
		}
		return res
	}

	groupBy(callback: (item: T, index?: number) => string): DictionaryStream<T> {
		const result: { [index: string]: T[] } = {}
		const keys: string[] = []
		this.each((item, index) => {
			const key = callback(item, index)
			const value = result[key]
			if (value !== undefined) {
				value.push(item)
			} else {
				result[key] = [item]
				keys.push(key)
			}
		})
		return new DictionaryStream<T>(
			Stream.of(keys).map((key) => [key, result[key]] as const)
		)
	}
}

export class DictionaryStream<T> extends Stream<[string, T[]]> {
	constructor(stream: Stream<[string, T[]]>) {
		super(stream.iterator)
	}

	toDict() {
		const result: { [index: string]: T[] } = {}
		this.each((item) => {
			result[item[0]] = item[1]
		})
		return result
	}
}
