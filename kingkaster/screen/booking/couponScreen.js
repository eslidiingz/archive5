import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { Button, Card, CheckBox } from 'react-native-elements'
import { Header } from '../../components'
import normalize from '../../function/normalize'
import colors from '../../styles/colors'
import fontStyles from '../../styles/fontStyles'
import styles from '../../styles/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { hp, wp } from '../../function/screen'

const couponScreen = ({ navigation, route }) => {
    const { title, colorHeader, type } = route.params
    const [select, setSelect] = useState(false)
    const [value, setvalue] = useState({})

    const dummyCode = [{
        id: 1,
        title: 'DAY100TH',
        discount: 100,
        status: {
            code: 1,
            string: 'พบ'
        }
    }, {
        id: 2,
        title: 'DAY40TH',
        discount: 40,
        status: {
            code: 1,
            string: 'พบ'
        }
    }]

    const renderItem = (itemData) => {
        return (
            <Card
                containerStyle={[{ backgroundColor: colors.darkGreyBlue2, borderRadius: 12, borderWidth: 0, padding: 0, marginHorizontal: 0 }]}
            >

                <View style={[styles.flexRow, { justifyContent: 'flex-start', paddingVertical: hp(15) }]}>
                    <CheckBox
                        onPress={() => {
                            if (select === false) {
                                setvalue({
                                    [itemData.item.id]: value[itemData.item.id] == true ? false : true,
                                    id: itemData.item.id
                                });
                            } else {

                                setvalue({
                                    [itemData.item.id]: value[itemData.item.id] == false ? true : false,
                                    id: 'undefined'
                                });
                            }
                        }}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={

                            value[itemData.item.id]
                        }
                    />
                    <View style={{ flex: 1, paddingRight: wp(28), height: hp(82) }}>
                        <View style={[styles.flexRow, { alignItems: 'stretch' }]}>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blue, flex: 1, flexGrow: 0.4, maxHeight: hp(82), height: hp(82), borderTopLeftRadius: 13, borderBottomLeftRadius: 13 }]}>
                                <Text style={[fontStyles.Medium17, { color: colors.white }]}>
                                    {itemData.item.title}
                                </Text>
                            </View>
                            <View style={[{ backgroundColor: colors.white, flex: 1, maxHeight: hp(82), height: hp(82), borderTopRightRadius: 13, borderBottomRightRadius: 13, paddingHorizontal: wp(10) }]}>
                                <View style={[styles.flexRow, { justifyContent: 'space-between', flex: 1 }]}>
                                    <Text style={[fontStyles.Medium22, { color: colors.dark }]}>
                                        {itemData.item.discount} KK
                                        </Text>
                                    <Button title='เงื่อนไข' containerStyle={{ padding: 0 }} buttonStyle={{ backgroundColor: '#989898', paddingVertical: 5, paddingHorizontal: 5 }} titleStyle={[fontStyles.Regular14, { color: colors.white }]} />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </Card>
        )
    }
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header title={'คูปอง / ส่วนลดของฉัน'} backgroundStyle={{ backgroundColor: colors.darkGreyBlue1, zIndex: 1 }} onPress={() => navigation.pop()} />
            <View style={[styles.container, { flex: 1 }]}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={dummyCode}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>

                <View>
                    <Button
                        onPress={() => {
                            const checkSelect = dummyCode.find(state => state.id == value.id && value[value.id] != false)

                            if (checkSelect != undefined) {
                                if (type === 'learning') {
                                    navigation.push('LearningBookingDetailScreen', { title: title, colorHeader: colorHeader, codeParam: checkSelect.title, discountParam: checkSelect.discount })
                                } else {
                                    navigation.push('BookingDetailScreen', { title: title, colorHeader: colorHeader, codeParam: checkSelect.title, discountParam: checkSelect.discount })
                                }

                            }

                        }}
                        title='ตกลง'
                        containerStyle={{ marginBottom: hp(20) }}
                        buttonStyle={[{ backgroundColor: colors.blue }]}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}
export default couponScreen