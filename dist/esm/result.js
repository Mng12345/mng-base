/** @deprecated */
export const ResultModule = {
    ok: (value) => {
        return {
            type: 'ok',
            value
        };
    },
    err: (value) => {
        return {
            type: 'err',
            value
        };
    },
    map: (result, map, defaultValue) => {
        if (result.type === 'ok') {
            return ResultModule.ok(map(result.value));
        }
        else {
            if (defaultValue !== undefined) {
                return ResultModule.ok(defaultValue);
            }
            else {
                return result;
            }
        }
    },
    mapErr: (result, map) => {
        if (result.type === 'err') {
            return ResultModule.err(map(result.value));
        }
        else {
            return result;
        }
    }
};
export var ModuleResult;
(function (ModuleResult) {
    function ok(value) {
        return {
            type: 'ok',
            value
        };
    }
    ModuleResult.ok = ok;
    function err(value) {
        return {
            type: 'err',
            value
        };
    }
    ModuleResult.err = err;
    function map(result, map, defaultValue) {
        if (result.type === 'ok') {
            return ok(map(result.value));
        }
        else {
            if (defaultValue !== undefined) {
                return ok(defaultValue);
            }
            else {
                return result;
            }
        }
    }
    ModuleResult.map = map;
    function mapErr(result, map) {
        if (result.type === 'err') {
            return err(map(result.value));
        }
        else {
            return result;
        }
    }
    ModuleResult.mapErr = mapErr;
})(ModuleResult || (ModuleResult = {}));
export const ok = ModuleResult.ok;
export const err = ModuleResult.err;
export const map = ModuleResult.map;
export const mapErr = ModuleResult.mapErr;
