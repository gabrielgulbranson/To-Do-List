import React, { useState } from 'react'
import { KeyboardAvoidingView, TextInput, ImageBackground, Modal, Dimensions, Image, View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
const Thumbtack = { uri: 'https://svg-clipart.com/svg/cartoon/mSzpkUz-thumb-tack-vector.svg' }
import redTack from '../assets/images/redTackTrans.png';
import greenTack from '../assets/images/greenTackTrans.png';
import complete from '../assets/images/complete.png';
import edit from '../assets/images/edit.png';
import trash from '../assets/images/trash.png';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PostBackground from '../assets/images/postNote.png';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
function TackColor({ color }) {
    if (!color) {
        return (
            <Image style={{ width: 35, height: 33 ,marginRight: 10}} width='10%' height='10%' source={redTack} />
        );
    }
    else {
        return (
            <Image style={{ width: 30, height: 23, marginRight: 10}} width='10%' height='10%' source={greenTack} />
        );
    }

}
function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}

const Task = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [task, setTask] = useState(props.task);
    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.date);
    // const [due, setDue] = useState(getDifferenceInDays(new Date(props.date), new Date()));
    // const [dateColor, setDateColor] = useState('black');
    // if(due === 0 ){
    //     setDue('due');
    //     setDateColor('red');
    // }
  
    // if(due<=3){
    //     setDateColor('red');
    // }
    // else{
    //     setDateColor('black');
    // }
    return (
        
        <View style={styles.item}>

            {/* {setDue(getDifferenceInDays(new Date(props.date), new Date()))} */}
            <Modal
                
                style={styles.modal}
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                 <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{
                            position: 'absolute',
                            paddingLeft: '12%',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                <ImageBackground style={styles.postIt} source={PostBackground} resizeMode="cover">
                   
                        <View>
                            <TextInput style={styles.title} value={task} onChangeText={text => {
                                setTask(text);
                                if (text !== '' && text !== null) {
                                    setDisabled(false);
                                } else {
                                    setDisabled(true);
                                }
                            }} />

                            <TextInput style={styles.description} placeholder='description' value={description} onChangeText={text => {
                                setDescription(text);
                            }} />

                            <DatePicker
                                style={{ width: 200, marginTop: 30, marginBottom: 5 }}
                                date={date}
                                mode="date"
                                placeholder="select date"
                                format="MM/DD/YYYY"
                                minDate={moment(new Date()).format('MM/DD/YYYY')}
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
                                onDateChange={(d) => { setDate(d) }}
                            />
                            <View style={{ paddingLeft: 30, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ padding: 10 }}>
                                    <Button title="Update" disabled={disabled} onPress={() => { 
                                         props.setEdit(props.index, task, description, date);
                                        setModalVisible(false) 
                                        props.handleChangeEdited(props.index);
                                        }} />
                                </View>

                                <Button color='#E85647' title="Cancel"  onPress={() => { 
                                    
                                   
                                    setModalVisible(false) }} />


                            </View>

                        </View>
                  
                </ImageBackground>
                </KeyboardAvoidingView>
            </Modal>
            {/* <SvgUri
              style={{flex: 2}}
                    width="25px"
                    height="25px"
                    uri="https://svg-clipart.com/svg/cartoon/mSzpkUz-thumb-tack-vector.svg"
                /> */}
            <View style={styles.itemLeft}>
                {/* <ImageBackground style={{flex: 1}} source={thumbtack} resizeMode='cover'></ImageBackground> */}
                <TackColor color={props.done} />
                <View>
                    {/* <Text style={styles.itemText}>SVG</Text> */}

                    <Text style={styles.itemText}>{props.task}</Text>

                    <Text style={styles.itemText}>- {props.description}</Text>
                    <Text style={styles.itemText}>Due:</Text>
                    <Text color='red' style={styles.itemText, {color: props.dueColor}}>   {props.date} { }({props.due})</Text>
                </View>

            </View>
            <TouchableOpacity onPress={() => { props.setDone(props.index); console.log('you have completed task: ', props.task) }}>
                <Image style={{ width: 20, height: 20 }} width='10%' height='10%' source={complete} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(true); console.log('you have edited task: ', props.task) }}>
                <Image style={{ width: 20, height: 20 }} width='10%' height='10%' source={edit} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.completeTask(props.index); console.log('you have deleted task: ', props.task) }}>
                <Image style={{ width: 20, height: 20 }} width='10%' height='10%' source={trash} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    modal:{
        shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.12,
            shadowRadius: 60,
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
    postIt: {
        position: 'relative',
        flex: 1,
        paddingHorizontal: 35,
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    item: {

        padding: 0,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderColor: '#55BCF6',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    pushPinRed: {

    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    itemText: {
        maxWidth: 150,
        fontFamily: 'sans-serif-medium'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
})
export default Task;