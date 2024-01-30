import React, { useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Booking } from '../../../components'
import styles from '../../../styles/styles'

const SteamerBookingScreen = ({ navigation }) => {
    useEffect(() => {
        
    }, [])
    return (
        <SafeAreaView style={[styles.screen]}>
            <View style={[{ zIndex: 1,flex:1 }]}>
                <Booking type='Steamer' title={'สตรีมเมอร์บ็อกซ์'} />
            </View>
         
        </SafeAreaView >

    )
}

export default SteamerBookingScreen