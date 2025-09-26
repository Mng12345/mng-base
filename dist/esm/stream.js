function isArrayLike(data) {
    return data.length !== undefined;
}
/**
 * @deprecated
 */
export class Stream {
    constructor(data) {
        if (isArrayLike(data)) {
            let index = 0;
            this.iterator = {
                next() {
                    const value = data[index];
                    if (index < data.length) {
                        index++;
                        return [false, value];
                    }
                    else {
                        return [true];
                    }
                },
            };
        }
        else {
            this.iterator = data;
        }
    }
    static of(data) {
        return new Stream(data);
    }
    each(callback) {
        let index = 0;
        while (true) {
            const value = this.iterator.next();
            if (value[0]) {
                break;
            }
            else {
                callback(value[1], index++);
            }
        }
    }
    forEach(callback) {
        this.each(callback);
    }
    map(callback) {
        let index = 0;
        const outThis = this;
        const itor = {
            next() {
                const value = outThis.iterator.next();
                if (!value[0]) {
                    const result = callback(value[1], index++);
                    return [false, result];
                }
                else {
                    return value;
                }
            },
        };
        return new Stream(itor);
    }
    flatMap(callback) {
        let index = 0;
        const outThis = this;
        let tempResult = [];
        let tempCursor = 0;
        const iterator = {
            next() {
                if (tempCursor === tempResult.length) {
                    const value = outThis.iterator.next();
                    if (value[0]) {
                        return value;
                    }
                    else {
                        tempResult = callback(value[1], index++);
                        tempCursor = 0;
                    }
                }
                const item = tempResult[tempCursor++];
                return [false, item];
            },
        };
        return new Stream(iterator);
    }
    filter(callback) {
        let index = 0;
        const outThis = this;
        const itor = {
            next() {
                while (true) {
                    const value = outThis.iterator.next();
                    if (value[0]) {
                        return value;
                    }
                    else {
                        const item = callback(value[1], index++);
                        if (item) {
                            return [false, value[1]];
                        }
                        else {
                            continue;
                        }
                    }
                }
            },
        };
        return new Stream(itor);
    }
    collect() {
        const res = [];
        while (true) {
            const item = this.iterator.next();
            if (item[0]) {
                break;
            }
            else {
                res.push(item[1]);
            }
        }
        return res;
    }
    groupBy(callback) {
        const result = {};
        const keys = [];
        this.each((item, index) => {
            const key = callback(item, index);
            const value = result[key];
            if (value !== undefined) {
                value.push(item);
            }
            else {
                result[key] = [item];
                keys.push(key);
            }
        });
        return new DictionaryStream(Stream.of(keys).map((key) => [key, result[key]]));
    }
}
export class DictionaryStream extends Stream {
    constructor(stream) {
        super(stream.iterator);
    }
    toDict() {
        const result = {};
        this.each((item) => {
            result[item[0]] = item[1];
        });
        return result;
    }
}
