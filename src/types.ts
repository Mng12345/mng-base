namespace types {
	export type Narrow<T, P> = T extends P ? T : never

	export type Undefined2Null<T> = {
		[K in keyof T]-?: T[K] extends infer Value
			? undefined extends Value
				? NonNullable<Value> extends infer NonNullableValue
					? NonNullableValue extends never
						? null
						: NonNullableValue extends object
						? Undefined2Null<NonNullableValue>
						: NonNullableValue | null
					: null
				: null
			: null
	}

	namespace narrow_test {
		type P =
			| {
					type: 'v1'
					id: string
					age: number
			  }
			| {
					type: 'v2'
					id: string
					name: string
			  }
			| {
					type: 'v3'
					id: string
					url: string
					config:
						| {
								type: 'img'
								value: number
						  }
						| {
								type: 'gif'
								value: string
						  }
			  }
		type V1 = Narrow<P, { type: 'v1' }>
		type V3 = Narrow<P, { type: 'v3' }>
	}

	namespace undefined2null_test {
		type T = {
			a: undefined | null | number
			b?: string
			c?: number
			d?: {
				a: number
				b?: string
				c: string
			}
		}

		type TResult = Undefined2Null<T>
	}
}

export default types

declare const __typeid__: unique symbol

export type nominal<Type, Identifier> = Type & {
  readonly [__typeid__]: Identifier
}

export type structural<Type> = Omit<Type, typeof __typeid__>

export function nominal<Type, const Identifier>(value: Type, typeName: Identifier): nominal<Type, Identifier> {
  return {
    ...value,
    [__typeid__]: typeName
  }
}

export function structural<Type, const Identifier>(value: nominal<Type, Identifier>): Type {
  return {
    ...value,
    [__typeid__]: undefined
  }
}

/** @deprecated */
export type ExtractUnion<T, P> = T extends P ? T : never

/** @deprecated */
export type ExtractUnionByType<T, type extends string> = ExtractUnion<T, { type: type }>

export type ExtractByType<T extends {type: string}, TypeTag extends T['type']> = Extract<T, {type: TypeTag}>

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

namespace type_test {
	type Field = {
		type: 'plain-field'
		name: string
	} | {
		type: 'alias-field'
		original: Field
	}

	type PlainField = ExtractByType<Field, 'plain-field'>
}
