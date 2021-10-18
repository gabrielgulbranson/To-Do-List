function SortingUtils(data, sortingType) {
    console.log('you hit sorting utils');
    if (sortingType === 'date') {
        SortDate(data);
    }
    else if (sortingType === 'name') {
        SortName(data);
    }
}
function SortDate(data) {
    let value = data.sort((a, b) =>
        new Date(...a.date.split('-').reverse()) - new Date(...b.date.split('-').reverse()));
    console.log('This is sorted: ', value);
    console.log('we are sorting the dates');
}
function SortName(data) {
    console.log('we are sorting the names')
    let value = data.sort((a, b) => {
        return compareObjects(a, b, 'task');
    });
    console.log('sort name: ', value);
}

function compareObjects(object1, object2, key) {
    const obj1 = object1[key].toUpperCase();
    const obj2 = object2[key].toUpperCase();
    if (obj1 < obj2) {
        return -1
    }
    if (obj1 > obj2) {
        return 1
    }
    return 0
}

export default SortingUtils;