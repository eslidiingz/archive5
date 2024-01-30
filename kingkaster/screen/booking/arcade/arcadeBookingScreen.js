import React, { useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import {  BookingArcade } from '../../../components'
import styles from '../../../styles/styles'

const arcadeBookingScreen = ({ navigation }) => {
    useEffect(() => {
        
    }, [])
    return (
        <SafeAreaView style={[styles.screen]}>
            <View style={[{ zIndex: 1,flex:1 }]}>
                <BookingArcade type='Arcade' title={'คอนโซลและอาร์เคด'} />
            </View>
         
        </SafeAreaView >

    )
}

export default arcadeBookingScreen