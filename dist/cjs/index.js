"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleBase = exports.ObjectExt = exports.Pipe = exports.Option = exports.Result = exports.ResultErr = exports.ResultOk = exports.ds = exports.block = exports.isNullable = exports.isNotNull = void 0;
const data_structure_1 = __importDefault(require("./data_structure"));
const option_1 = require("./option");
const result_1 = require("./result");
/**
 * @deprecated
 */
var base;
(function (base) {
    let pipe;
    (function (pipe) {
        function make(x) {
            return {
                x,
                to(f) {
                    return make(f(x));
                },
            };
        }
        pipe.make = make;
    })(pipe = base.pipe || (base.pipe = {}));
    /**
     * @deprecated
     */
    let result;
    (function (result_2) {
        function map(result, f) {
            switch (result.type) {
                case 'ok': {
                    return {
                        type: 'ok',
                        value: f(result.value),
                    };
                }
                case 'err': {
                    return result;
                }
            }
        }
        result_2.map = map;
        function flatMap(result, f) {
            switch (result.type) {
                case 'ok': {
                    return f(result.value);
                }
                case 'err': {
                    return result;
                }
            }
        }
        result_2.flatMap = flatMap;
    })(result = base.result || (base.result = {}));
    function block(f) {
        return f();
    }
    base.block = block;
    base.isNotNull = (value) => {
        return value !== null && value !== undefined;
    };
    base.ds = data_structure_1.default;
})(base || (base = {}));
exports.default = base;
exports.isNotNull = base.isNotNull;
const isNullable = (value) => {
    return value === null || value === undefined;
};
exports.isNullable = isNullable;
exports.block = base.block;
exports.ds = data_structure_1.default;
class ResultOk {
    constructor(value) {
        this.value = value;
        this.tag = 'ok';
    }
}
exports.ResultOk = ResultOk;
class ResultErr {
    constructor(value) {
        this.value = value;
        this.tag = 'err';
    }
}
exports.ResultErr = ResultErr;
/**
 * @deprecated
 */
class Result {
    constructor(value) {
        this.value = value;
    }
    static ok(value) {
        return new Result(new ResultOk(value));
    }
    static err(value) {
        return new Result(new ResultErr(value));
    }
    isOk() {
        return this.value instanceof ResultOk;
    }
    isErr() {
        return this.value instanceof ResultErr;
    }
    unwrap() {
        if (this.isOk()) {
            return this.value.value;
        }
        else {
            throw new Error(`this.value is not an instanceof ResultOk<T>`);
        }
    }
    unwrapOr(defaultValue) {
        if (this.isOk()) {
            return this.value.value;
        }
        else {
            return defaultValue;
        }
    }
    unwrapOrElse(defaultF) {
        if (this.isOk()) {
            return this.value.value;
        }
        else {
            return defaultF();
        }
    }
    expect(message) {
        if (this.isOk()) {
            return this.value.value;
        }
        else {
            throw new Error(message);
        }
    }
    map(op) {
        if (this.value instanceof ResultOk) {
            return Result.ok(op(this.value.value));
        }
        else {
            return Result.err(this.value.value);
        }
    }
    flatMap(op) {
        if (this.value instanceof ResultOk) {
            return op(this.value.value);
        }
        else {
            return Result.err(this.value.value);
        }
    }
    mapOr(defaultValue, op) {
        if (this.value instanceof ResultOk) {
            return op(this.value.value);
        }
        else {
            return defaultValue;
        }
    }
    mapOrElse(defaultF, op) {
        if (this.isOk()) {
            return op(this.value.value);
        }
        else {
            return defaultF();
        }
    }
    mapErr(op) {
        if (this.value instanceof ResultErr) {
            return Result.err(op(this.value.value));
        }
        else {
            return Result.ok(this.value.value);
        }
    }
}
exports.Result = Result;
/**
 * @deprecated
 */
class Option {
    constructor(value) {
        this.value = value;
    }
    static some(value) {
        return new Option(value);
    }
    static none() {
        return new Option(undefined);
    }
    isSome() {
        return this.value !== undefined;
    }
    isNone() {
        return this.value === undefined;
    }
    unwrap() {
        if (this.value !== undefined) {
            return this.value;
        }
        else {
            throw new Error(`this.value is None`);
        }
    }
    expect(message) {
        if (this.value !== undefined) {
            return this.value;
        }
        else {
            throw new Error(message);
        }
    }
    unwrapOr(defaultValue) {
        if (this.isSome()) {
            return this.value;
        }
        else {
            return defaultValue;
        }
    }
    unwrapOrElse(op) {
        if (this.isSome()) {
            return this.value;
        }
        else {
            return op();
        }
    }
    map(op) {
        if (this.isSome()) {
            return Option.some(op(this.value));
        }
        else {
            return Option.none();
        }
    }
    mapOr(defaultValue, op) {
        if (this.isSome()) {
            return op(this.value);
        }
        else {
            return defaultValue;
        }
    }
    mapOrElse(defaultF, op) {
        if (this.isSome()) {
            return op(this.value);
        }
        else {
            return defaultF();
        }
    }
}
exports.Option = Option;
class Pipe {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        return new Pipe(value);
    }
    next(f) {
        return new Pipe(f(this.value));
    }
    get() {
        return this.value;
    }
}
exports.Pipe = Pipe;
class ObjectExt {
    static keys(object) {
        const keys = Object.keys(object);
        const isKey = (key) => object.hasOwnProperty(key);
        const result = [];
        for (const key of keys) {
            if (isKey(key)) {
                result.push(key);
            }
        }
        return result;
    }
}
exports.ObjectExt = ObjectExt;
var ModuleBase;
(function (ModuleBase) {
    ModuleBase.ModuleOption = option_1.ModuleOption;
    ModuleBase.ModuleResult = result_1.ModuleResult;
})(ModuleBase || (exports.ModuleBase = ModuleBase = {}));
