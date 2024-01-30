import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Button, Card, CheckBox } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/Entypo';
import { Header } from '../../components';
import normalize from '../../function/normalize';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';

const addressIndex = ({ navigation }) => {
    useEffect(() => {

    }, [])
    const dummyAddress = [
        {
            id: 1,
            name: 'สมหญิง รักดี',
            phone: '080 081 8292',
            address: '26 ซอยลาดปลาเค้า แขวงอนุสาวรีย เขตบางเขน กทม. 10220'
        },
        {
            id: 2,
            name: 'สมหญิง รักดี',
            phone: '080 081 8292',
            address: 'บางกระสอ อำเภอเมืองนนทบุรี นนทบุรี 11000'
        },

    ]
    const [checked, setChecked] = useState({ address_id: 1, checked: true })

    const renderItem = (itemData) => {

        return (
            <Card
                containerStyle={[
                    { borderRadius: 8, marginHorizontal: 0, borderColor: colors.borderInput },
                    checked.address_id === itemData.item.id ? { borderColor: colors.blue} : { borderColor: colors.borderInput}
                ]}
            >
                <TouchableOpacity onPress={() => { setChecked({ address_id: itemData.item.id, checked: true }) }} >
                    <View style={[styles.flexRow]}>
                        <View >
                            <CheckBox checked={checked.address_id === itemData.item.id ? true : false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' containerStyle={{ padding: 0, margin: 0 }} />
                        </View>
                        <View style={[{ flex: 1 }]}>
                            <View style={[styles.flexRow]}>
                                <Text style={[fontStyles.Medium16, { color: colors.dark, fontWeight: '500', marginRight: wp(15) }]}>
                                    ชื่อ - นามสกุล
                            </Text>
                                <Text style={[fontStyles.Regular16, { color: colors.dark, fontWeight: 'normal' }]}>
                                    {itemData.item.name}
                                </Text>
                            </View>
                            <View style={[styles.flexRow]}>
                                <Text style={[fontStyles.Medium16, { color: colors.dark, fontWeight: '500', marginRight: wp(15) }]}>
                                    เบอร์โทรศัพท์
                            </Text>
                                <Text style={[fontStyles.Regular16, { color: colors.dark, fontWeight: 'normal' }]}>
                                    {itemData.item.phone}
                                </Text>
                            </View>
                            <View style={[styles.flexRow, { alignItems: 'flex-start' }]}>
                                <Text style={[fontStyles.Medium16, { color: colors.dark, fontWeight: '500', marginRight: wp(15) }]}>
                                    ที่อยู่
                            </Text>
                                <Text style={[fontStyles.Regular16, { color: colors.dark, fontWeight: 'normal' }]}>
                                    {itemData.item.address}
                                </Text>
                            </View>
                        </View>
                        <View style={[{ alignSelf: 'flex-start' }]}>
                            <TouchableOpacity onPress={() => {  navigation.navigate('editAddress') }}>
                                <Text style={[fontStyles.Regular16, { color: colors.red, textDecorationLine: 'underline' }]}>
                                    แก้ไข
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                title={'ที่อยู่ในการจัดส่ง'}
                onPress={() => navigation.pop()}

            />

            <View style={[styles.container, { marginTop: hp(20),flex:1 }]}>
                <FlatList
                    data={dummyAddress}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                <View style={[{justifyContent:'flex-end',marginBottom:hp(15)}]}>
                    <Button
                        onPress={()=> { navigation.navigate('addAddress')}}
                        title='เพิ่มที่อยู่'
                        buttonStyle={[{backgroundColor:null,borderRadius: 8,borderWidth:1,borderColor:colors.white }]}
                        containerStyle={{marginBottom:hp(20)}}
                        titleStyle={[fontStyles.Medium18]}
                        icon={<Icon name="plus" color={colors.white} size={normalize(18)} />}
                    />
                    <Button
                        title='บันทึก'
                        onPress={()=> navigation.pop()}
                        buttonStyle={[{backgroundColor:colors.blue,borderRadius: 8,borderWidth:1,borderColor:colors.blue}]}
                        containerStyle={{marginBottom:hp(20)}}

                        titleStyle={[fontStyles.Medium18]}
                        
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({

})
export default addressIndex