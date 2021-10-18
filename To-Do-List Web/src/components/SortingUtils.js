function SortingUtils(data, sortingType){
 console.log('you hit sortingUtils');  
    if(sortingType === 'date'){
        SortDate(data);
    }
    else if(sortingType === 'name'){
        SortName(data);
    }
}

function SortDate(data){
    let value = data.sort((a, b) => 
    new Date(...a.dueDate.split('/').reverse()) - new Date(...b.dueDate.split('/').reverse()));
    console.log(value);
    localStorage.setItem('TaskDictionary', JSON.stringify([...value]));
    window.location.reload();
}
 function SortName(data){
    let value = data.sort((a, b) => {
        return compareObjects(a, b, 'Title');
    });
    console.log(value);
    localStorage.setItem('TaskDictionary', JSON.stringify([...value]));
    window.location.reload();
 }
 
 function compareObjects(object1, object2, key){
    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
 }
export default SortingUtils;
;