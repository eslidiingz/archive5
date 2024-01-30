import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import styles from '../../styles/styles'
import fonts from '../../styles/fontStyles'

import { Header } from '../../components'
import colors from '../../styles/colors'

const resetPasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState(null)
    const [CFPassword, setCFPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const passwordHandle = TextInput => {
        setPassword(TextInput)

    }
    const confirmPasswordHandle = TextInput => {
        setCFPassword(TextInput)

        if (password !== TextInput) {
            console.log('not match')
            setConfirmPassword(false)
        } else {
            console.log('match')
            setConfirmPassword(true)
        }
    }
    useEffect(() => {
        console.log(confirmPassword)
    }, [])
    return (
        <SafeAreaView style={styles.screen}>
            <Header
                onPress={() => navigation.pop()}
                title='รีเซ็ตรหัสผ่าน'
            />
            <View style={[styles.container, { paddingTop: 15, flex: 1 }]}>
                <Input
                    placeholder='รหัสผ่านเก่า'
                    label='รหัสผ่านเดิม'
                    labelStyle={[fonts.Medium18, pageStyle.label, { color: '#FFF' }]}
                    inputStyle={[fonts.Regular18, styles.registerInputStyle]}
                    inputContainerStyle={styles.registerInputContainer}
                    containerStyle={{ paddingHorizontal: 0 }}
                />
                <Input
                    onChangeText={passwordHandle}
                    placeholder='รหัสผ่านใหม่'
                    label='รหัสผ่านใหม่'
                    labelStyle={[fonts.Medium18, pageStyle.label, { color: '#FFF' }]}
                    inputStyle={[fonts.Regular18, styles.registerInputStyle]}
                    inputContainerStyle={styles.registerInputContainer}
                    containerStyle={{ paddingHorizontal: 0 }}
                    
                    errorStyle={[{ alignSelf: 'flex-end', color: colors.yellow }, fonts.Regular15]}
                    errorMessage={'กรุณาใส่รหัสผ่าน 8 ตัวอักษรขึ้นไป'}
                    secureTextEntry={true}
                />
                <Input
                    secureTextEntry={true}
                    onChangeText={confirmPasswordHandle}
                    placeholder='ยืนยันรหัสผ่านใหม่'
                    label='ยืนยันรหัสผ่านใหม่'
                    labelStyle={[fonts.Medium18, pageStyle.label, { color: '#FFF' }]}
                    inputStyle={[fonts.Regular18, styles.registerInputStyle]}
                    inputContainerStyle={styles.registerInputContainer}
                    containerStyle={{ paddingHorizontal: 0 }}
                    errorMessage={

                        CFPassword != null ? confirmPassword !== true ?
                            'รหัสผ่านไม่ตรงกัน'
                            :
                            'รหัสผ่านตรงกัน'
                            : null

                    }
                    errorStyle={
                        confirmPassword !== true ? [fonts.Light14, { color: colors.red }] : [fonts.Light14, { color: colors.success }]
                    }
                />
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        title='บันทึก'
                        titleStyle={fonts.Regular18}
                        buttonStyle={[pageStyle.containerInput,{backgroundColor:colors.blue}]}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    label: { color: '#989898', fontWeight: 'normal' },
    containerInput: { borderWidth: 1, borderColor: '#2d325a', borderRadius: 6, paddingLeft: 20, marginTop: 10, }
})
export default resetPasswordScreen