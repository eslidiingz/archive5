import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements'
import styles from '../styles/styles';
import normalize from '../function/normalize';
import fontStyles from '../styles/fontStyles';
import colors from '../styles/colors';
import IconApp from './Icon';
import { wp } from '../function/screen';

const Wallet = () => {
   return (
      <View style={{ marginTop: normalize(15), marginBottom: normalize(20) }}>
         <View>
            <View style={[styles.flexRow, pageStyle.walletSession]}>
               <View style={[pageStyle.containerPoint]}>
                  <Text style={[fontStyles.Medium17, { color: '#FFF', marginBottom: 5 }]}>วอเลต</Text>
                  <View style={[styles.flexRow, { alignItems: 'center', justifyContent: 'flex-start', marginBottom: 0, overflow: 'hidden' }]}>
                     <IconApp name="cash-coin" width={wp(25)} height={wp(25)} />
                     <Text style={[fontStyles.Medium18, { color: '#FFF', left: normalize(10), paddingBottom: normalize(5) }]}>380 KK</Text>
                  </View>
                  <View style={[styles.flexRow, { alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }]}>
                     <IconApp name="point" width={wp(25)} height={wp(25)} />
                     <Text style={[fontStyles.Medium18, { color: colors.yellow, left: normalize(10), paddingBottom: normalize(5) }]}>23,303 Point</Text>
                  </View>
               </View>
               <View style={{ paddingHorizontal: normalize(25), flex: 1, flexGrow: 0.35, alignItems: 'center' }}>
                  <IconApp name="wallet" width={wp(30)} height={wp(30)} />
                  <Text style={[fontStyles.Regular14, { color: colors.white, paddingLeft: 5 }]}>เติมเงิน</Text>
               </View>
            </View>
         </View>
      </View>
   )
}

const pageStyle = StyleSheet.create({
   containerPoint: {
      paddingLeft: normalize(20),
      paddingTop: normalize(10),
      paddingBottom: normalize(10),
      flex: 1,
      borderRightWidth: 2, borderRightColor: '#5e638b'
   },
   walletSession: {
      backgroundColor: colors.darkGreyBlue1,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#5e638b',
      marginTop: 5
   }
})

export default Wallet