// myForEach
function myForEach(arr, callback) {
    const  len = arr.length;
    let index = -1;
    while(++index < len) {
        callback(arr[index], index);
    }
}

function deepClone(target, map = new Map) {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);
        let result = isArray ? [] : {};

        if (map.get(target)) {
            return map.get(target);
        } else {
            map.set(target, result);
        }

        const keys = isArray ? undefined : Object.keys(target);
        myForEach(keys || target, (value, key) => {
            if (!!keys) {
                key = value;
            }
            result[key] = deepClone(target[key], map);
        })
        // for (const key in target) {
        //     result[key] = deepClone(target[key]);
        // }
        return result;
    } else {
        return target;
    }
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;

console.time();
const result = deepClone(target);
console.timeEnd();
