import React from 'react'
import {Image, StyleSheet, Text, View } from 'react-native'
import Title from '../assets/images/Title.png'
const Header = () => {
    return (
        <View style={styles.constainer}>  
           <Image style={{width: 400, height: 400 }} width= '10%' height='10%' source={Title}/>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    constainer:{
        maxHeight: 100,
        position: 'absolute',
        

    }
})
