import SortTasks from './SortTasks';
import Tasks from './Tasks';
import background from '../assets/images/paper.jfif'

function TodoList({ data, setData }) {

    return (
        <div style={{
            width:'30%',
            

        }}>

            <SortTasks data={data} setData={setData} />
            <div
                style={{
                    backgroundImage: `url(${background})`,
                  
                    height: "75%",
                    width: "125%",
                    overflowY: 'scroll',
                    minWidth: '400px'



                }}>
                <Tasks data={data} setData={setData} />
            </div>

        </div>
    );
}
export default TodoList;