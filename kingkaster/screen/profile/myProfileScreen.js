import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../../styles/styles'
import fontStyles from '../../styles/fontStyles'
import colors from '../../styles/colors'
import fonts from '../../styles/fontStyles'

import { Header } from '../../components'

const MyProfileScreen = ({ navigation }) => {
   return (
      <SafeAreaView style={styles.screen}>
         <Header
            onPress={() => navigation.pop()}
            title='บัญชีของฉัน'
         />
         <ScrollView style={[styles.container, { paddingTop: 15, marginBottom: 15 }]}>
            <View style={myProfileStyle.box}>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium18, myProfileStyle.header, { color: '#fdce00' }]}>ข้อมูลส่วนตัว</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
                     <Text style={[fontStyles.Regular18, myProfileStyle.content, { color: '#4076ff', textDecorationLine: 'underline', paddingLeft: 30 }]}>แก้ไข</Text>
                  </TouchableOpacity>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>ชื่อ</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>BabyIce Charee</Text>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>อีเมล</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>babyice@kk.com</Text>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>เบอร์โทรศัพท์มือถือ</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>081 234 5678</Text>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>วันเดือนปีเกิด</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>07/04/2535</Text>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>เพศ</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>หญิง</Text>
               </View>
            </View>
            <View style={myProfileStyle.box}>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium18, myProfileStyle.header, { color: '#fdce00' }]}>รหัสผ่าน</Text>
                  <Text style={[fontStyles.Regular18, myProfileStyle.content, { color: '#9097ce', paddingTop: 5 }]}>********</Text>
                  {/* <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
                     <View style={{ flexDirection: 'row' }}>
                      
                        <Text style={[fontStyles.Regular18, myProfileStyle.content, { color: '#4076ff', textDecorationLine: 'underline', paddingLeft: 20 }]}>แก้ไข</Text>
                     </View>
                  </TouchableOpacity> */}
               </View>
            </View>
            <View style={myProfileStyle.box}>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium18, myProfileStyle.header, { color: '#fdce00' }]}>บัตรของฉัน</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('AddCreditCardScreen')}>
                     <Text style={[fontStyles.Regular18, myProfileStyle.content, { color: '#4076ff', textDecorationLine: 'underline', paddingLeft: 30 }]}>แก้ไข</Text>
                  </TouchableOpacity>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>บัตรเดบิต</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>*5845</Text>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.header]}>บัตรเครดิต</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.content]}>*4959</Text>
               </View>
            </View>
            <View style={myProfileStyle.box}>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium18, myProfileStyle.header, { color: '#fdce00' }]}>ที่อยู่ของฉัน</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('IndexAddress')}>
                     <Text style={[fontStyles.Regular18, myProfileStyle.content, { color: '#4076ff', textDecorationLine: 'underline', paddingLeft: 30 }]}>แก้ไข</Text>
                  </TouchableOpacity>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.addressHeader]}>ชื่อ-นามสกุล</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.addressContent]}>สมหญิง รักดี</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.addressContent, { color: '#f5404b' }]}>(ที่อยู่หลัก)</Text>
               </View>
               <View style={myProfileStyle.line}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.addressHeader]}>เบอร์โทรศัพท์</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.addressContent]}>(+66) 080 081 8292</Text>
               </View>
               <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, alignItems: 'flex-start' }}>
                  <Text style={[fontStyles.Medium17, myProfileStyle.addressHeader]}>ที่อยู่</Text>
                  <Text style={[fontStyles.Regular17, myProfileStyle.addressContent]}>592/212 ซอยลาด แขวงจรเข้บัว เขตลาดพร้าว กทม. 10230</Text>
               </View>
            </View>
            <Button
               title='บันทึก'
               titleStyle={fonts.Regular18}
               buttonStyle={{ backgroundColor: colors.blue, height: 60, borderRadius: 8, paddingHorizontal: 15 }}
               containerStyle={{ marginBottom: 40, marginTop: 5}}
            />
         </ScrollView>
      </SafeAreaView>
   )
}

const myProfileStyle = StyleSheet.create({
   box: {
      backgroundColor: colors.darkGreyBlue1,
      borderRadius: 6,
      padding: 15,
      marginBottom: 15
   },
   line: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
      height: 38
   },
   header: {
      flex: 1,
      color: colors.white,
      height: 38
   },
   content: {
      color: '#9097ce',
      height: 38
   },
   addressHeader: {
      color: colors.white,
   },
   addressContent: {
      color: colors.white,
      paddingLeft: 15
   }
})

export default MyProfileScreen