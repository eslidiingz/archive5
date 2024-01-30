import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, Divider, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Header, IconApp } from '../../../components';
import normalize from '../../../function/normalize';
import { hp, wp } from '../../../function/screen';
import { clearbookingArcade, pointUse } from '../../../store/actions/booking';
import colors from '../../../styles/colors';
import fontStyles from '../../../styles/fontStyles';
import styles from '../../../styles/styles';

const detailArcadeScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const dummyCode = [{
        title: 'DAY100TH',
        discount: 100,
        status: {
            code: 1,
            string: 'พบ'
        }
    }]
    const dummyCodeNotfound = [{
        status: {
            code: 0,
            string: 'ไม่พบโค้ดส่วนลด'
        }
    }]
    const dummyMyPoint = {
        totalpoint: 23303
    }
    const dummyPrice = {
        totalprice: 5000
    }
    const bookingdetail = useSelector(state => state.booking.bookingdetail)
    const pointInKeep = useSelector(state => state.booking.point)

    const { title, colorHeader, type } = route.params
    const { codeParam, discountParam } = route.params
    const [code] = useState(codeParam)

    const [point, setPoint] = useState(pointInKeep == 0 ? '' : (pointInKeep * 100).toString())

    const [pointdiscount, setPointdiscount] = useState(0)

    const [totalsummary,] = useState(dummyPrice.totalprice)

    const [codediscount, setcodediscount] = useState(discountParam != undefined ? discountParam > dummyPrice.totalprice ? dummyPrice.totalprice : discountParam : 0)
    const counterEl = useRef(null)



    useEffect(() => {
    }, [dispatch])

    const pointHandle = async (TextInput) => {
        if (TextInput === '') {
            setPoint('')
            setPointdiscount(0)
            await dispatch(pointUse(0))
        } else {

            setPointdiscount(TextInput)
            setPoint(TextInput)
        }
        // const total = totalsummary - TextInput
        // if (TextInput <= dummyMyPoint.totalpoint) {

        // } else if (TextInput === null) {
        //     setPoint('')
        //     setPointdiscount(0)
        // } else {
        //     Alert.alert('แจ้งเตือน', 'พอย์ตของคุณไม่เพียงพอ')
        //     setPoint('')
        //     setPointdiscount(0)
        // }

    }


    const CalculateDiscount = (props) => {
        const receiveAmount = props
        const prevAmount = usePrevious(receiveAmount);
        const [total, setTotal] = useState(0)

        useEffect(() => {

            if (prevAmount !== receiveAmount) {
                const totalpointdiscount = (receiveAmount / 100)

                // const total = totalsummary - dummyCode[0].discount
                if ((totalpointdiscount > totalsummary)) {
                    setPoint((totalsummary * 100).toString())
                    setPointdiscount((totalsummary * 100))
                    setTotal(totalsummary)

                } else if ((discountParam >= totalsummary)) {
                    setPoint('')
                    setPointdiscount(0)

                } else {
                    if (pointdiscount <= dummyMyPoint.totalpoint) {
                        setTotal(totalpointdiscount)

                    } else {
                        setPoint(dummyMyPoint.totalpoint.toString())
                        setPointdiscount(dummyMyPoint.totalpoint)
                        setTotal(dummyMyPoint.totalpoint / 100)
                    }
                }
            }
            return () => {
                setTotal(0)
            }
        }, [receiveAmount])

        return (
            <View>
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[fontStyles.Regular17, { color: colors.white }]}>
                        ส่วนลด
                    </Text>
                    <Text style={[fontStyles.Medium17, { color: colors.white }]}>
                        {codediscount + (total != 0 ? total : pointInKeep)} KK
                    </Text>
                </View>
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[fontStyles.Regular17, { color: colors.white }]}>
                        รวมราคาทั้งหมด
                    </Text>
                    <Text style={[fontStyles.Medium17, codediscount !== 0 || pointdiscount !== 0 ? { color: colors.success } : { color: colors.white }]}>
                        {totalsummary - (total != 0 ? total : pointInKeep) - codediscount} KK
                    </Text>
                </View>
            </View>
        )
    }

    function usePrevious(value) {
        const ref = useRef(null);
        useEffect(() => {

            ref.current = value;
        });
        return ref.current;
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.screen]}>
                <View style={{ flex: 1 }}>

                    <Header title={title} backgroundStyle={{ backgroundColor: colorHeader, zIndex: 1 }} fontColor={'#002c56'}  onPress={() => {
                        Alert.alert('แจ้งเตือน', 'ต้องการยกเลิกการจองหรือไม่', [
                            {
                                text: "ยกเลิก",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "ดำเนินการ", onPress: async() => { 
                                
                                navigation.popToTop() 
                                await dispatch(clearbookingArcade())
                            } 
                        }
                        ])

                    }} />
                    <View style={stylesPage.subHeader}>
                        <Text style={[stylesPage.inSubHeader, fontStyles.Medium18]}>
                            ทั้งหมด : <Text style={{ color: colors.success }}> {bookingdetail != null ? bookingdetail.detail[0].totalhour : null} ชั่วโมง</Text>
                        </Text>
                    </View>

                    <View style={[{ backgroundColor: colors.darkGreyBlue1, marginTop: hp(10) }]}>
                        <View style={[styles.container, stylesPage.containerBox]}>
                            <Text style={[fontStyles.Medium18, { color: colors.white }]}>
                                พ้อยต์คงเหลือ  <Image source={require('../../../assets/icon/point-icon.png')} style={{ width: normalize(18), height: normalize(18) }} /> <Text style={{ color: colors.yellow }}>{dummyMyPoint.totalpoint} Point</Text>
                            </Text>
                            <Input
                                placeholder='จำนวนพ้อยต์ที่ต้องการใช้'
                                onChangeText={pointHandle}
                                value={point}
                                containerStyle={{ height: hp(50), paddingTop: 0, marginTop: hp(11), marginBottom: hp(4) }}
                                inputContainerStyle={[{ height: hp(50), borderBottomWidth: 0, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopRightRadius: 8, paddingLeft: wp(15) }, point !== '' ? { backgroundColor: colors.white } : { backgroundColor: colors.GreyBlue }]}
                                inputStyle={[fontStyles.Regular16, { color: colors.dark }]}
                                rightIconContainerStyle={{ height: '100%', paddingRight: 0, paddingBottom: 0, paddingTop: 0, padding: 0 }}
                                autoCorrect={false}
                                ref={counterEl}
                                keyboardType='numeric'
                                autoCompleteType="cc-number"
                                clearButtonMode='unless-editing'
                            />
                        </View>
                    </View>
                    <View style={[{ backgroundColor: colors.darkGreyBlue1, marginTop: hp(10) }]}>
                        <View style={[styles.container, stylesPage.containerBox]}>
                            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                                <Text style={[fontStyles.Regular17, { color: colors.white }]}>
                                    ราคา
                            </Text>
                                <Text style={[fontStyles.Medium17, { color: colors.white }]}>
                                    {dummyPrice.totalprice} KK
                            </Text>
                            </View>
                            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                                <Text style={[fontStyles.Regular17, { color: colors.white }]}>
                                    ใช้พ้อยต์
                            </Text>
                                <Text style={[fontStyles.Medium17, { color: colors.white }]}>
                                    {point === '' ? 0 : point} Point
                            </Text>
                            </View>
                            {CalculateDiscount(pointdiscount, code)}

                        </View>
                    </View>
                    <View style={[{ backgroundColor: colors.darkGreyBlue1, marginTop: hp(10) }]}>
                        <View style={[styles.container, stylesPage.containerBox]}>
                            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                                <Text style={[fontStyles.Medium18, { color: colors.white }]}>
                                    วอเลต
                                <Text style={[fontStyles.Regular16, { color: colors.white }]}>
                                        {'  '}เงินคงเหลือ
                                </Text>
                                </Text>

                                <Text style={[fontStyles.Medium17, { color: colors.yellow }]}>
                                    550 KK
                            </Text>
                            </View>
                            <View style={[{ marginVertical: hp(15) }]}>
                                <Divider />
                            </View>
                            <View style={[styles.flexRow, { justifyContent: 'center' }]}>
                                <IconApp name="wallet" width={wp(25)} height={wp(25)} />
                                <Text style={[fontStyles.Regular15, { color: colors.white, marginLeft: 5 }]}>
                                    เติมเงิน
                            </Text>
                            </View>

                        </View>

                    </View>

                </View>
                <View style={{ justifyContent: 'flex-end', marginBottom: hp(35) }}>
                    <View style={[{ marginVertical: hp(8), marginHorizontal: wp(23) }]}>
                        <Text style={[fontStyles.Regular16, { color: colors.white }]}>
                            เมื่อคลิกชำระเงินแสดงว่าคุณยินยอมตาม <Text style={[{ color: colors.blue, textDecorationLine: 'underline' }]}>ข้อกำหนดและนโยบายเงื่อนไข</Text>  ของเราแล้ว
                        </Text>
                    </View>
                    <Button
                        title="ชำระเงิน"
                        onPress={() => {

                            navigation.push('arcadeBookingScreen', { status: true })

                        }}
                        containerStyle={{ borderRadius: 8, marginHorizontal: wp(23) }}
                        buttonStyle={{ backgroundColor: colors.blue }}
                        titleStyle={[fontStyles.Regular18]}
                    />
                </View>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
const stylesPage = StyleSheet.create({
    subHeader: {
        width: '100%',
        height: hp(194),
        backgroundColor: colors.white,
        paddingTop: hp(131),
        alignItems: 'center',
        marginTop: -hp(131),
        borderBottomRightRadius: 42,
        borderBottomLeftRadius: 42
    },
    inSubHeader: {
        marginVertical: hp(18),
    },
    containerBox: {
        marginTop: hp(8),
        marginBottom: hp(15)
    }
})
export default detailArcadeScreen