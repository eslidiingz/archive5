import React from 'react';
import { PixelRatio, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header, IconApp } from '../../components';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';

const completeMarketScreen = ({ route, navigation }) => {
    const { title, type,from } = route.params

    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                title={title}
                leftShow={false}
            // containerStyle={{ height: hp(131), marginTop: -hp(50), backgroundColor: colors.darkGreyBlue2, borderBottomWidth: 0, paddingHorizontal: wp(20), borderBottomRightRadius: 42, borderBottomLeftRadius: 42 }}
            />
            <View style={[styles.container, { alignItems: 'center', marginTop: hp(45), flex: 1 }]}>
                <IconApp name='success' width={wp(40)} height={wp(36)} />
                <Text style={[fontStyles.Medium20, { color: colors.white, marginTop: hp(16) }]}>
                    สำเร็จ
                </Text>
                <Text style={[fontStyles.Regular15, { color: colors.white }]}>
                    {
                        type == 'edit' ? 'แก้ไขที่อยุ่เรียบร้อยแล้ว' : null ||
                            type == 'add' ? 'คุณเพิ่มที่อยู่เรียบร้อยแล้ว' : null ||
                            type == 'delete' ? 'ลบที่อยู่เรียบร้อยแล้ว' : null
                    }
                </Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: hp(30), marginHorizontal: wp(24) }}>
                <Button
                    title='ตกลง'
                    onPress={() => navigation.navigate('IndexAddress')}
                    titleStyle={fontStyles.Regular18}
                    containerStyle={styles.registerBtn}
                    buttonStyle={{ backgroundColor: colors.blue, height: 52 }}
                />
            </View>
        </SafeAreaView>
    )
}
export default completeMarketScreen