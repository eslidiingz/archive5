import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, Divider, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Header, IconApp } from '../../../components';
import normalize from '../../../function/normalize';
import { hp, wp } from '../../../function/screen';
import { pointUse } from '../../../store/actions/booking';
import colors from '../../../styles/colors';
import fontStyles from '../../../styles/fontStyles';
import styles from '../../../styles/styles';

const learningBookingDetailScreen = ({ route, navigation }) => {
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
    const date = useSelector(state => state.booking.date)
    const time = useSelector(state => state.booking.time)
    const room = useSelector(state => state.booking.room)
    const pointInKeep = useSelector(state => state.booking.point)
    const detailbook = useSelector(state => state.booking.detailbook)

    const { title, colorHeader, type } = route.params
    const { codeParam, discountParam } = route.params
    const [code] = useState(codeParam)
    const [checkcode, setCheckcode] = useState(null)

    const [codeMore, setcodeMore] = useState(false)
    const [point, setPoint] = useState(pointInKeep == 0 ? '' : (pointInKeep * 100).toString())
    const [oldpoint, setOldpoint] = useState(0)
    const [pointdiscount, setPointdiscount] = useState(0)
    const [pointMore, setpointMore] = useState(false)
    const [totaldiscount, setTotaldiscount] = useState(0)
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

    const checkCode = async () => {
        navigation.navigate('CouponScreen', { title: title, colorHeader: colorHeader,type:'learning' })
        const total = totalsummary - dummyCode[0].discount
        try {
            await dispatch(pointUse(pointdiscount / 100))
        } catch (e) {
            console.log(e.message)
        }
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


    // console.log(pointMore.ref)


    return (

        <SafeAreaView style={[styles.screen]}>
            <Header title={title} backgroundStyle={{ backgroundColor: colorHeader, zIndex: 1 }} onPress={() => {
                    Alert.alert('แจ้งเตือน', 'ต้องการยกเลิกการจองหรือไม่', [
                        {
                            text: "ยกเลิก",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "ดำเนินการ", onPress: () => navigation.popToTop() }
                    ])

                }} />
                <View style={[stylesPage.subHeader, styles.flexRow]}>
                    <Image
                        source={require('../../../assets/img/learning.png')}
                        style={{ width: wp(120), height: hp(90), borderRadius: 12 }}
                    />
                    <View style={[{ marginLeft: 15 }]}>
                        <Text style={[fontStyles.Medium20, { color: colors.dark }]}>
                            {detailbook.titleCourse}
                        </Text>
                        <View style={[styles.flexRow]}>
                            <Image
                                source={require('../../../assets/img/creator.png')}
                                style={{ width: wp(35), height: hp(35), borderRadius: 12 }}
                            />
                            <Text style={[fontStyles.Medium15, { color: colors.dark, marginLeft: 5 }]}>
                                {detailbook.cerator}
                            </Text>
                        </View>

                    </View>
                </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>    
                
                <View style={[{ backgroundColor: colors.darkGreyBlue1, marginTop: hp(10) }]}>
                    <View style={[styles.container, stylesPage.containerBox]}>
                        <Text style={[fontStyles.Medium18, { color: colors.white }]}>
                            คูปอง / ส่วนลดของฉัน
                    </Text>
                        <Input
                            placeholder='ใส่โค้ดส่วนลด'
                            value={codeParam}
                            defaultValue={codeParam != undefined ? codeParam : null}
                            containerStyle={{ height: hp(50), paddingTop: 0, marginTop: hp(11), marginBottom: hp(4) }}
                            inputContainerStyle={[{ height: hp(50), borderBottomWidth: 0, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopRightRadius: 8, paddingLeft: wp(15) }, codeParam != undefined ? { backgroundColor: colors.white } : { backgroundColor: colors.GreyBlue }]}
                            inputStyle={[fontStyles.Regular16, { color: colors.dark }]}
                            rightIconContainerStyle={{ height: '100%', paddingRight: 0, paddingBottom: 0, paddingTop: 0, padding: 0 }}
                            clearButtonMode='always'
                            disabled={true}
                            rightIcon={
                                <Button
                                    title='เลือกโค้ดส่วนลด'
                                    onPress={checkCode}
                                    containerStyle={{ marginTop: 0, marginBottom: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 8, borderTopRightRadius: 8, marginBottom: 0 }}
                                    buttonStyle={{ height: '100%', marginBottom: 0, backgroundColor: colors.blue, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    titleStyle={[fontStyles.Regular16]}
                                />
                            }

                            autoCorrect={false}
                            ref={input => { textInput = input }}
                            autoCapitalize='characters'
                      
                        />
                    </View>
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
                <View style={[{ marginVertical: hp(8), marginHorizontal: wp(23) }]}>
                    <Text style={[fontStyles.Regular16, { color: colors.white }]}>
                        เมื่อคลิกชำระเงินแสดงว่าคุณยินยอมตาม <Text style={[{ color: colors.blue, textDecorationLine: 'underline' }]}>ข้อกำหนดและนโยบายเงื่อนไข</Text>  ของเราแล้ว
                    </Text>
                </View>
                <Button
                    title="ชำระเงิน"
                    onPress={() => navigation.navigate('SuccessBooking', { title: title, colorHeader: colorHeader })}
                    containerStyle={{ borderRadius: 8, marginHorizontal: wp(23),marginBottom:hp(40) }}
                    buttonStyle={{ backgroundColor: colors.blue }}
                    titleStyle={[fontStyles.Regular18]}
                />
            </ScrollView>
        </SafeAreaView>

    )
}
const stylesPage = StyleSheet.create({
    subHeader: {
        width: '100%',
        height: hp(260),
        backgroundColor: colors.white,
        paddingHorizontal: wp(24),
        paddingTop: hp(148),
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
export default learningBookingDetailScreen