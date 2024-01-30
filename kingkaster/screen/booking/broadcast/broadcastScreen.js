import React from 'react';
import { SafeAreaView, View } from 'react-native';
import {  BookingArcade } from '../../../components';
import styles from '../../../styles/styles';

const broadcastScreen = () => {
    return(
        <SafeAreaView style={[styles.screen]}>
           <View style={[{ zIndex: 1,flex:1 }]}>
                <BookingArcade type='Broadcast' title={'บรอดคาสท์สตูดิโอและสเตจ'} />
            </View>
        </SafeAreaView>
    )
}
export default broadcastScreen