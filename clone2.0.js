// 添加解決循環應用，用map來解決，如果map裡面有那個target的鍵則表示這是一個循環應用，沒有則把target鍵加入到map中
function deepClone(target, map = new Map()) {
    if (typeof target === 'object') {
        let result = Array.isArray(target) ? [] : {};

        if (map.get(target)) {
            return map.get(target);
        } else {
            map.set(target, result);
        }

        for (const key in target) {
            result[key] = deepClone(target[key], map);
        }
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


/**while循環效率最高 */
// const arr = '2,'.repeat(1000000).split(',')
// const len = arr.length
// // 1.for in
// console.time()
// let sum = 0
// for (const key in arr) {
//   const element = arr[key]
//   sum += element
// }
// console.timeEnd()

// // 2.while
// console.time()
// let i = 0;
// sum = 0;
// while (i < len) {
//   const element = arr[i]
//   sum += element
//   i++
// }
// console.timeEnd()

// // 3.for
// sum = 0;
// console.time()
// for (let i = 0; i < len; i++) {
//   const element = arr[i]
//   sum += element
// }
// console.timeEnd()

// // 4.for of
// sum = 0;
// console.time();
// for (const val of arr) {
//     sum += val;
// }
// console.timeEnd();