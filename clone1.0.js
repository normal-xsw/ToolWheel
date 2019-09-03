const obj = {
    name: 'zxc',
    age: 20,
    a: [1, 2],
};
// obj.b = obj;

const newObj = deepClone2(obj);
console.log(newObj);
newObj.a[0] = 10;
console.log(obj);

/** 有循環引用的問題，其他引用類型沒有考慮*/

// 淺拷貝
function clone(target) {
    let result = {};
    for (const key in target) {
        result[key] = target[key];
    }
    return result;
}

// 初級深拷貝, my
function deepClone(target) {
    let result = Array.isArray(target) ? [] : {};
    for (const key in target) {
        if (typeof target[key] === 'object') {
            result[key] = deepClone(target[key]);
        } else {
            result[key] = target[key];
        }
    }

    return result;
}

// other
function deepClone2(target) {
    if (typeof target === 'object') {
        let result = Array.isArray(target) ? [] : {};
        for (const key in target) {
            result[key] = deepClone2(target[key]);
        }
        return result;
    } else {
        return target;
    }
}
