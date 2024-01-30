import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native'
import { Input, Button } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles/styles'
import colors from '../../styles/colors'
import fonts from '../../styles/fontStyles'
import { Modalize } from 'react-native-modalize';
import { Header } from '../../components'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { hp, wp } from '../../function/screen';

const EditProfileScreen = ({ navigation }) => {
   const [isGenderVisible, setGenderVisibility] = useState(false);
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [datePicker, setdatePicker] = useState(null)
   const [dateResult, setdateResult] = useState('')
   const [gender, setgender] = useState('')
   const modalizeRef = useRef(null);
   const showDatePicker = () => {
      setDatePickerVisibility(true)
   }
   const showGender = () => {
      modalizeRef.current?.open();
   }
   const hideDatePicker = () => {
      setDatePickerVisibility(false)
   }

   const handleConfirm = (date) => {
      setdatePicker(date)
      hideDatePicker()
   }

   useEffect(() => {
      if (datePicker) {
         setdateResult(datePicker.getDate() + '/' + (datePicker.getMonth() + 1) + '/' + datePicker.getFullYear())
      }
   }, [datePicker])
   return (
      <SafeAreaView style={styles.screen}>
         <Header
            onPress={() => navigation.pop()}
            title='แก้ไขข้อมูลส่วนตัว'
         />
         <ScrollView style={[styles.container, { paddingTop: 15, marginBottom: 15 }]}>
            <Input
               placeholder='ชื่อ'
               label='ชื่อ'
               labelStyle={[fonts.Medium18, { color: '#989898', fontWeight: 'normal' }]}
               inputStyle={[fonts.Regular17, { color: '#fff' }]}
               inputContainerStyle={pageStyle.containerInput}
               containerStyle={{ paddingHorizontal: 0 }}
            />
            <Text style={[fonts.Regular14, { color: colors.white, marginTop: -20, marginBottom: 20 }]}>100 ตัวอักษร</Text>
            <Input
               placeholder='babyIce@kk.com'
               label='อีเมล'
               labelStyle={[fonts.Medium18, { color: '#989898', fontWeight: 'normal' }]}
               inputStyle={[fonts.Regular17, { color: '#fff' }]}
               inputContainerStyle={pageStyle.containerInput}
               containerStyle={{ paddingHorizontal: 0 }}
            />
            <Text style={[fonts.Regular14, { color: colors.white, marginTop: -20, marginBottom: 20 }]}>ตัวอย่าง xxx@gmail.com</Text>
            <Input
               keyboardType='number-pad'
               label='เบอร์โทรศัพท์มือถือ'
               labelStyle={[fonts.Medium18, { color: '#989898', fontWeight: 'normal' }]}
               inputStyle={[fonts.Regular17, { color: '#fff' }]}
               inputContainerStyle={pageStyle.containerInput}
               containerStyle={{ paddingHorizontal: 0 }}
            />
            <DateTimePickerModal
               isVisible={isDatePickerVisible}
               mode="date"
               onConfirm={handleConfirm}
               onCancel={hideDatePicker}
            />
            <TouchableWithoutFeedback onPress={showDatePicker}>
               <View pointerEvents="none">
                  <Input
                     placeholder='กรุณาใส่วันเดือนปีเกิดของคุณ'
                     label='วันเดือนปีเกิด'
                     labelStyle={[fonts.Medium18, { color: '#989898', fontWeight: 'normal' }]}
                     inputStyle={[fonts.Regular17, { color: '#fff' }]}
                     inputContainerStyle={pageStyle.containerInput}
                     containerStyle={{ paddingHorizontal: 0 }}
                     value={dateResult}
                  /></View>
            </TouchableWithoutFeedback>
            <Text style={[fonts.Medium18, { color: '#989898', fontWeight: 'normal' }]}>เพศ</Text>
            {
               Platform.OS === 'ios' ?
                  <TouchableWithoutFeedback onPress={showGender}>
                     <View pointerEvents="none">
                        <Input
                           placeholder='กรุณาเลือกเพศของคุณ'
                           labelStyle={[fonts.Medium18, { color: '#989898', fontWeight: 'normal' }]}
                           inputStyle={[fonts.Regular17, { color: '#fff' }]}
                           inputContainerStyle={pageStyle.containerInput}
                           containerStyle={{ paddingHorizontal: 0 }}
                           value={gender}
                        /></View>
                  </TouchableWithoutFeedback>
                  :
                  <View style={{ borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, marginBottom: 30 }}>
                     <Picker
                        itemStyle={[fonts.Regular17]}
                        selectedValue={gender}
                        style={[fonts.Regular17, { height: 50, width: '100%', color: gender === '' ? '#989898' : '#fff' }]}
                        onValueChange={(itemValue, itemIndex) =>
                           setgender(itemValue)
                        }>
                        <Picker.Item label='กรุณาเลือกเพศของคุณ' value='' />
                        <Picker.Item label='ชาย' value='ชาย' />
                        <Picker.Item label='หญิง' value='หญิง' />
                     </Picker>
                  </View>
            }


            <Button
               title='บันทึก'
               titleStyle={fonts.Regular18}
               buttonStyle={{ backgroundColor: colors.blue, height: 60, marginBottom: 60, marginTop: 15, borderRadius: 8 }}
            />
         </ScrollView>
         <Modalize
            ref={modalizeRef}
            modalStyle={{ backgroundColor: '#F8F8F8',}}

            closeOnOverlayTap={true} snapPoint={hp(300)}
            withOverlay={false} modalHeight={hp(300)}
            withHandle={false}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
         >
            <View style={{height:hp(300), backgroundColor: '#d7d6dc' }}>
               <Picker
                  itemStyle={[fonts.Regular17]}
                  selectedValue={gender}
                  style={[fonts.Regular17, { color: gender === '' ? '#989898' : '#fff' }]}
                  onValueChange={(itemValue, itemIndex) => {
                     setgender(itemValue)
                     setGenderVisibility(false)
                     modalizeRef.current?.close();
                  }
                  }>
                  <Picker.Item label='กรุณาเลือกเพศของคุณ' value='' />
                  <Picker.Item label='ชาย' value='ชาย' />
                  <Picker.Item label='หญิง' value='หญิง' />
               </Picker>
            </View>
         </Modalize>
      </SafeAreaView>
   )
}
const pageStyle = StyleSheet.create({
   containerInput: { borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, }
})
export default EditProfileScreen