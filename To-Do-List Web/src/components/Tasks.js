import Task from './Task';
function Tasks({ data, setData }) {

    // This should list all of the tasks

    return (
        <div>
            {data.map(
                function (value) {
                    return (
                        <div key={value.Title}>
                            <Task Element={value} data={data} />
                        </div>
                    );
                }
            )}

        </div>
    );
}
export default Tasks;