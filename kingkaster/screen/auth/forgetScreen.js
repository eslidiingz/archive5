import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, PixelRatio, SafeAreaView, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';
import moment from 'moment';
import * as authenActions from '../../store/actions/auth'
import { useDispatch } from 'react-redux';
import { Header } from '../../components';

const forgetScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [checkmail, setcheckmail] = useState(false)  

  
    const emailHandle = TextInput => {
        setEmail(TextInput)
        if(TextInput === ''){
            setcheckmail(true)
        }else{
            setcheckmail(false)
        }
    }
   

    const sendRegister = async () => {
        if(email != ''){
            navigation.navigate('CompleteScreen',{title:'ลืมรหัสผ่าน',mail:email,type:'forget'})
        }else{
            setcheckmail(true)
        }
         
    }
    
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, }}>
            <Header
               title='ลืมรหัสผ่าน'
               onPress={()=>navigation.pop()}
           />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[{ flex: 1 }]}
            >
                <View style={{ marginTop: hp(20), flex: 1, marginHorizontal: wp(24) }}>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <Text style={[fontStyles.Medium18, { color: colors.white }]}>อีเมล</Text>
                            <Input
                                id="email"
                                onChangeText={emailHandle}
                                keyboardType='email-address'
                                inputStyle={[fontStyles.Regular18, styles.registerInputStyle]}
                                inputContainerStyle={styles.registerInputContainer}
                                containerStyle={[{ paddingHorizontal: 0, paddingVertical: 8 }]}
                                placeholder={'อีเมล'}
                                placeholderTextColor={'#5a5f83'}
                                autoCorrect={false}
                                errorMessage={
                                    checkmail === true ?
                                        'กรุณาระบุอีเมล์'
                                        : null
                                }
                                errorStyle={
                                    [fontStyles.Light14, { color: colors.red }]
                                }
                            />
                            <Text style={[fontStyles.Regular15,{color:colors.yellow}]}>
                                กรุณาระบุอีเมลของท่าน ระบบจะส่งลิงค์เพื่อกำหนดรหัสผ่าน
                                ไปยังอีเมลที่ลงทะเบียนไว้
                            </Text>

                        </ScrollView>
                    </View>

                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={()=> navigation.navigate('ResetPasswordScreen')}>
                <Text style={[fontStyles.Medium15,{color:colors.blue,alignSelf:'center',marginBottom:50}]}>
                    รีเซ็ตพาสเวิร์ด
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: hp(30), marginHorizontal: wp(24) }}>
                <Button
                    title='ตกลง'
                    onPress={sendRegister}
                    titleStyle={fontStyles.Regular18}
                    containerStyle={styles.registerBtn}
                    buttonStyle={{ backgroundColor: colors.blue, height: 52 }}
                />
            </View>

        </SafeAreaView>

    )
}

export default forgetScreen