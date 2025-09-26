"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structural = exports.nominal = void 0;
function nominal(value, typeName) {
    return Object.assign(Object.assign({}, value), { [__typeid__]: typeName });
}
exports.nominal = nominal;
function structural(value) {
    return Object.assign(Object.assign({}, value), { [__typeid__]: undefined });
}
exports.structural = structural;
