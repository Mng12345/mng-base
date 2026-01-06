export function nominal(value, typeName) {
    return {
        ...value,
        [__typeid__]: typeName
    };
}
export function structural(value) {
    return {
        ...value,
        [__typeid__]: undefined
    };
}
