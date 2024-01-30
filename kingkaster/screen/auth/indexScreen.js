import React, { useEffect, useRef, useState } from 'react'

import { SafeAreaView, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from '../../styles/styles';
import Svg, {
    Circle,
} from 'react-native-svg';
import colors from '../../styles/colors';
import { hp, wp } from '../../function/screen';
import { Modalize } from 'react-native-modalize';
import normalize from '../../function/normalize';
import { Image, Button, Input } from 'react-native-elements';
import fontStyles from '../../styles/fontStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as authenActions from '../../store/actions/auth'
import { useDispatch } from 'react-redux';
import { IconApp } from '../../components';
const indexScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [userValue, setuserValue] = useState(null)
    const [password, setPassword] = useState(null)
    const [userNull, setUserNull] = useState(false)
    const [passwordNull, setPasswordNull] = useState(false)
    const [loading, setLoading] = useState(false)
    const modalizeRef = useRef(null);
    useEffect(()=>{
        return () => {
            setLoading(false)
        }
    },[dispatch])
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const userInputHandler = inputText => {
        setuserValue(inputText);
        if (userNull == true) {
            setUserNull(false)
        }
    };
    const passwordInputHandler = inputText => {
        setPassword(inputText);
        if (passwordNull == true) {
            setPasswordNull(false)
        }
    };
    const onSingIn = async () => {
        if (userValue == null || userValue == '') {
            setUserNull(true)
        } if (password == null || password == '') {
            setPasswordNull(true)
        } else if ((userValue != null || userValue != '') && (password != null || password != '')) {
            try {
                setLoading(true)
                await dispatch(authenActions.login(userValue, password))
                
                modalizeRef.current?.close();
            } catch (e) {
                Alert.alert('แจ้งเตือน', e.message)
                setLoading(false)
            }
            // navigation.navigate('HomeTab')
            // Alert.alert('alert', 'pass this process')
        }
    }
    return (
        <SafeAreaView style={[styles.screen, { backgroundColor: colors.darkGreyBlue1 }]}>
            <View style={[{ flex: 1, position: 'absolute' }]}>
                <Svg height={hp(655)} width={wp(655)} viewBox="0 0 100 100" >
                    <Circle
                        cx={wp(5)}
                        cy={hp(40)}
                        r={45}
                        fill={colors.background}
                    />
                    <View style={[{ marginHorizontal: wp(25), marginTop: hp(74), paddingRight: wp(64.28) }]}>
                        <Image source={require('../../assets/icon/logologin.png')} style={[{ width: wp(205), height: hp(50) }]} />
                        <View style={[{ width: wp(276) }]}>
                            <Text style={[fontStyles.Medium38, { color: '#FFF', marginBottom: hp(23) }]}>
                                Createyour
                                Account in 3 minutes
                            </Text>
                            <Text style={[fontStyles.Medium28, { color: '#b4b4b4' }]}>
                                Easy
                            </Text>
                            <Text style={[fontStyles.Medium28, { color: '#b4b4b4' }]}>
                                Fast
                            </Text>
                            <Text style={[fontStyles.Medium28, { color: '#b4b4b4' }]}>
                                Secure
                            </Text>

                        </View>
                    </View>
                </Svg>
                <Svg height={wp(555)} width={wp(555)} viewBox="5 5 80 80" style={[{ top: -hp(220) }]}>
                    <Circle
                        cx={40}
                        cy={55}
                        r={44.2}
                        stroke='#ffd600'
                        strokeWidth="0.2"
                    />
                </Svg>

            </View>
            <View style={[{ marginTop: hp(17), alignItems: 'flex-end', marginRight: wp(22) }]}>
                <IconApp name='language' width={wp(37)} height={wp(37)} />
            </View>
            <View style={[{ flex: 1, justifyContent: 'flex-end', paddingVertical: hp(33), paddingHorizontal: wp(25) }]}>
                <Button
                    title="ลงทะเบียนใหม่"
                    titleStyle={[fontStyles.Regular18, { color: '#00073b' }]}
                    buttonStyle={[{ backgroundColor: colors.white, paddingVertical: hp(17), }]}
                    containerStyle={[{ borderRadius: normalize(12), marginBottom: normalize(26) }]}
                    onPress={() => navigation.navigate('RegisterScreen')}
                />
                <Text onPress={onOpen} style={[fontStyles.Medium18, { color: '#FFF', alignSelf: 'center' }]}>
                    เข้าสู่ระบบ
                </Text>
            </View>
            <Modalize
                ref={modalizeRef}
                modalStyle={{ backgroundColor: '#F8F8F8', borderTopColor: '#E5E5E5', borderTopWidth: 1.5, borderTopLeftRadius: 42, borderTopRightRadius: 42 }}
                childrenStyle={{ paddingHorizontal: wp(26), marginTop: hp(53) }}
                closeOnOverlayTap={true} snapPoint={hp(540)}
                withOverlay={false} modalHeight={hp(540)}
                handleStyle={{ backgroundColor: '#FFF', width: '13%' }}
                scrollViewProps={{showsVerticalScrollIndicator:false}}
            >
                <View style={{ flex:1,marginBottom:hp(50)}}>
                    <View >
                        <Text style={[fontStyles.Medium18, { color: '#989898' }]}>
                            อีเมล์หรือเบอร์โทรศัพท์
                        </Text>
                        <Input
                            id="idCard"
                            allowFontScaling={false}
                            autoCapitalize='none'
                            renderErrorMessage={userNull}
                            errorMessage={userNull != false ? 'Please Enter value for the field!' : null}
                            inputStyle={fontStyles.Regular16}
                            labelStyle={{ color: '#5a5f83' }}
                            placeholderTextColor='#5a5f83'
                            inputContainerStyle={{ backgroundColor: '#e3e3e3', borderWidth: 1, borderColor: '#989898', borderRadius: 6, paddingLeft: 19, paddingHorizontal: 15 }}
                            containerStyle={[{ paddingHorizontal: 0, paddingVertical: 5, paddingBottom: 0 }]}
                            placeholder='Email or Phone Number'
                            onChangeText={userInputHandler}
                            value={userValue}
                        />
                    </View>
                    <View >
                        <Text style={[fontStyles.Medium18, { color: '#989898' }]}>
                            รหัสผ่าน
                        </Text>
                        <Input
                            id="Password"
                            
                            renderErrorMessage={passwordNull}
                            errorMessage={passwordNull != false ? 'Please Enter value for the field!' : null}
                            secureTextEntry={true}
                            inputStyle={fontStyles.Regular16}
                            labelStyle={{ color: '#5a5f83' }}
                            placeholderTextColor='#5a5f83'
                            inputContainerStyle={{ backgroundColor: '#e3e3e3', borderWidth: 1, borderColor: '#989898', borderRadius: 6, paddingLeft: 19, paddingHorizontal: 15, paddingBottom: 0 }}
                            containerStyle={[{ paddingHorizontal: 0, paddingVertical: 5, paddingBottom: 0, marginBottom: 0 }]}
                            placeholder='Password'
                            onChangeText={passwordInputHandler}
                            value={password}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgetScreen')}>
                            <Text style={[fontStyles.Regular16, { color: colors.blue, alignSelf: 'flex-end', }]}>
                                ลืมรหัสผ่าน?
                            </Text>
                        </TouchableOpacity>

                      
                        <Button
                            disabled={loading == false ? false : true}
                            title={ loading == false ? "เข้าสู่ระบบ" : <ActivityIndicator color={colors.darkGreyBlue1} />}
                            onPress={onSingIn}
                            // onPress={()=> navigation.navigate('HomeTab')}
                            titleStyle={[fontStyles.Regular18, { color: '#FFF' }]}
                            buttonStyle={[{ backgroundColor: colors.blue, paddingVertical: normalize(18), paddingHorizontal: normalize(90) }]}
                            containerStyle={[{ borderRadius: normalize(12), marginTop: 14 }]}
                        />
                          <Text style={[fontStyles.Regular18, { color: '#2c315d', alignSelf: 'center', marginTop: 10 }]}>
                            ยังไม่เป็นสมาชิกใช่หรือไม่ ? <Text style={[{textDecorationLine:'underline'}]}>ลงทะเบียน</Text>
                        </Text>
                        <Button
                            title=" Log In with Facebook"
                            titleStyle={[fontStyles.Regular18, { color: colors.blue }]}
                            buttonStyle={[{ backgroundColor: '#FFF', borderRadius: normalize(12),paddingVertical: normalize(18) }]}
                            containerStyle={[{  marginTop: 17, borderWidth: 1, borderColor: colors.blue }]}
                            icon={<Icon name='facebook-square' size={normalize(18)} color={colors.blue} />}
                        />
                    </View>
                </View>
            </Modalize>
        </SafeAreaView>
    )
}
export default indexScreen