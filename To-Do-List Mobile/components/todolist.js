import React from 'react'
import {Modal,FlatList,SafeAreaView, ScrollView, Picker, ImageBackground, TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native'
import Task from './Task'
import Background from '../assets/images/VectorPaper.png'
import SortingUtils from '../utilities/SortingUtils'
class Todolist extends React.Component {
    
    constructor(){
        super()
        this.state= {
            selectedValue: 'date',
            modalVisible: false
        }
    }
    completeTask = (index) => {
        let itemsCopy = [...this.props.taskItems];
        itemsCopy.splice(index, 1);
        console.log('items Copy: ', itemsCopy);
        console.log('task items: ', this.props.taskItems);
        this.props.setTodoItem(itemsCopy);

        console.log('task items: ', this.props.taskItems);
       // SortingUtils(this.props.taskItems,this.state.selectedValue) useless
    }
    setDone = (index) => {
        let itemsCopy = [...this.props.taskItems];
        itemsCopy[index].done = !itemsCopy[index].done
        this.props.setDone(itemsCopy);
    }
    setEdit = (index, task, description, date) => {
        let itemsCopy = [...this.props.taskItems];
        itemsCopy[index].task = task;
        itemsCopy[index].description = description;
        itemsCopy[index].date = date;
        this.props.setDone(itemsCopy);
    }
    render() {
        return (

            
            <ImageBackground style={styles.items} source={Background} resizeMode='cover'>
                {/* <Modal
                animationType='slide'
                
                visible={this.state.modalVisible}
                >
                    <Text>This is inside of the modal</Text>
                </Modal> */}
                <Picker
                    selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 120 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                        this.setState((state)=>({selectedValue: itemValue}))
                        SortingUtils(this.props.taskItems, itemValue);
                    }}
                    >
                         <Picker.Item label="Date" value="date" />
                         <Picker.Item label="Name" value="name" />
                    </Picker>
                <SafeAreaView>
               
                <ScrollView style={{height: '65%'}}>
                
                  
                {SortingUtils(this.props.taskItems, this.state.selectedValue)}

                {this.props.taskItems.map((item, index) => {
                    return (
                      
                        <Task key={index} index={index} task={item.task} description={item.description} date={item.date} done={item.done} completeTask={this.completeTask} setDone={this.setDone} setEdit={this.setEdit} due ={item.due} dueColor={item.dueColor} handleChangeEdited={this.props.handleChangeEdited}/>
                              

                    );
                })}
                </ScrollView>
                </SafeAreaView>
            </ImageBackground>




        )
    }

}

export default Todolist

const styles = StyleSheet.create({
    items: {
        marginTop: 40,
        height: "80%",


    },

})
