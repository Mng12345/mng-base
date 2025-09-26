/** @deprecated */
export const OptionModule = {
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
        return !OptionModule.isNonNullable(option);
    },
    empty: () => {
        return undefined;
    },
    flatMap(option, map) {
        if (OptionModule.isNullable(option)) {
            return option;
        }
        else {
            return map(option);
        }
    }
};
export var ModuleOption;
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
})(ModuleOption || (ModuleOption = {}));
export const map = ModuleOption.map;
export const isNonNullable = ModuleOption.isNonNullable;
export const isNullable = ModuleOption.isNullable;
export const empty = ModuleOption.empty;
export const flatMap = ModuleOption.flatMap;
