import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ImageBackground, ScrollView, PixelRatio } from 'react-native'
import { Button, Image } from 'react-native-elements'
import fontStyles from '../../styles/fontStyles'
import moment from 'moment'
import { hp, widthPercent, wp } from '../../function/screen'
import Carousel from 'react-native-snap-carousel';
import colors from '../../styles/colors'
import styles from '../../styles/styles'
import Icon from 'react-native-vector-icons/Entypo'
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import normalize from '../../function/normalize'
import Header from '../header'
import IconApp from '../Icon'
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/core'
import { Modalize } from 'react-native-modalize'
import { LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux'
import { selectBooking } from '../../store/actions/booking'

LocaleConfig.locales['th'] = {
    monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคา', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
    monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
    dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    today: 'วันนี้'
};
LocaleConfig.defaultLocale = 'th';
interface BookingProps {
    title: string;
    type: string;
}
const Booking = ({ title, type }: BookingProps) => {
    const dispatch = useDispatch()
    const day = useSelector(state => state.booking.month)
    const colorHeader =
        type === 'Influ' ? colors.violet : null ||
            type === 'Steamer' ? colors.blue : null ||
                type === 'Arcade' ? colors.yellow : colors.white

    const navigation = useNavigation()
    const RoomPoint = [
        {
            row_id: 1,
            row: [
                {
                    id: 1,
                    room: 1,
                    uri: 'https://mip.co.th/App/room1.png',
                },
                {
                    id: 2,
                    room: 2,
                    uri: 'https://mip.co.th/App/room1.png'
                },
                {
                    id: 3,
                    room: 3,
                    uri: 'https://mip.co.th/App/room2.png'
                },
                {
                    id: 4,
                    room: 4,
                    uri: 'https://mip.co.th/App/room3.png'
                }
            ]
        },

    ]
    const bookingTime = [
        {
            time: '09:00',
            booking: [{
                room_id: 1,
                vacant: false,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]

        },
        {
            time: '10:00',
            booking: [{
                room_id: 1,
                vacant: false,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
        {
            time: '11:00',
            booking: [{
                room_id: 1,
                vacant: true,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
        {
            time: '12:00',
            booking: [{
                room_id: 1,
                vacant: false,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
        {
            time: '13:00',
            booking: [{
                room_id: 1,
                vacant: true,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
        {
            time: '14:00',
            booking: [{
                room_id: 1,
                vacant: false,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
        {
            time: '15:00',
            booking: [{
                room_id: 1,
                vacant: true,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
        {
            time: '16:00',
            booking: [{
                room_id: 1,
                vacant: false,
            }, {
                room_id: 2,
                vacant: true,
            }, {
                room_id: 3,
                vacant: false,
            }, {
                room_id: 4,
                vacant: true,
            }]
        },
    ]

    const [month, setMonth] = useState(moment().format('YYYY-MM-DD'))
    const [newday, setNewDay] = useState([])
    const [imageSize, setImageSize] = useState([])
    const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'))
    const [onchange, setOnChange] = useState(day.indexOf(month))
    const [selectRoom, setSelectRoom] = useState(null)
    const [loading, setLoading] = useState(false)

    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    useEffect(() => {
        showNewDay()
        getImageSize()
        return () => {
            setNewDay([])
            setImageSize([])
        }
    }, [month])
    const getImageSize = async () => {
        for (const key in RoomPoint) {
            for (const subkey in RoomPoint[key].row) {
                Image.getSize(RoomPoint[key].row[subkey].uri, async (width, height) => setImageSize(imageSize => [...imageSize, { room_id: RoomPoint[key].row[subkey].id, width: width, height: height }]), (err) => Alert.alert('แจ้งเตือน', 'ไม่สามารถเรียกรูปได้'))
            }
        }
    }

    const showNewDay = async () => {
        try {
            if (month != null) {
                for (var i = 1; i <= moment(moment(month).format('YYYY-MM')).daysInMonth(); i++) {
                    let firstday = moment(moment(month).startOf('month')).format('YYYY-MM-DD')
                    let dayToAdd = moment([moment(month).format('YYYY'), 0, i]).month(parseInt(moment(month).format('M')) - 1).format("YYYY-MM-DD")
                    setNewDay(newday => [...newday, dayToAdd])
                }
            }
        } catch (err) {
            Alert.alert('แจ้งเตือน', err.message)
        }
    }
    const showNewDay2 = async () => {

        try {
            setLoading(true)
            if (selected != null) {

                let numYear = moment(selected).format('YYYY')
                let numMonth = moment(selected).format('MM')

                if (moment(month).format('MM') !== moment(selected).format('MM')) {
                    setNewDay([])
                    let newDayInmonth = []
                    for (var i = 1; i <= moment(moment(selected).format('YYYY-MM')).daysInMonth(); i++) {
                        let firstday = moment(moment(selected).startOf('month')).format('YYYY-MM-DD')
                        let dayToAdd = moment([moment(selected).format('YYYY'), 0, i]).month(parseInt(moment(selected).format('M')) - 1).format("YYYY-MM-DD")
                        await newDayInmonth.push(dayToAdd)
                    }
                    setOnChange(newDayInmonth.indexOf(selected))
                    setNewDay(newDayInmonth)
                    setMonth(moment([parseInt(numYear), parseInt(numMonth) - 1]).format('YYYY-MM-DD'))



                } else {
                    setOnChange(newday.indexOf(selected))
                }
                // let numDay = moment(selected).format('DD')
                // setOnChange(parseInt(numDay-1))
                modalizeRef.current?.close()
            }
            setLoading(false)
        } catch (err) {
            Alert.alert('แจ้งเตือน', err.message)
        }
    }

    const selectMonth = (onPresss: string) => {
        let numYear = moment(month).format('YYYY')
        let numMonth = parseInt(moment(month).format('M')) - 1

        if (onPresss == 'Previous') {
            if (numMonth === 0) {
                setSelected(moment([parseInt(numYear) - 1, 11]).format('YYYY-MM-DD'))
                setMonth(moment([parseInt(numYear) - 1, 11]).format('YYYY-MM-DD'))
                setOnChange(0)
            } else {
                setSelected(moment([moment(month).format('YYYY'), (parseInt(moment(month).format('M')) - 1) - 1]).format('YYYY-MM-DD'))
                setMonth(moment([moment(month).format('YYYY'), (parseInt(moment(month).format('M')) - 1) - 1]).format('YYYY-MM-DD'))
                setOnChange(0)
            }
        } else {
            if (numMonth === 11) {
                setSelected(moment([parseInt(numYear) + 1, 0]).format('YYYY-MM-DD'))
                setMonth(moment([parseInt(numYear) + 1, 0]).format('YYYY-MM-DD'))
                setOnChange(0)
            } else {
                setSelected(moment([moment(month).format('YYYY'), (parseInt(moment(month).format('M')) - 1) + 1]).format('YYYY-MM-DD'))
                setMonth(moment([moment(month).format('YYYY'), (parseInt(moment(month).format('M')) - 1) + 1]).format('YYYY-MM-DD'))
                setOnChange(0)
            }
        }
    }

  

    const SelectTimeComponent = () => {
        const [selectTime, setSelectTime] = useState([])
        const [thisSelect, setThisSelect] = useState(null)

        useEffect(() => {

        }, [onchange])
        const chooseDay = newday.find((state, index) => index == onchange)

        const renderItemTime = (object: { item: { time: React.ReactNode } }) => {
            const filterRoom = selectRoom != null ? object.item.booking.find(state => state.room_id == selectRoom.split('&')[1]) : null
            return (
                <View style={[{ alignItems: 'center' }]} >
                    <Text style={[fontStyles.Regular14, { marginBottom: normalize(5), color: colors.gray }]}>
                        {
                            object.item.time
                        }
                    </Text>
                    {
                        filterRoom != null ?
                            filterRoom.vacant == true ?
                                <TouchableOpacity onPress={() => {
                                    const pickduplicate = selectTime.find(state => state == object.item.time)
                                    if (pickduplicate == undefined) {
                                        setSelectTime(selectTime => [...selectTime, object.item.time])
                                    } else {
                                        const deletePick = selectTime.filter(state => state !== object.item.time)
                                        setSelectTime(deletePick)
                                    }

                                }
                                }
                                    style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(50), width: wp(50), borderRadius: 8 }, selectTime.find(state => state == object.item.time) ? { backgroundColor: colors.blue } : { backgroundColor: '#FFF' }]}
                                >
                                    {
                                        selectTime.find(state => state == object.item.time) ?
                                            <Icon3 name='check-circle' size={normalize(32)} color={'#FFF'} />
                                            :
                                            null
                                    }
                                </TouchableOpacity>
                                :
                                <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.busy, height: hp(50), width: wp(50), borderRadius: 8 }]} />
                            :
                            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.busy, height: hp(50), width: wp(50), borderRadius: 8 }]} />
                    }

                </View>
            )
        }
        return (
            <View>
                <View style={[{ paddingHorizontal: wp(25) }]}>
                    <Text style={[fontStyles.Medium18, { color: colors.yellow }]}>
                        ตารางเวลา
                </Text>
                    <View style={[{ marginBottom: normalize(10) }]}>
                        <Carousel
                            slideStyle={[{ alignItems: 'center', height: wp(75), zIndex: 1 }]}
                            data={bookingTime}
                            activeSlideAlignment={'start'}
                            renderItem={renderItemTime}
                            sliderWidth={widthPercent(1)}
                            itemWidth={wp(60)}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                        />
                    </View>
                </View>
                <View style={[pageStyle.containerFooter]}>
                    <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                        <Text style={[fontStyles.Medium16, { color: colors.dark, flex: 1 }]}>
                            ทั้งหมด : {selectTime != false ? <Text style={[{ color: colors.success }]}> {selectTime.length}  ชั่วโมง</Text> : null}
                        </Text>
                        <Button onPress={async () => {
                            try {
                                await dispatch(selectBooking(selected, selectRoom, selectTime))
                                navigation.navigate('BookingDetailScreen', { title: title, colorHeader: colorHeader, type: type })
                            } catch (e) {
                                console.log(e.message)
                            }

                        }
                        } title='จอง' containerStyle={[{ alignItems: 'stretch', flex: 1, flexGrow: 0.8 }]} buttonStyle={[{ backgroundColor: colors.blue, borderRadius: 8 }]} titleStyle={[fontStyles.Medium18]} />
                    </View>
                </View>
            </View>
        )
    }
    const ComponentCalendar = () => {
        useEffect(() => {

        }, [selected])
        return (
            <View style={[{ backgroundColor: colors.white, height: hp(550), paddingHorizontal: wp(15), borderRadius: 15 }]}>
                <Calendar
                    current={selected}
                    onDayPress={(day) => { setSelected(day.dateString) }}
                    markingType={'custom'}
                    markedDates={{
                        [selected]: {
                            customStyles: {
                                container: {
                                    backgroundColor: colors.blue,
                                },
                                text: {
                                    color: colors.white
                                }
                            }
                        }
                    }}

                    theme={{
                        'stylesheet.calendar.main': {
                            week: {
                                marginVertical: 0,
                                flexDirection: 'row',
                                justifyContent: 'space-around',

                            },
                            // container: {
                            //     width: wp(380),
                            //     height: wp(50),
                            // },
                        },
                        'stylesheet.calendar.header': {
                            week: {
                                marginTop: -hp(5),
                                flexDirection: 'row',
                                justifyContent: 'space-around',

                            },
                        },
                        textDayFontFamily: 'Kanit-Regular',
                        textMonthFontFamily: 'Kanit-Regular',
                        textDayHeaderFontFamily: 'Kanit-Regular',
                        textMonthFontSize: PixelRatio.roundToNearestPixel(15),
                        textDayFontSize: PixelRatio.roundToNearestPixel(13),
                    }}
                />
                <Button title='เลือก' onPress={showNewDay2} titleStyle={[fontStyles.Medium18, { color: colors.white, justifyContent: 'flex-end' }]} buttonStyle={[{ backgroundColor: colors.blue }]} />
            </View>
        )
    }
    const renderItemDate = (object: { index: number | null; item: moment.MomentInput }) => {
        // console.log( onchange == object.index)
        return (
            <View >
                <View >
                    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={[fontStyles.Regular14, onchange == object.index ? { marginBottom: normalize(5), color: '#FFF' } : { marginBottom: normalize(5), color: colors.dark }]}>
                            {
                                moment(object.item).format('dd')
                            }
                        </Text>
                        <Text style={[fontStyles.Regular14, onchange == object.index ? { marginBottom: normalize(5), color: '#FFF' } : { marginBottom: normalize(5),color: colors.dark }]}>
                            {
                                moment(object.item).format('DD')
                            }
                        </Text>
                    </View>
                </View>

            </View>
        )
    }
    return (
        <View style={[{ flex: 1 }]}>
            <Header
                title={title}
                onPress={() => navigation.popToTop()}
                backgroundStyle={[{ backgroundColor: colorHeader, zIndex: 1 }]}
                rightShow={true}
                right={
                    <TouchableOpacity onPress={onOpen}>
                        <IconApp name='calendar' width={wp(25.4)} height={hp(25.4)} />
                    </TouchableOpacity>

                } />
            <View style={[pageStyle.containerSelectDate]}>
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <TouchableOpacity
                        onPress={() => selectMonth('Previous')}
                        style={[{ padding: 10, justifyContent: 'center', alignItems: 'center', flex: 1, flexGrow: 0.4 }]}
                    >
                        <Icon name='chevron-thin-left' size={normalize(18)} color={'#0c0d14'} />
                    </TouchableOpacity>
                    <View style={[{ flex: 1, alignItems: 'center' }]}>
                        <Text style={[fontStyles.Regular18, { color: colors.blue }]}> {moment(month).format('MMMM YYYY')} </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => selectMonth('Next')}
                        style={[{ padding: 10, justifyContent: 'center', alignItems: 'center', flex: 1, flexGrow: 0.4 }]}
                    >
                        <Icon name='chevron-thin-right' size={normalize(18)} color={'#0c0d14'} />
                    </TouchableOpacity>
                </View>
                <View style={[{ height: hp(90), position: 'relative', zIndex: 1, marginVertical: normalize(15) }]} >
                    {
                        newday != false ?
                            <Carousel
                                slideStyle={[{ alignItems: 'center', height: hp(90), zIndex: 1 }]}
                                data={newday}
                                renderItem={renderItemDate}
                                sliderWidth={wp(324)}
                                itemWidth={wp(60)}
                                firstItem={onchange}
                                inactiveSlideScale={1}
                                onSnapToItem={(i: React.SetStateAction<number | null>) => {
                                    setOnChange(i)
                                    setSelected(newday.find((state, index) => index === i))
                                    setSelectRoom(null)
                                }}
                            />
                            :
                            <ActivityIndicator color={colors.blue} />
                    }

                    <View style={{ position: 'absolute', backgroundColor: colors.blue, height: hp(90), alignSelf: 'center', zIndex: -1, width: wp(48), borderRadius: 42 }}>
                    </View>
                </View>
            </View>
            <View style={[styles.container, { marginVertical: normalize(10) }]}>
                <View style={[styles.flexRow]}>
                    <View style={[styles.flexRow,{flex:2}]}>
                        <View style={[styles.flexRow]}>
                            <Icon2 name='circle' size={normalize(16)} color='#FFF' />
                            <Text style={[fontStyles.Regular16, { color: '#FFF', marginLeft: normalize(5), marginRight: normalize(20) }]}>
                                ว่าง
                            </Text>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Icon2 name='circle' size={normalize(16)} color={colors.busy} />
                            <Text style={[fontStyles.Regular16, { color: '#FFF', marginLeft: normalize(5), marginRight: normalize(20) }]}>
                                ไม่ว่าง
                            </Text>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Icon2 name='circle' size={normalize(16)} color={colors.blue} />
                            <Text style={[fontStyles.Regular16, { color: '#FFF', marginLeft: normalize(5), marginRight: normalize(20) }]}>
                                เลือก
                            </Text>
                        </View>
                    </View>
                    <View style={[{alignSelf:'flex-end',flex:1,}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
                            <Text style={[fontStyles.Medium17, { color: colors.yellow,alignSelf:'flex-end'}]}>
                                ดูแผนที่
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.container, { flex: 1, zIndex: 0 }]}>
                <ScrollView>
                    <View style={[{ flex: 1, position: 'relative' }]}>
                        <View style={[{ position: 'absolute', flex: 1 }]}>
                            <Svg height={hp(327)} width={widthPercent(1)} style={[{ position: 'absolute', zIndex: 3 }]}>
                                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor="rgb(35,36,65)" stopOpacity="0" />
                                    <Stop offset="90%" stopColor="#131429" stopOpacity="1" />
                                </LinearGradient>
                                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                            </Svg>
                            <Image
                                source={{ uri: 'https://mip.co.th/App/bgInflu.png' }}
                                style={{ width: wp(372), height: hp(327),resizeMode:'cover' }}
                                PlaceholderContent={<ActivityIndicator size='small' color={colors.blue} />}
                                placeholderStyle={{ backgroundColor: null }}
                            />
                        </View>

                        <View style={[{ position: 'relative', zIndex: 10, flex: 1, paddingTop: 14,height:hp(327) }]}>

                            {
                                RoomPoint.map((item, IndexRow) => {

                                    return (
                                        <View key={IndexRow} style={[{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5 }]}>
                                            {
                                                item.row.map((subitem, IndexRoom) => {
                                                    const size = imageSize.find(state => state.room_id === subitem.id)

                                                    return (
                                                        <View key={IndexRoom} style={[{ position: 'relative' }]} >
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setSelectRoom(item.row_id + '&' + subitem.id)
                                                                }}
                                                                activeOpacity={0.8}
                                                            >
                                                                <ImageBackground
                                                                    PlaceholderContent={<ActivityIndicator size='small' color={colors.blue} />}
                                                                    placeholderStyle={{ backgroundColor: null }} source={{ uri: subitem.uri }}
                                                                    imageStyle={{ borderRadius: 3 }}
                                                                    style={[{ width: size != undefined ? wp(size.width) : null, height: size != undefined ? hp(size.height) : null }, selectRoom != null && (selectRoom.split('&')[0] == item.row_id && selectRoom.split('&')[1] == subitem.id) ? { borderColor: '#FFF', borderWidth: 1, borderRadius: 3 } : { borderRadius: 3 }]}

                                                                >
                                                                    <View style={[{ alignSelf: 'center', justifyContent: 'center', flex: 1 }]}>
                                                                        {
                                                                            selectRoom != null && (selectRoom.split('&')[0] == item.row_id && selectRoom.split('&')[1] == subitem.id) ? <Image source={require('../../assets/icon/selected.png')} style={[{ width: wp(32), height: wp(32) }]} placeholderStyle={[{ backgroundColor: null }]} /> : null
                                                                        }
                                                                    </View>

                                                                </ImageBackground>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
            <SelectTimeComponent />
            <Modalize
                ref={modalizeRef}
                modalStyle={{ backgroundColor: colors.blue, borderTopColor: colors.blue, borderTopWidth: 1.5, borderTopLeftRadius: 42, borderTopRightRadius: 42, marginBottom: -hp(45) }}
                childrenStyle={{ paddingHorizontal: wp(9), marginTop: hp(20), flex: 1 }}
                closeOnOverlayTap={true} snapPoint={hp(595)}
                withOverlay={false} modalHeight={hp(595)}
                handleStyle={{ backgroundColor: '#FFF', width: wp(51), height: hp(7) }}
                scrollViewProps={{ scrollEnabled: false }}
            >
                <View style={[{ flex: 1 }]}>
                    <Text style={[fontStyles.Regular18, { color: colors.white, alignSelf: 'center', marginBottom: hp(5) }]}>
                        เลือกวัน
                    </Text>
                    <ComponentCalendar />
                </View>
            </Modalize>

        </View>


    )
}
const pageStyle = StyleSheet.create({
    containerSelectDate: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: -hp(65),
        paddingTop: hp(69),
        borderBottomLeftRadius: 42,
        borderBottomRightRadius: 42
    },
    containerFooter: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        marginBottom: -hp(45),
        paddingBottom: hp(69),
        paddingTop: wp(20),
        paddingHorizontal: wp(20)
    }

})
export default Booking