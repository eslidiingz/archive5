import React from 'react';
import {  SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image,Button } from 'react-native-elements';
import { Header, IconApp } from '../../components';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';

const successBookingScreen = ({ navigation, route }) => {
    const { title, colorHeader } = route.params
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header title={title} backgroundStyle={{ backgroundColor: colorHeader, zIndex: 1 }} leftShow={false} />
            <View style={[styles.container, pageStyle.mainBox]}>
                <IconApp name="success" width={wp(40)} height={hp(36)} />
                <View style={[pageStyle.textBox]}>
                    <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                        สำเร็จ
                    </Text>
                    <Text style={[fontStyles.Regular15, { color: colors.white }]}>
                        คุณจองห้อง{title}สำเร็จแล้ว
                        
                    </Text>
                    <Text style={[fontStyles.Regular15, { color: colors.white }]}>
                    กรุณาตรวจสอบอีเมลของคุณ
                    </Text>
                </View>
                <View style={[pageStyle.qrBox]}>
                    <Image source={require('../../assets/img/qrcode.png')} style={[pageStyle.qr]} />
                </View>
                <View style={[pageStyle.bottomBox,]}>
                    <TouchableOpacity onPress={()=> {}} style={pageStyle.buttonBox}>
                    <Image source={require('../../assets/icon/save.png')} style={[{width:hp(30),height:hp(30)}]} placeholderStyle={{backgroundColor:null}}/>
                    <Text style={[fontStyles.Medium18,{color:colors.white}]}>
                        บันทึก
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {}} style={pageStyle.buttonBox}>
                    <Image source={require('../../assets/icon/share.png')}style={[{width:hp(30),height:hp(30)}]} placeholderStyle={{backgroundColor:null}} />
                    <Text style={[fontStyles.Medium18,{color:colors.white}]}>
                        แบ่งปัน
                    </Text>
                    </TouchableOpacity>
                    
                </View>
                <Button  
                onPress={()=> navigation.navigate('MainTab')}
                title='กลับสู่หน้าหลัก'
                    containerStyle={{width:'100%',height:hp(55)}}
                    buttonStyle={{backgroundColor:colors.blue,borderRadius:8}}
                    titleStyle={[fontStyles.Medium18]}
                />
            </View>
        
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    mainBox: {
        marginTop: hp(50),
        alignItems: 'center'
    },
    textBox:{
        alignItems:'center',
        marginBottom:hp(20)
    },
    qrBox:{
        marginBottom:hp(60)
    },
    qr:{
        width:hp(260),
        height:hp(265)
    },
    bottomBox:{
        width:'100%',
        paddingHorizontal:wp(55),
        backgroundColor:colors.GreyBlue,
        borderRadius:6,
        alignItems:'center',
        paddingVertical:hp(20),
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:hp(20)
    },
    buttonBox:{
        width:wp(100),
  
        justifyContent:'center',
        alignItems:'center',
    }
})
export default successBookingScreen