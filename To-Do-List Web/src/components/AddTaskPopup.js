import Datepicker from "react-datepicker";
import background from '../assets/images/postNote.png'
import SortingUtils from './SortingUtils'
import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";

function AddTaskPopup({ toggle, data, setData }) {

    let currentDate = new Date();
    var [dateMessage, setDateMessage] = useState(" ");
    var [dueDate, setDueDate] = useState(new Date());
    let [disable, setDisable] = useState(true);
    let [taskTitle, setTaskTitle] = useState("");
    useEffect(() => {
        localStorage.setItem('dateMessage', JSON.stringify(dateMessage));
        localStorage.setItem('taskTitle', document.getElementById('TaskTitle').innerHTML)
        let dateDiff = Math.round((dueDate - currentDate) / (1000 * 60 * 60 * 24))
        console.log(dateDiff);
        if (dateDiff < 0) {
            setDateMessage("date cannot be before current time");
        }
        else {
            setDateMessage(" ");
        }
        console.log('dateMessage:' + dateMessage);
        if (dateMessage === " " && taskTitle !== "") {
            console.log('hitting disable');
            setDisable(false);
        }
        else {
            setDisable(true);
        }


    })

    return (
        <div className="modal" style={{
            backgroundImage: `url(${background})`,
            width: '50%',
            minWidth: '195px'
            //make sure to use async and await
        }}>
            <div className="modal_content" style={{
                textAlign: 'center'
            }}>

                <form onChange={() => { console.log('something has changed'); }}>
                    {/* Using setData will look like this setData(data => [...data, newData]) */}
                    <input autoComplete='off' id="TaskTitle" style={{ width: '85%' }} type="text" placeholder="Title" required onChange={
                        event => {
                            setTaskTitle(event.target.value);
                            localStorage.setItem('taskTitle', JSON.stringify(event.target.value))
                            if (JSON.stringify(event.target.value) === "") {
                                document.getElementById.disabled = true;
                            }
                        }} />
                    <br />
                    <br />
                    <textarea rows='5' style={{
                        width: '98%',
                        height: '100%'
                    }}
                        placeholder="Description" id="taskField" type="textarea" name="name" onChange={event => localStorage.setItem('description', event.target.value)} />
                    <br />
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                        <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                    </svg>
                    <Datepicker required selected={dueDate} onChange={(date) => {

                        if (Math.round(dueDate - currentDate) < 0) {
                            console.log("Should throw error");
                            console.log(Math.round(dueDate - currentDate));
                            setDisable(true);
                        }
                        else {
                            console.log("all good here");

                        }
                        setDueDate(date);


                    }} />


                    <div style={{ color: 'red' }}>
                        <h6>
                            {dateMessage}
                        </h6>
                    </div>   <br />
                    {console.log("This is the button disabled: ", disable)}
                    <button id='btn1' disabled={disable} style={{

                        width: '100%',
                        height: '50px'
                    }} onClick={
                        () => {


                            if (taskTitle != '' && dateMessage === " ") {
                                localStorage.setItem('TaskDictionary', JSON.stringify([...JSON.parse(localStorage.getItem("TaskDictionary")),
                                {
                                    Title: taskTitle,
                                    Description: localStorage.getItem('description'),
                                    dueDate: dueDate,
                                    done: false

                                }


                                ]));

                            }
                            SortingUtils(JSON.parse(localStorage.getItem('TaskDictionary')), localStorage.getItem('sortType').toString());
                            localStorage.setItem('description', '');
                            setDisable(true);
                            localStorage.setItem('taskTitle', JSON.stringify(""));
                        }}>Add Task</button>

                </form>
            </div>
        </div>
    );
}
export default AddTaskPopup;