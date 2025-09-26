"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_structure;
(function (data_structure) {
    let list;
    (function (list_1) {
        list_1.nil = { type: 'nil' };
        list_1.fromArray = (array) => {
            let list = list_1.nil;
            for (let i = array.length - 1; i >= 0; i--) {
                list = {
                    type: 'cons',
                    head: array[i],
                    tail: list
                };
            }
            return list;
        };
        list_1.length = (list) => {
            let curr = list;
            let count = 0;
            for (;;) {
                if (curr.type === 'nil') {
                    break;
                }
                else {
                    count++;
                    curr = curr.tail;
                }
            }
            return count;
        };
        list_1.iter = (list, fn) => {
            let curr = list;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        fn(curr.head);
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
        };
        list_1.iteri = (list, fn) => {
            let curr = list;
            let i = 0;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        fn(curr.head, i);
                        i++;
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
        };
        list_1.map = (list, fn) => {
            let curr = list;
            let result = list_1.nil;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        const item = fn(curr.head);
                        result = {
                            type: 'cons',
                            head: item,
                            tail: result
                        };
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
            return list_1.reverse(result);
        };
        list_1.mapi = (list, fn) => {
            let curr = list;
            let result = list_1.nil;
            let i = 0;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        const item = fn(curr.head, i);
                        i++;
                        result = {
                            type: 'cons',
                            head: item,
                            tail: result
                        };
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
            return list_1.reverse(result);
        };
        list_1.toArray = (list) => {
            const result = [];
            let curr = list;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        result.push(curr.head);
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
            return result;
        };
        list_1.filter = (list, fn) => {
            let curr = list;
            let result = list_1.nil;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        if (fn(curr.head)) {
                            result = {
                                type: 'cons',
                                head: curr.head,
                                tail: result
                            };
                        }
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
            return list_1.reverse(result);
        };
        list_1.filteri = (list, fn) => {
            let curr = list;
            let result = list_1.nil;
            let i = 0;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        if (fn(curr.head, i)) {
                            result = {
                                type: 'cons',
                                head: curr.head,
                                tail: result
                            };
                        }
                        curr = curr.tail;
                        i++;
                    }
                }
                if (break_) {
                    break;
                }
            }
            return list_1.reverse(result);
        };
        list_1.all = (list, fn) => {
            let curr = list;
            for (;;) {
                let breakLoop = false;
                switch (curr.type) {
                    case 'nil': {
                        breakLoop = true;
                        break;
                    }
                    case 'cons': {
                        if (fn(curr.head)) {
                            curr = curr.tail;
                        }
                        else {
                            return false;
                        }
                    }
                }
                if (breakLoop) {
                    break;
                }
            }
            return true;
        };
        list_1.any = (list, fn) => {
            let curr = list;
            for (;;) {
                let breakLoop = false;
                switch (curr.type) {
                    case 'nil': {
                        breakLoop = true;
                        break;
                    }
                    case 'cons': {
                        if (fn(curr.head)) {
                            return true;
                        }
                        curr = curr.tail;
                    }
                }
                if (breakLoop) {
                    break;
                }
            }
            return false;
        };
        list_1.concat = (list, list2) => {
            let curr = list;
            let result = list_1.nil;
            let isLoopingList2 = false;
            loop: for (;;) {
                switch (curr.type) {
                    case 'nil': {
                        if (isLoopingList2) {
                            break loop;
                        }
                        else {
                            curr = list2;
                            isLoopingList2 = true;
                        }
                        break;
                    }
                    case 'cons': {
                        result = {
                            type: 'cons',
                            head: curr.head,
                            tail: result
                        };
                        curr = curr.tail;
                        break;
                    }
                }
            }
            return list_1.reverse(result);
        };
        list_1.reverse = (list) => {
            let curr = list;
            let result = list_1.nil;
            for (;;) {
                let break_ = false;
                switch (curr.type) {
                    case 'nil': {
                        break_ = true;
                        break;
                    }
                    case 'cons': {
                        result = {
                            type: 'cons',
                            head: curr.head,
                            tail: result
                        };
                        curr = curr.tail;
                    }
                }
                if (break_) {
                    break;
                }
            }
            return result;
        };
        list_1.fold = (list, initial, fn) => {
            let curr = list;
            let result = initial;
            for (;;) {
                let breakLoop = false;
                switch (curr.type) {
                    case 'nil': {
                        breakLoop = true;
                        break;
                    }
                    case 'cons': {
                        result = fn(result, curr.head);
                        curr = curr.tail;
                        break;
                    }
                }
                if (breakLoop) {
                    break;
                }
            }
            return result;
        };
        list_1.zip = (list, list2) => {
            let curr = list;
            let curr2 = list2;
            let result = list_1.nil;
            for (;;) {
                switch (curr.type) {
                    case 'nil': {
                        switch (curr2.type) {
                            case 'nil': {
                                return list_1.reverse(result);
                            }
                            case 'cons': {
                                throw new Error(`the lists be zipped should have the same length`);
                            }
                        }
                    }
                    case 'cons': {
                        switch (curr2.type) {
                            case 'nil': {
                                throw new Error(`the lists be zipped should have the same length`);
                            }
                            case 'cons': {
                                result = {
                                    type: 'cons',
                                    head: [curr.head, curr2.head],
                                    tail: result
                                };
                                curr = curr.tail;
                                curr2 = curr2.tail;
                            }
                        }
                    }
                }
            }
        };
        list_1.splitBy = (list, fn) => {
            const ary = list_1.toArray(list);
            const result = [];
            for (const item of ary) {
                if (fn(item)) {
                    if (result.length === 0) {
                        continue;
                    }
                    else {
                        result.push([]);
                    }
                }
                else {
                    if (result.length === 0) {
                        result.push([item]);
                    }
                    else {
                        const lastEle = result[result.length - 1];
                        lastEle.push(item);
                    }
                }
            }
            return list_1.fromArray(result.map(list_1.fromArray));
        };
        list_1.unzip = (list) => {
            let l1 = list_1.nil;
            let l2 = list_1.nil;
            let curr = list;
            for (;;) {
                switch (curr.type) {
                    case 'nil': {
                        return [list_1.reverse(l1), list_1.reverse(l2)];
                    }
                    case 'cons': {
                        const [v1, v2] = curr.head;
                        l1 = {
                            type: 'cons',
                            head: v1,
                            tail: l1
                        };
                        l2 = {
                            type: 'cons',
                            head: v2,
                            tail: l2
                        };
                        curr = curr.tail;
                    }
                }
            }
        };
        list_1.flatten = (list) => {
            let curr = list;
            let result = list_1.nil;
            for (;;) {
                switch (curr.type) {
                    case 'nil': {
                        return list_1.reverse(result);
                    }
                    case 'cons': {
                        let tempCurr = curr.head;
                        curr = curr.tail;
                        loop2: for (;;) {
                            switch (tempCurr.type) {
                                case 'nil': {
                                    break loop2;
                                }
                                case 'cons': {
                                    result = {
                                        type: 'cons',
                                        head: tempCurr.head,
                                        tail: result
                                    };
                                    tempCurr = tempCurr.tail;
                                }
                            }
                        }
                    }
                }
            }
        };
        list_1.max = (list, compare) => {
            let maxValue = undefined;
            switch (list.type) {
                case 'nil': {
                    throw new Error(`the list is empty`);
                }
                case 'cons': {
                    let curr = list;
                    for (;;) {
                        switch (curr.type) {
                            case 'cons': {
                                if (maxValue === undefined) {
                                    maxValue = curr.head;
                                    curr = curr.tail;
                                }
                                else {
                                    const c = compare(maxValue, curr.head);
                                    if (c === -1) {
                                        maxValue = curr.head;
                                    }
                                    curr = curr.tail;
                                }
                                break;
                            }
                            case 'nil': {
                                if (maxValue !== undefined) {
                                    return maxValue;
                                }
                            }
                        }
                    }
                }
            }
        };
        list_1.min = (list, compare) => {
            let minValue = undefined;
            switch (list.type) {
                case 'nil': {
                    throw new Error(`the list is empty`);
                }
                case 'cons': {
                    let curr = list;
                    for (;;) {
                        switch (curr.type) {
                            case 'cons': {
                                if (minValue === undefined) {
                                    minValue = curr.head;
                                    curr = curr.tail;
                                    continue;
                                }
                                else {
                                    const c = compare(minValue, curr.head);
                                    if (c === 1) {
                                        minValue = curr.head;
                                    }
                                    curr = curr.tail;
                                }
                                break;
                            }
                            case 'nil': {
                                if (minValue !== undefined) {
                                    return minValue;
                                }
                            }
                        }
                    }
                }
            }
        };
        list_1.sort = (list, compare) => {
            const ary = list_1.toArray(list);
            ary.sort(compare);
            return list_1.fromArray(ary);
        };
        list_1.contain = (list, fn) => {
            let curr = list;
            for (;;) {
                switch (curr.type) {
                    case 'nil': {
                        return false;
                    }
                    case 'cons': {
                        if (fn(curr.head)) {
                            return true;
                        }
                        curr = curr.tail;
                    }
                }
            }
        };
        list_1.unfold = (init, fn) => {
            let result = list_1.nil;
            let state = init;
            for (;;) {
                const value = fn(state);
                if (value === undefined) {
                    return list_1.reverse(result);
                }
                else {
                    const [value_, newState] = value;
                    state = newState;
                    result = {
                        type: 'cons',
                        head: value_,
                        tail: result
                    };
                }
            }
        };
    })(list = data_structure.list || (data_structure.list = {}));
})(data_structure || (data_structure = {}));
exports.default = data_structure;
