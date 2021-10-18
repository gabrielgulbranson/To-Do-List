import { StatusBar } from 'expo-status-bar';
import React, { useState, ref } from 'react';
import Task from './components/Task';
import { Image, Button, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Background from './assets/images/cork.jpg';
import DatePicker from 'react-native-datepicker';
import PostBackground from './assets/images/postNote.png';
import Todolist from './components/todolist';
import AddTaskPopup from './components/AddTaskPopup';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Title from './assets/images/Title.png';
import Header from './components/Header';
import Add from './assets/images/NewTaskIcon.png';
import { render } from 'react-dom';
import moment from 'moment';
import SortingUtils from './utilities/SortingUtils';
const styles = {
  container: {
    flex: 1,

  },
  postIt: {
    width: '90%',
    height: '50%',

    flex: 1,


  },
  tasksWrapper: {

    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  image: {
    flex: 1,


  },
  postImage: {
    flex: 1,
    width: '75%'
  },
  writeTaskWrapper: {
    position: 'absolute',
    paddingLeft: '12%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',

    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
  description: {
    marginTop: 15,
    width: 250,
    height: 100,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',

    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
  addText: {},
}

function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}
class App extends React.Component {
  constructor() {
    super();


    this.state = {
      taskItems: [],
      task: null,
      date: moment(new Date()).format('MM/DD/YYYY'),
      description: null,
      done: false,
      errorMessage: null,
      disabled: true,
      selectedValue: 'date',
      dueColor: 'red',
      due: 'Due!'
    }


  }

  componentDidMount() {
    
    setInterval(() => {
       let itemsCopy = [...this.state.taskItems];
    // itemsCopy[index].done = !itemsCopy[index].done
      this.state.taskItems.map(( (item, index)=>{

        let dateDiff = getDifferenceInDays(moment(new Date()), new Date(item.date));
    if (moment(new Date()).format('MM/DD/YYYY') === item.date) {
      itemsCopy[index].dueColor = 'red';
      itemsCopy[index].due = 'DUE!';
    }
    else if (dateDiff <= 3) {
      itemsCopy[index].dueColor = 'orange';
      itemsCopy[index].due = dateDiff + ' days';
      
    }
    else {
      itemsCopy[index].dueColor = 'black';
      itemsCopy[index].due = dateDiff + 'days';
    }
    this.setTodoItem(itemsCopy);





        console.log(index,': ',item.date);
      }));
    }, 100000);
  }
   

  setTodoItem = (itemsCopy) => {
    this.setState((state) => ({ taskItems: [...itemsCopy] }));
  }
  setDone = (itemsCopy) => {

    this.setState((state) => ({ taskItems: [...itemsCopy] }));

  }
  toggleDone = () => {
    this.setState((state) => ({ done: !this.state.done }));
  }
  handleChangeEdited = (index) =>{
    let itemsCopy = [...this.state.taskItems];
    // itemsCopy[index].done = !itemsCopy[index].done
    

      let dateDiff = getDifferenceInDays(moment(new Date()), new Date(itemsCopy[index].date));
    if (moment(new Date()).format('MM/DD/YYYY') === itemsCopy[index].date) {
      itemsCopy[index].dueColor = 'red';
      itemsCopy[index].due = 'DUE!';
    }
    else if (dateDiff <= 3) {
      itemsCopy[index].dueColor = 'orange';
      itemsCopy[index].due = dateDiff + ' days';
      
    }
    else {
      itemsCopy[index].dueColor = 'black';
      itemsCopy[index].due = dateDiff + ' days';
    }
    this.setTodoItem(itemsCopy);


    
  }
  handleDateChange = () =>{
    console.log("HandleDateChange():  ",moment(new Date()).format('MM/DD/YYYY'));
    console.log("this.state.date:   ",this.state.date);
    let dateDiff = getDifferenceInDays(moment(new Date()), new Date(this.state.date));
    if (moment(new Date()).format('MM/DD/YYYY') === this.state.date) {
      this.setState((state) => ({ dueColor: 'red' }));
      this.setState((state) => ({ due: 'DUE!' }));
    }
    else if (dateDiff <= 3) {
      this.setState((state) => ({ dueColor: 'orange' }));
      this.setState((state) => ({ due: dateDiff + ' days' }));
    }
    else {
      this.setState((state) => ({ dueColor: 'black' }));
      this.setState((state) => ({ due: dateDiff + ' days'}));
    }
  }
  handleAddTask = () => {

    Keyboard.dismiss();
    this.setState((prevState) => ({ taskItems: [...this.state.taskItems, { task: this.state.task, description: this.state.description, date: this.state.date, done: this.state.done, due: this.state.due, dueColor: this.state.dueColor }] }));
    this.setState(state => ({ description: null }));
    this.setState(state => ({ task: null }));
    SortingUtils(this.state.taskItems, this.state.selectedValue);
    console.log('TaskItems: ', this.state.taskItems);
  }
  
  render() {

    console.log('task: ', this.state.task);
    console.log('description: ', this.state.description);
    console.log('date: ', this.state.date);
    console.log('done: ', this.state.done);
    return (
      <View style={styles.container}>

        <ImageBackground style={styles.image} source={Background} resizeMode="cover">
          {/* Today's task */}

          <View style={styles.tasksWrapper}>
            {/* <Header/> */}

            <Todolist taskItems={this.state.taskItems} state={this.state} setState={this.setState} setTodoItem={this.setTodoItem} setDone={this.setDone} done={this.done} toggleDone={this.toggleDone} handleChangeEdited={this.handleChangeEdited}/>

          </View>


          {/* create the write a task section */}
          {/* <AddTaskPopup /> */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this._panel.show(Dimensions.get('window').height / 1.8)}>
              <Image style={{ width: 100, height: 100 }} width='10%' height='10%' source={Add} />
            </TouchableOpacity>




          </View>

        </ImageBackground>



        <SlidingUpPanel ref={c => this._panel = c}>
          <ImageBackground style={styles.postIt} source={PostBackground} resizeMode="cover">



            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.writeTaskWrapper}
            >
              <TextInput style={styles.title} placeholder={'Title'} value={this.state.task} onChangeText={text => {

                this.setState((state) => ({ task: text }))
                if (text !== '' && text !== null) {
                  this.setState((state) => ({ disabled: false }));
                }
                else {
                  this.setState((state) => ({ disabled: true }));
                }
              }} />
              <TextInput style={styles.description} placeholder={'Description'} value={this.state.description} onChangeText={text => {

                this.setState((state) => ({ description: text }))

              }} />
              <DatePicker
                style={{ width: 200, marginTop: 30, marginBottom: 30 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="MM/DD/YYYY"
                minDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {

                  this.setState({ date: date });
                  this.handleDateChange();
                }}
              />

              <TouchableOpacity disabled={this.state.disabled} onPress={() => { this.handleAddTask() }}>


                <Button title='Add Task' disabled={this.state.disabled} onPress={() => {
                  this.handleDateChange();
                  this.handleAddTask();
                  
                  this._panel.hide();

                  this.setState((state) => ({ date: moment(new Date()).format('MM/DD/YYYY') }))
                  this.setState((state) => ({ disabled: true }));
                }} />

              </TouchableOpacity>


            </KeyboardAvoidingView>

          </ImageBackground >
        </SlidingUpPanel>


      </View>
    );
  }
}

export default App;

