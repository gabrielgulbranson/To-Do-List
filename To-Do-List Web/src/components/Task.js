import Datepicker from "react-datepicker";
import TackColor from "./TackColor";
import { useState } from 'react';

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
}
function DateColor({ Element }) {//complete color changer
    console.log("dateColor was hit");
    let currentDate = new Date();
    let taskDate = new Date(Element.dueDate);
    let dueMessage = "";
    let dateDiff = getDifferenceInDays(currentDate, taskDate);

    if (currentDate >= taskDate) {
        dueMessage = "(due)";
    }
    else if (dateDiff <= 3) {
        dueMessage = '(' + Math.round(dateDiff) + ' days)';
    }
    else {
        dueMessage = '(' + Math.round(dateDiff) + ' days)';
    }


    return (<div>Due: {taskDate.toLocaleDateString()} {dueMessage}</div>);
}

function EditIcons({ data, Element, toggle, toggleChecked }) {

    return (
        <div style={{
            justifyContent: 'flex-end'
        }}>

            &nbsp; &nbsp;

            <button onClick={() => {
                console.log('I was Clicked');
                toggleChecked();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
            </button>
            &nbsp;
            <button onClick={() => {
                toggle();
            }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>{
                    //edit ? <EditTaskPopup/> : null use this to change fields into input
                }</button>
            &nbsp;
            <button onClick={() => {
                //update the data when delete button is clicked. refresh will be done to show changes
                data.splice(data.indexOf(Element), 1);
                localStorage.setItem('TaskDictionary', JSON.stringify([...data]));
                window.location.reload(false);
            }
            }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg></button>
        </div>
    );
}
function EditDisplay({ color, Element, data, toggle, toggleChecked }) {

    var [dueDate, setDueDate] = useState(new Date(Element.dueDate));
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            localStorage.setItem('TaskDictionary', JSON.stringify([...data]));
            toggle();
            console.log("Enter key was pressed");
        }
    }
    return (
        <div style={{
            outline: '2px solid #CCC',
            border: '1px solid #999',
            paddingLeft: '50px',
            paddingBottom: '25px',
            position: 'relative'

        }}>
            <div style={{

                display: 'flex',


            }}>

                <TackColor color={color} />
                &nbsp;    &nbsp;
                <br />
                <div style={{ color: 'black' }}>

                    <input onChange={(event) => { Element.Title = event.target.value }} onKeyDown={(event) => {
                        handleKeyDown(event)
                    }} style={{
                        width: '100%',


                    }} defaultValue={Element.Title}></input>

                </div>

                <div style={{
                    marginLeft: 'auto'
                }}>
                    <EditIcons data={data} Element={Element} toggle={toggle} toggleChecked={toggleChecked} />
                </div>
            </div>
            <div style={{
                display: 'flex',
            }}>
                <div style={{ color: 'black' }}>
                    <textarea rows='5' onChange={(event) => { Element.Description = event.target.value }} type='text' onKeyDown={(event) => {
                        handleKeyDown(event)
                    }} style={{
                        width: '100%',


                    }} defaultValue={Element.Description} />
                </div>

                &nbsp; &nbsp; &nbsp;

                <div onDoubleClick={() => { toggle() }}>

                    Due: <Datepicker minDate={new Date()} onKeyDown={(event) => {
                        handleKeyDown(event)
                    }} selected={dueDate} onChange={(date) => {
                        Element.dueDate = date;
                        setDueDate(date);
                    }} />



                </div>
            </div>
        </div >
    );
}
function Display({ color, Element, data, toggle, toggleChecked, done }) {

    return (
        <div style={{
            outline: '2px solid #CCC',
            border: '1px solid #999',
            paddingLeft: '50px',
            paddingBottom: '25px',
            position: 'relative'

        }}>
            <div style={{

                display: 'flex',


            }}>


                <TackColor color={color} />
                &nbsp;    &nbsp; <br />
                <div onDoubleClick={() => { toggle() }} style={{ color: 'black' }}>
                    {Element.Title}


                </div>

                <div style={{
                    marginLeft: 'auto'
                }}>
                    <EditIcons data={data} Element={Element} toggle={toggle} toggleChecked={toggleChecked} />
                </div>
            </div>
            <div onDoubleClick={() => { toggle() }} style={{
                display: 'flex',
            }}>
                <div style={{ color: 'black' }}>
                    - {Element.Description}
                </div>

                &nbsp; &nbsp; &nbsp;

                <div onDoubleClick={() => { toggle() }}>

                    <DateColor Element={Element} />



                </div>
            </div>
        </div >
    );
}
function Task({ Element, data }) {
    const [edit, setEdit] = useState(false);
    const [done, setDone] = useState(false);

    let [color, setColor] = useState(Element.done ? 'green' : 'red');

    let toggleChecked = () => {
        setDone(!done);
        Element.done = done;
        localStorage.setItem('TaskDictionary', JSON.stringify([...data]));
        if (done === true) {
            setColor('green')
        }
        else if (done === false) {
            setColor('red')
        }

    }

    var toggleEdit = () => {
        setEdit(!edit);
    }

    return (
        <div>
            {edit ? <EditDisplay color={color} Element={Element} data={data} toggle={toggleEdit} toggleChecked={toggleChecked} /> : <Display color={color} Element={Element} data={data} toggle={toggleEdit} toggleChecked={toggleChecked} done={done} />}
        </div>

    );
}
export default Task;