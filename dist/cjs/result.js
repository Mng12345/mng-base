"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapErr = exports.map = exports.err = exports.ok = exports.ModuleResult = exports.ResultModule = void 0;
/** @deprecated */
exports.ResultModule = {
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
            return exports.ResultModule.ok(map(result.value));
        }
        else {
            if (defaultValue !== undefined) {
                return exports.ResultModule.ok(defaultValue);
            }
            else {
                return result;
            }
        }
    },
    mapErr: (result, map) => {
        if (result.type === 'err') {
            return exports.ResultModule.err(map(result.value));
        }
        else {
            return result;
        }
    }
};
var ModuleResult;
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
})(ModuleResult || (exports.ModuleResult = ModuleResult = {}));
exports.ok = ModuleResult.ok;
exports.err = ModuleResult.err;
exports.map = ModuleResult.map;
exports.mapErr = ModuleResult.mapErr;
