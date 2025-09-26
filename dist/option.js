"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatMap = exports.empty = exports.isNullable = exports.isNonNullable = exports.map = exports.ModuleOption = exports.OptionModule = void 0;
/** @deprecated */
exports.OptionModule = {
    map: (option, map, defaultValue) => {
        if (option === null || option === undefined) {
            return defaultValue !== null && defaultValue !== void 0 ? defaultValue : undefined;
        }
        else {
            return map(option);
        }
    },
    isNonNullable: (option) => {
        return option !== null && option !== undefined;
    },
    isNullable: (option) => {
        return !exports.OptionModule.isNonNullable(option);
    },
    empty: () => {
        return undefined;
    },
    flatMap(option, map) {
        if (exports.OptionModule.isNullable(option)) {
            return option;
        }
        else {
            return map(option);
        }
    }
};
var ModuleOption;
(function (ModuleOption) {
    function map(option, map, defaultValue) {
        if (option === null || option === undefined) {
            return defaultValue !== null && defaultValue !== void 0 ? defaultValue : undefined;
        }
        else {
            return map(option);
        }
    }
    ModuleOption.map = map;
    function isNonNullable(option) {
        return option !== null && option !== undefined;
    }
    ModuleOption.isNonNullable = isNonNullable;
    function isNullable(option) {
        return !isNonNullable(option);
    }
    ModuleOption.isNullable = isNullable;
    function empty() {
        return undefined;
    }
    ModuleOption.empty = empty;
    function flatMap(option, map) {
        if (isNullable(option)) {
            return option;
        }
        else {
            return map(option);
        }
    }
    ModuleOption.flatMap = flatMap;
})(ModuleOption || (exports.ModuleOption = ModuleOption = {}));
exports.map = ModuleOption.map;
exports.isNonNullable = ModuleOption.isNonNullable;
exports.isNullable = ModuleOption.isNullable;
exports.empty = ModuleOption.empty;
exports.flatMap = ModuleOption.flatMap;
