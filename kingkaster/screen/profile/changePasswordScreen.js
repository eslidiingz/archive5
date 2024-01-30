import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import styles from '../../styles/styles'
import colors from '../../styles/colors'
import fonts from '../../styles/fontStyles'

import { Header } from '../../components'

const ChangePasswordScreen = ({ navigation }) => {
   return (
      <SafeAreaView style={styles.screen}>
         <Header
            onPress={() => navigation.pop()}
            title='แก้ไขข้อมูลส่วนตัว'
         />
         <View style={[styles.container, { paddingTop: 15, flex: 1 }]}>
            <Input
               placeholder='รหัสผ่านเดิม'
               label='รหัสผ่านเดิม'
               labelStyle={[fonts.Medium18,pageStyle.label ]}
               inputStyle={[fonts.Regular17, { color: '#fff' }]}
               inputContainerStyle={pageStyle.containerInput}
               containerStyle={{ paddingHorizontal: 0 }}
            />
            <Input
               placeholder='รหัสผ่านใหม่'
               label='รหัสผ่านใหม่'
               labelStyle={[fonts.Medium18,pageStyle.label]}
               inputStyle={[fonts.Regular17, { color: '#fff' }]}
               inputContainerStyle={pageStyle.containerInput}
               containerStyle={{ paddingHorizontal: 0 }}
            />
            <Input
               placeholder='ยืนยันรหัสผ่านใหม่'
               label='ยืนยันรหัสผ่านใหม่'
               labelStyle={[fonts.Medium18,pageStyle.label]}
               inputStyle={[fonts.Regular17, { color: '#fff' }]}
               inputContainerStyle={pageStyle.containerInput}
               containerStyle={{ paddingHorizontal: 0 }}
            />
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
               <Button
                  title='บันทึก'
                  titleStyle={fonts.Regular18}
                  buttonStyle={pageStyle.containerInput}
               />
            </View>
         </View>
      </SafeAreaView>
   )
}
const pageStyle = StyleSheet.create({
   label:{ color: '#989898', fontWeight: 'normal' },
   containerInput:{ borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, }
})
export default ChangePasswordScreen