"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nominal = nominal;
exports.structural = structural;
function nominal(value, typeName) {
    return Object.assign(Object.assign({}, value), { [__typeid__]: typeName });
}
function structural(value) {
    return Object.assign(Object.assign({}, value), { [__typeid__]: undefined });
}
