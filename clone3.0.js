function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneOtherType(target, type) {
    const Ctor = target.constructor;
    switch(type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag: 
            return cloneReg(target);
        case symbolTag: 
            return cloneSymbol(target);
        case functionTag: 
            return target;
        default:
            return null;
    }
}

function cloneSymbol(target) {
    return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target) {
    const reFlags = /\w*$/;
    const result = new target.constructor(target.source, reFlags.exec(target));
    result.lastIndex = target.lastIndex;
    return result;
}

function deepClone(target, map = new Map) {
    // 無需繼續遍歷的類型，直接返回其值
    if (!isObject(target)) {
        return target;
    }

    // 根據target的類型來初始化result
    const type = getType(target);
    let result;
    if (deepTag.includes(type)) {
        result = getInit(target);
    } else {
        result = cloneOtherType(target, type);
        return result;
    }

    // 防止循環引用
    if (map.get(target)) {
        return map.get(target);
    } else {
        map.set(target, result);
    }

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            result.add(deepClone(value, map));
        })
    } else if (type === mapTag) { // 克隆map
        target.forEach((value, key) => {
            result.set(key, deepClone(value, map));
        })
    } else if (type === arrayTag || type === objectTag) {
        // 克隆object and array
        const keys = type === arrayTag ? undefined : Object.keys(target);
        myForEach(keys || target, (value, key) => {
            if (!!keys) {  // 是對象
                key = value;   // 這時key存的是下標，value才是鍵
            }
            result[key] = deepClone(target[key]);
        })
    }

    return result;
}

// myForEach
function myForEach(arr, callback) {
    const  len = arr.length;
    let index = -1;
    while(++index < len) {
        callback(arr[index], index);
    }
}

// 可繼續遍歷
const mapTag = '[object Map]';
const setTag = '[object Set]';
const objectTag = '[object Object]';
const arrayTag = '[object Array]';

const deepTag = [mapTag, setTag, objectTag, arrayTag];

// 不用繼續遍歷，直接返回其值就行
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const functionTag = '[object Function]';

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};

console.time();
const cloneValue = deepClone(target);
console.log(cloneValue);
console.timeEnd();

cloneValue.map.set('key', 'otherValue');
console.log(cloneValue);
console.log(target);