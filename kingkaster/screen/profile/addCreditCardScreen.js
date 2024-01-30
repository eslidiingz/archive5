import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import { Button, Switch } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import { Header } from '../../components'
import normalize from '../../function/normalize'
import { hp, wp } from '../../function/screen'
import colors from '../../styles/colors'
import fontStyles from '../../styles/fontStyles'
import styles from '../../styles/styles'

const addCreditCardScreen = ({ navigation }) => {
    const [save, setSave] = useState(true)
    const [mainCard, setMainCard] = useState(false)
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                title={'เพิ่มบัตรเดบิต/เครดิต'}
                onPress={() => navigation.pop()}

            />
            <View style={[styles.container, { marginTop: hp(20) }]}>
                <Input
                    placeholder='หมายเลขบัตร'
                    label='หมายเลขบัตร'
                    placeholderTextColor='#5d628e'
                    labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                    inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                    inputContainerStyle={pageStyle.containerInput}
                    containerStyle={{ paddingHorizontal: 0 }}
                />
                <Input
                    placeholder='ชื่อ-นามสกุล บนบัตร'
                    label='ชื่อ-นามสกุล บนบัตร'
                    placeholderTextColor='#5d628e'
                    labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                    inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                    inputContainerStyle={pageStyle.containerInput}
                    containerStyle={{ paddingHorizontal: 0 }}
                />
                <View style={[styles.flexRow]}>
                    <View style={[{ flex: 1, paddingRight: 7.5 }]}>
                        <Input
                            placeholder='เดือนปีหมดอายุ'
                            label='เดือนปีหมดอายุ'
                            placeholderTextColor='#5d628e'
                            labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                            inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                            inputContainerStyle={pageStyle.containerInput}
                            containerStyle={{ paddingHorizontal: 0 }}
                        />
                    </View>
                    <View style={[{ flex: 1, paddingLeft: 7.5 }]}>
                        <Input
                            placeholder='CVV'
                            label={<View style={[styles.flexRow]}>
                                <Text style={[fontStyles.Medium18, pageStyle.label, { color: '#FFF', marginRight: wp(10) }]}>
                                    CVV
                                </Text>
                                <Icon name='questioncircle' size={normalize(18)} color={'#c6c3bd'} />
                            </View>}
                            placeholderTextColor='#5d628e'

                            inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                            inputContainerStyle={pageStyle.containerInput}
                            containerStyle={{ paddingHorizontal: 0 }}
                        />
                    </View>
                </View>
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <View>
                        <Text style={[fontStyles.Medium16, { color: colors.white }]}>
                            บันทึกบัตรไว้ใช้ในภายหลัง
                        </Text>
                        <Text style={[fontStyles.Regular12, { color: colors.white }]}>
                            ข้อมูลบัตรของท่านจะถูกเก็บรักษาไว้อย่างปลอดภัย
                        </Text>
                    </View>
                    <View style={[{ marginTop: hp(20) }]}>
                        <Switch value={save} onValueChange={() => setSave(!save)} color={colors.blue} />
                    </View>
                </View>
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <View>
                        <Text style={[fontStyles.Medium16, { color: colors.white }]}>
                            ตั้งค่าบัตรหลัก
                        </Text>
                    </View>
                    <View style={[{ marginTop: hp(20) }]}>
                        <Switch value={mainCard} onValueChange={() => setMainCard(!mainCard)} color={colors.blue} />
                    </View>
                </View>
                <View style={[styles.flexRow,{marginTop:hp(50)}]}>
                    <View style={[{ flex: 1,marginRight:wp(7.5) }]}>
                        <Button
                            title='ยกเลิก'
                            buttonStyle={[{ backgroundColor: '#5d628e', borderRadius: 8 }]}
                            titleStyle={[fontStyles.Regular16]}
                        />

                    </View>
                    <View style={[{ flex: 1,marginLeft:wp(7.5) }]}>
                        <Button
                            title='ยกเลิก'
                            onPress={()=> navigation.navigate('completeProfileScreen')}
                            buttonStyle={[{ backgroundColor: colors.blue, borderRadius: 8 }]}
                            titleStyle={[fontStyles.Regular16]}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    label: { color: '#989898', fontWeight: 'normal' },
    containerInput: { borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, }
})
export default addCreditCardScreen