interface Effect<T> {
  (): T
}

export class IOMonad<E> {
  _classId = 'IOMonad' as const
  constructor(readonly effect: Effect<E>) {}

  static of<E>(effect: Effect<E>): IOMonad<E> {
    return new IOMonad<E>(effect)
  }

  map<E2>(f: (e: E) => E2): IOMonad<E2> {
    return IOMonad.of(() => {
      return f(this.effect())
    })
  }

  flatMap<E2>(f: (e: E) => IOMonad<E2>): IOMonad<E2> {
    return IOMonad.of(() => {
      const e = this.effect()
      return f(e).effect()
    })
  }

  combine<E2>(monad2: IOMonad<E2>): IOMonad<[E, E2]> {
    return IOMonad.of(() => {
      return [this.effect(), monad2.effect()]
    })
  }
} 