import TodoList from '../src/components/TodoList'
import AddTasks from '../src/components/AddTasks';
import './App.css';
import Header from '../src/components/Header'
import background from './assets/images/cork.jpg';
import reactDom from 'react-dom';
import { useState } from 'react';
// make sure to follow this link!: https://www.youtube.com/watch?v=KcXsX1XXa2s for redux sticky notes
// https://www.youtube.com/watch?v=qlCnK9H9NTc fro store redux
function App() {


 
  if (localStorage.getItem('TaskDictionary') === null) {
    localStorage.setItem('TaskDictionary', JSON.stringify([]));
  }
  const [data, setData] = useState(JSON.parse(localStorage.getItem("TaskDictionary")));

  return (
    <div className="" style={{

      height: "100vh"
    }}>
      <Header />

      <div style={{
        height: '100%',
        display: 'flex',
        backgroundImage: `url(${background})`,
        paddingTop: '25px',
        paddingLeft: '25px'
      }}>
      
        <TodoList data={data} setData={setData} />
        <AddTasks data={data} setData={setData} />
      </div>

    </div >
  );
}

export default App;
