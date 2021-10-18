import SortingUtils from './SortingUtils';
import React, {component} from 'react';
function SortTasks({ data, setData }) {
    if(localStorage.getItem('sortType') === null){
        localStorage.setItem('sortType', '');
    }
    return (
        <div style={{
            display: 'flex',
            paddingBottom: '25px',
            width: '125%',
            backgroundColor: 'white',
            minWidth: '400px'
        }}>


            <button onClick={()=>{
                localStorage.setItem('sortType', 'date');
                SortingUtils(data, 'date');
            }}>Sort Date</button>

            <button onClick={()=>{
                localStorage.setItem('sortType', 'name');
                SortingUtils(data, 'name');
            }}>Sort Name</button>

        </div>
    );
}

export default SortTasks;

