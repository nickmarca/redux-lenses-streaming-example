export const parseMessages = (messages, index) => {
    let arr = [],
        keys = [];
    Object.keys(JSON.parse(messages[index].key)).forEach(function(k) {
        keys.push({ label: k, value: JSON.parse(messages[index].key)[k] });
    });
    Object.keys(JSON.parse(messages[index].value)).forEach(function(k) {
        arr.push({ label: k, value: JSON.parse(messages[index].value)[k] });
    });
    return [arr, keys];
};

export const findInJSON = (json, keyword) => {
    const obj = JSON.parse(json);
    const values = Object.values(obj).map(i => i + '');
    return values.includes(keyword);
}