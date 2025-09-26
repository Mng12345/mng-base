export function nominal(value, typeName) {
    return Object.assign(Object.assign({}, value), { [__typeid__]: typeName });
}
export function structural(value) {
    return Object.assign(Object.assign({}, value), { [__typeid__]: undefined });
}
