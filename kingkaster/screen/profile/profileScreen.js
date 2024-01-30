import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Image } from 'react-native-elements'
import styles from '../../styles/styles'
import fontStyles from '../../styles/fontStyles'
import normalize from '../../function/normalize'
import colors from '../../styles/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { Header, IconApp, Wallet } from '../../components'
import { hp, wp } from '../../function/screen'
import { logout } from '../../store/actions/auth'

const profileScreen = ({ navigation }) => {
   const dispatch = useDispatch();
   useEffect(() => {

   }, [dispatch])
   return (
      <SafeAreaView style={styles.screen}>
         <View style={{ backgroundColor: colors.borderInput, zIndex: 1, height: hp(166), marginTop: - hp(55), paddingTop: hp(26), paddingBottom: hp(30), justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 42, borderBottomRightRadius: 42, flexDirection: 'row' }}>
            <Text style={[fontStyles.Regular18, { color: '#ffffff', flex: 1 }]}></Text>
            <Text style={[fontStyles.Regular18, { color: '#ffffff', flex: 1, textAlign: 'center' }]}>โปรไฟล์</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
               <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>

                  <View style={{ backgroundColor: '#141622', marginRight: wp(20), paddingHorizontal: 8, paddingVertical: 7, borderRadius: 50 }}>
                     <IconApp name='bell' width={wp(20)} height={wp(20)} />

                  </View>
               </TouchableOpacity>
            </View>
         </View>
         <View style={{ zIndex: 2, alignItems: 'center' }}>
            <View style={{
               width: normalize(110),
               height: normalize(110),
               backgroundColor: '#fff',
               marginTop: normalize(-45),
               borderRadius: 200,
               padding: 6
            }}>
               <Image
                  source={require('../../assets/img/IU.jpg')}
                  style={{
                     width: '100%',
                     height: '100%',
                     borderRadius: 200
                  }} />
            </View>
         </View>
         <View style={{ backgroundColor: '#fff', alignItems: 'center', borderBottomLeftRadius: 42, borderBottomRightRadius: 42, marginTop: -150, paddingTop: 50, paddingBottom: 20 }}>
            <Text style={[fontStyles.Medium18, { marginTop: normalize(100) }]}>Lee Ji Eun</Text>
         </View>
         <ScrollView style={[styles.container, { flex: 1 }]} showsVerticalScrollIndicator={false}>
            <Wallet />
            <View style={profileStyle.contentBox}>
               <TouchableOpacity onPress={() => navigation.navigate('MyOrderScreen')}>
                  <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 5 }}>
                     <Image source={require('../../assets/icon/bluecart.png')} style={{ width: normalize(25), height: normalize(23) }} />
                     <Text style={[fontStyles.Medium16, { color: '#fff', marginLeft: 10 }]}>การซื้อของฉัน</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <View style={profileStyle.contentBox}>
               <TouchableOpacity onPress={() => navigation.navigate('MyProfileScreen')}>
                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 5 }}>
                        <Image source={require('../../assets/icon/myprofile.png')} style={{ width: normalize(22), height: normalize(22) }} />
                        <Text style={[fontStyles.Medium16, { color: '#fff', marginLeft: 10 }]}>บัญชีของฉัน</Text>
                     </View>
                  </View>
               </TouchableOpacity>
            </View>
            <View style={profileStyle.contentBox}>
            <TouchableOpacity onPress={() => navigation.navigate('basket', { from: 'navigate',tab:'favorite' })}>
               <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 5 }}>
                     <Image source={require('../../assets/icon/list.png')} style={{ width: normalize(23), height: normalize(21) }} />
                     <Text style={[fontStyles.Medium16, { color: '#fff', marginLeft: 10 }]}>วิสลิสต์ของฉัน</Text>
                  </View>
               </View>
            </TouchableOpacity>
            </View>
            <View style={[profileStyle.contentBox]}>
               <TouchableOpacity onPress={() => navigation.navigate('EditLanguageScreen')}>
                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 5 }}>
                        <Image source={require('../../assets/icon/language-setting.png')} style={{ width: normalize(23), height: normalize(23) }} />
                        <Text style={[fontStyles.Medium16, { color: '#fff', marginLeft: 10 }]}>ตั้งค่าภาษา</Text>
                     </View>
                  </View>
               </TouchableOpacity>
            </View>
            <View
               style={[{ marginBottom: hp(150) }]}
            >
               <TouchableOpacity

                  onPress={async () => {
                     try {
                        await dispatch(logout())
                     } catch (e) {
                        Alert.alert('แจ้งเตือน', e.message)
                     }
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                     <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 5 }}>
                        <Text style={[fontStyles.Medium16, { color: '#fff', marginLeft: 10, textDecorationLine: 'underline' }]}>ออกจากระบบ</Text>
                     </View>
                  </View>
               </TouchableOpacity>

            </View>


         </ScrollView>
      </SafeAreaView>
   )
}

const profileStyle = StyleSheet.create({
   contentBox: {
      backgroundColor: colors.darkGreyBlue1,
      borderRadius: 6,
      padding: 15,
      marginBottom: 15
   },
   buyProcess: {
      paddingVertical: 25,
      marginTop: 10,
      marginBottom: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#d9d9d9',
      borderBottomWidth: 0.5,
      borderBottomColor: '#d9d9d9',
      flexDirection: 'row'
   },
   buyStatus: {
      flex: 1,
      alignItems: 'center'
   },
   buyStatusText: {
      color: '#fff',
      marginTop: 5
   }
})

export default profileScreen