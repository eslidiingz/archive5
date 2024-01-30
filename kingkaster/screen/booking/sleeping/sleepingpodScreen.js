import React from 'react';
import { SafeAreaView, View } from 'react-native';
import {  BookingArcade } from '../../../components';
import styles from '../../../styles/styles';

const sleepingpodScreen = () => {
    return(
        <SafeAreaView style={[styles.screen]}>
           <View style={[{ zIndex: 1,flex:1 }]}>
                <BookingArcade type='Sleeping' title={'สลีปปิ้งพอด'} />
            </View>
        </SafeAreaView>
    )
}
export default sleepingpodScreen