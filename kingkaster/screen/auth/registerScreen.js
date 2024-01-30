import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, SafeAreaView, Alert, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const registerScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState(null)
    const [CFPassword, setCFPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [date, setDate] = useState(null);
    const [checkdate, setCheckdate] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [checkNull, setCheckNull] = useState({
        name: false,
        email: false,
        phone: false,
        password: false,
        CFPassword: false,
        date: false
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {

    }, [])
    const nameHandle = TextInput => {
        setName(TextInput)
        setCheckNull({
            name: name != '' ? false : true,
            email: checkNull.email,
            phone: checkNull.phone,
            date: checkNull.date,
            password: checkNull.password,
            CFPassword: checkNull.CFPassword,
        })
    }
    const emailHandle = TextInput => {
        setEmail(TextInput)
        setCheckNull({
            name: checkNull.name,
            email: email != '' ? false : true,
            phone: checkNull.phone,
            date: checkNull.date,
            password: checkNull.password,
            CFPassword: checkNull.CFPassword,
        })
    }
    const phoneHandle = TextInput => {
        setPhone(TextInput)
        setCheckNull({
            name: checkNull.name,
            email: checkNull.email,
            phone: phone != '' ? false : true,
            date: checkNull.date,
            password: checkNull.password,
            CFPassword: checkNull.CFPassword,
        })
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios' ? !show : null);
        
        setDate(currentDate);
        setCheckdate(true)
        setCheckNull({
            name: checkNull.name,
            email: checkNull.email,
            phone: checkNull.phone,
            date: true,
            password: checkNull.password,
            CFPassword: checkNull.CFPassword,
        })
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const passwordHandle = TextInput => {
        setPassword(TextInput)
        setCheckNull({
            name: checkNull.name,
            email: checkNull.email,
            phone: checkNull.phone,
            date: checkNull.date,
            password: password != '' ? false : true,
            CFPassword: checkNull.CFPassword,
        })
    }
    const confirmPasswordHandle = TextInput => {
        setCFPassword(TextInput)
        setCheckNull({
            name: checkNull.name,
            email: checkNull.email,
            phone: checkNull.phone,
            date: checkNull.date,
            password: checkNull.password,
            CFPassword: CFPassword != '' ? false : true,
        })
        if (password !== TextInput) {
            console.log('not match')
            setConfirmPassword(false)
        } else {
            console.log('match')
            setConfirmPassword(true)
        }
    }
    const sendRegister = async () => {

        // if (name != '' && email != '' && phone != '' && checkdate != false && password != null && CFPassword != null && confirmPassword != false) {

        try {
            setLoading(true)
            await dispatch(authenActions.register(name, email, phone, moment(date).format('YYYY-MM-DD'), password, CFPassword))
            Alert.alert('แจ้งเตือน', 'สมัครสมาชิกสำเร็จ', [
                { text: "ตกลง", onPress: () => navigation.navigate('CompleteScreen', { title: 'ลงทะเบียน' }) }
            ])
            setLoading(false)

        } catch (e) {

            Alert.alert('แจ้งเตือน', e.message)
            setLoading(false)
        }
        // } else {
        //     setCheckNull({
        //         name: name != '' ? false : true,
        //         email: email != '' ? false : true,
        //         phone: phone != '' ? false : true,
        //         date: checkdate != false ? false : true,
        //         password: password != null ? false : true,
        //         CFPassword: CFPassword != null ? false : true,
        //     })
        //      console.log('someting wrong!',name,email,phone,date,password,CFPassword)
        // }

    }
    // console.log(checkNull, show,date)
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, }}>
            <Header
                title="ลงทะเบียน"
                onPress={() => navigation.pop()}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[{ flex: 1 }]}
            >
                <View style={{ marginTop: hp(20), flex: 1, marginHorizontal: wp(24) }}>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={[fontStyles.Medium18, { color: colors.white }]}>ชื่อ - นามสกุล</Text>
                            <Input
                                id="full_name"
                                onChangeText={nameHandle}
                                keyboardType='default'
                                inputStyle={[fontStyles.Regular18, styles.registerInputStyle]}
                                inputContainerStyle={styles.registerInputContainer}
                                containerStyle={[{ paddingHorizontal: 0, paddingVertical: 8 }]}
                                placeholder={'ชื่อ - นามสกุล'}
                                placeholderTextColor={'#5a5f83'}
                                autoCorrect={false}
                                errorMessage={
                                    checkNull.name === true ?
                                        'กรุณาระบุชื่อผู้ใช้'
                                        : null
                                }
                                errorStyle={
                                    [fontStyles.Light14, { color: colors.red }]
                                }
                            />
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
                                    checkNull.email === true ?
                                        'กรุณาระบุอีเมล์'
                                        : null
                                }
                                errorStyle={
                                    [fontStyles.Light14, { color: colors.red }]
                                }
                            />
                            <Text style={[fontStyles.Medium18, { color: colors.white }]}>เบอร์โทรศัพท์มือถือ</Text>
                            <Input
                                id="phone"
                                onChangeText={phoneHandle}
                                keyboardType='numeric'
                                inputStyle={[fontStyles.Regular18, styles.registerInputStyle]}
                                inputContainerStyle={styles.registerInputContainer}
                                containerStyle={[{ paddingHorizontal: 0, paddingVertical: 8 }]}
                                placeholder={'เบอร์โทรศัพท์มือถือ'}
                                placeholderTextColor={'#5a5f83'}
                                maxLength={10}
                                errorMessage={
                                    checkNull.phone === true ?
                                        'กรุณาระบุเบอร์โทรศัพท์'
                                        : null
                                }
                                errorStyle={
                                    [fontStyles.Light14, { color: colors.red }]
                                }
                            />
                            <Text style={[fontStyles.Medium18, { color: colors.white, marginBottom: hp(15) }]}>วันเดือนปีเกิด</Text>

                            <View style={{ marginBottom: hp(10) }}>
                                <TouchableWithoutFeedback onPress={showDatepicker}>
                                    <View pointerEvents="none">
                                        <Input
                                            placeholder='กรุณาใส่วันเดือนปีเกิดของคุณ'
                                            
                                            labelStyle={[fontStyles.Medium18, { color: '#5a5f83', fontWeight: 'normal' }]}
                                            inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                                            inputContainerStyle={[styles.registerInputContainer, { alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: wp(20) }]}
                                            containerStyle={{ paddingHorizontal: 0 }}
                                            value={date != null ? moment(date).format('DD-MMM-YYYY') : null}
                                        /></View>
                                </TouchableWithoutFeedback>


                            </View>


                            <Text style={[fontStyles.Medium18, { color: colors.white }]}>รหัสผ่าน</Text>
                            <Input
                                id="password"
                                onChangeText={passwordHandle}
                                inputStyle={[fontStyles.Regular18, styles.registerInputStyle]}
                                inputContainerStyle={styles.registerInputContainer}
                                containerStyle={[{ paddingHorizontal: 0, paddingVertical: 8 }]}
                                placeholder={'รหัสผ่าน'}
                                placeholderTextColor={'#5a5f83'}
                                secureTextEntry={true}
                                errorMessage={
                                    checkNull.password === true ?
                                        'กรุณาระบุรหัสผ่าน'
                                        : null
                                }
                                errorStyle={
                                    [fontStyles.Light14, { color: colors.red }]
                                }
                            />
                            <Text style={[fontStyles.Medium18, { color: colors.white }]}>ยืนยันรหัสผ่าน</Text>
                            <Input
                                id="confirmPassword"
                                onChangeText={confirmPasswordHandle}
                                inputStyle={[fontStyles.Regular18, styles.registerInputStyle]}
                                inputContainerStyle={styles.registerInputContainer}
                                containerStyle={[{ paddingHorizontal: 0, paddingVertical: 8 }]}
                                placeholder={'ยืนยันรหัสผ่าน'}
                                placeholderTextColor={'#5a5f83'}
                                secureTextEntry={true}
                                renderErrorMessage={false}
                                errorMessage={
                                    checkNull.CFPassword == false ?
                                        CFPassword != null ? confirmPassword !== true ?
                                            'รหัสผ่านไม่ตรงกัน'
                                            :
                                            'รหัสผ่านตรงกัน'
                                            : null
                                        : 'กรุณายืนยันรหัสผ่าน'
                                }
                                errorStyle={
                                    confirmPassword !== true ? [fontStyles.Light14, { color: colors.red }] : [fontStyles.Light14, { color: colors.success }]
                                }
                            />
                            <View style={[{ marginVertical: hp(8), }]}>
                                <TouchableOpacity onPress={() => navigation.navigate('privacy')}>
                                    <Text style={[fontStyles.Regular16, { color: colors.white }]}>
                                        เมื่อคลิกชำระเงินแสดงว่าคุณยินยอมตาม <Text style={[{ color: colors.blue, textDecorationLine: 'underline' }]}>ข้อกำหนดและนโยบายเงื่อนไข</Text>  ของเราแล้ว
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginVertical: hp(30) }}>
                                <Button
                                    title={loading == false ? 'ลงทะเบียน' : <ActivityIndicator color={colors.darkGreyBlue1} />}
                                    disabled={loading == false ? false : true}
                                    onPress={sendRegister}
                                    titleStyle={fontStyles.Regular18}
                                    containerStyle={styles.registerBtn}
                                    buttonStyle={{ backgroundColor: colors.blue, height: 52 }}

                                />
                            </View>

                        </ScrollView>

                    </View>

                </View>
                {show && (
                    <View style={{ marginBottom: hp(20),backgroundColor:'#d7d6dc' }}>
                        <DateTimePicker
                            placeholderText='กรุณาใส่วันเดือนปีเกิดของคุณ'
                            value={date != null ? date : new Date()}
                            mode={mode}
                            display={Platform.OS === 'android' ? "default" : 'spinner'}
                            locale="th"
                            onChange={onChange}

                        />
                    </View>
                )}
            </KeyboardAvoidingView>

        </SafeAreaView>

    )
}

export default registerScreen