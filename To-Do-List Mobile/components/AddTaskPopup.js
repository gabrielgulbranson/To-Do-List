import React from 'react'
import {ImageBackground, StyleSheet, Text, View } from 'react-native'
import Background from '../assets/images/postNote.png'
const AddTaskPopup = () => {
    return (
        <ImageBackground source={Background} style={styles.container}> 
            <View >
            <Text>This is the add a Task section</Text>
        </View>
        </ImageBackground>
        
    )
}

export default AddTaskPopup

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '75%',
        flex: 2,
        justifyContent: 'center',
    
    }
})
