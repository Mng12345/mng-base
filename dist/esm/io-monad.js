export class IOMonad {
    constructor(effect) {
        this.effect = effect;
        this._classId = 'IOMonad';
    }
    static of(effect) {
        return new IOMonad(effect);
    }
    map(f) {
        return IOMonad.of(() => {
            return f(this.effect());
        });
    }
    flatMap(f) {
        return IOMonad.of(() => {
            const e = this.effect();
            return f(e).effect();
        });
    }
    combine(monad2) {
        return IOMonad.of(() => {
            return [this.effect(), monad2.effect()];
        });
    }
}
