import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ImageBackground, ScrollView, PixelRatio, Modal, Linking } from 'react-native'
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
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import normalize from '../../function/normalize'
import Header from '../header'
import IconApp from '../Icon'
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/core'
import { Modalize } from 'react-native-modalize'
import { LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux'
import { selectBooking, bookingArcade } from '../../store/actions/booking'

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
const BookingArcade = ({ title, type }: BookingProps) => {
    const dispatch = useDispatch()
    const day = useSelector(state => state.booking.month)
    const bookingdetail = useSelector(state => state.booking.bookingdetail)

    const colorHeader =
        type === 'Influ' ? colors.violet : null ||
            type === 'Steamer' ? colors.blue : null ||
                type === 'Arcade' ? colors.yellow : null ||
                    type === 'Sleeping' ? colors.orange : colors.white ||
                        type === 'Broadcast' ? colors.red : colors.white

    const navigation = useNavigation()
    const route = useRoute()
    const { status } = route.params
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
    const [selectRoom, setSelectRoom] = useState(null)
    const [modalShow, setModalShow] = useState(status)


    const supportedURL = "https://google.com";

    const OpenURLButton = ({ url, title, containerStyle, buttonStyle, titleStyle }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Button
            onPress={handlePress}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            title={title}
            titleStyle={titleStyle}
        />
    };
    useEffect(() => {

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

    const SelectTimeComponent = () => {

        const [selectTime, setSelectTime] = useState([])

        useEffect(() => {

        }, [])


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
                                    const pickduplicate = selectTime.find(state => state.index == object.index)
                                    if (pickduplicate == undefined) {
                                        setSelectTime(selectTime => [...selectTime, { index: object.index, time: object.item.time }])

                                    } else {
                                        const deletePick = selectTime.filter(state => state.index !== object.index)

                                        setSelectTime(deletePick)
                                    }

                                }
                                }
                                    style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(50), width: wp(50), borderRadius: 8 }, selectTime.find(state => state.time == object.item.time) ? { backgroundColor: colors.blue } : { backgroundColor: '#FFF' }]}
                                >
                                    {
                                        selectTime.find(state => state.time == object.item.time) ?
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
                {
                    bookingdetail != null ?
                        null
                        :
                        <View style={[pageStyle.containerFooter]}>
                            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                                <Text style={[fontStyles.Medium16, { color: colors.dark, flex: 1 }]}>
                                    ทั้งหมด : {selectTime != false ? <Text style={[{ color: colors.success }]}> {selectTime.length}  ชั่วโมง</Text> : null}
                                </Text>
                                <Button onPress={async () => {
                                    try {
                                        await dispatch(bookingArcade(selectRoom, selectTime))
                                        navigation.navigate('ArcadeDetailScreen', { title: title, colorHeader: colorHeader })
                                    } catch (e) {
                                        console.log(e.message)
                                    }

                                }
                                } title='จอง' containerStyle={[{ alignItems: 'stretch', flex: 1, flexGrow: 0.8 }]} buttonStyle={[{ backgroundColor: colors.blue, borderRadius: 8 }]} titleStyle={[fontStyles.Medium18]} />
                            </View>
                        </View>
                }

            </View>
        )
    }

    return (
        <View style={[{ flex: 1 }]}>
            <Header
                title={title}
                onPress={() => navigation.popToTop()}
                backgroundStyle={[{ backgroundColor: colorHeader, zIndex: 1 }]}
                fontColor={type === 'Arcade' ? '#002c56' : null}
                rightShow={true}
                right={
                    type === 'Arcade' ?
                        <TouchableOpacity>
                            <Image source={require('../../assets/icon/scan.png')} style={{ width: wp(45), height: wp(35) }} placeholderStyle={{ backgroundColor: null }} />
                        </TouchableOpacity>
                        : null
                }
            />
            {
                type === 'Arcade' ?
                    <View style={[pageStyle.containerSelectDate]}>
                        <View style={[{ height: hp(90), position: 'relative', zIndex: 1, marginVertical: normalize(15) }]} >
                            <Text style={[fontStyles.Regular18, { alignSelf: 'flex-start', color: '#002c56' }]}>
                                การจองของคุณ
                            </Text>
                            <View style={{ flex: 1 }}>
                                {
                                    bookingdetail != null ?
                                        <View style={[styles.flexRow, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                <Image source={require('../../assets/icon/checkin.png')} style={{ width: wp(50), height: wp(37) }} placeholderStyle={{ backgroundColor: null }} />
                                                <Text style={[fontStyles.Regular14, { color: colors.dark }]}>
                                                    เวลา  {bookingdetail.detail[0].start}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                <Image source={require('../../assets/icon/checkout.png')} style={{ width: wp(50), height: wp(37) }} placeholderStyle={{ backgroundColor: null }} />
                                                <Text style={[fontStyles.Regular14, { color: colors.dark }]}>
                                                    เวลา  {bookingdetail.detail[0].end}
                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        <Text style={[fontStyles.Regular18, { alignSelf: 'center', color: '#b1b7bc', marginTop: hp(15) }]}>
                                            ยังไม่มีการจอง
                                        </Text>
                                }
                            </View>
                        </View>
                    </View>
                    :
                    null
            }

            <View style={[styles.container, { marginVertical: normalize(10) }]}>
                {
                    type === 'Arcade' ?
                        <View style={[styles.flexRow]}>
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

                        </View>
                        : null
                }

            </View>
            <View style={[styles.container, { flex: 1, zIndex: 0 }]}>
                <ScrollView style={[{ flex: 1 }]}>

                    <View style={[{ flex: 1, position: 'relative' }]}>
                        {
                            type === 'Arcade' ?

                                <View style={[{ position: 'absolute', flex: 1 }]}>
                                    {
                                        type === 'Arcade' ? <Svg height={hp(327)} width={widthPercent(1)} style={[{ position: 'absolute', zIndex: 3 }]}>
                                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <Stop offset="0%" stopColor="rgb(35,36,65)" stopOpacity="0" />
                                                <Stop offset="90%" stopColor="#131429" stopOpacity="1" />
                                            </LinearGradient>
                                            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                                        </Svg> : null
                                    }

                                    <Image
                                        source={
                                            { uri: 'https://mip.co.th/App/bgInflu.png' }
                                        }
                                        width={wp(372)}
                                        height={hp(327)}
                                        style={{ width: wp(372), height: hp(327) }}
                                        PlaceholderContent={<ActivityIndicator size='small' color={colors.blue} />}
                                        placeholderStyle={{ backgroundColor: null }}
                                    />

                                </View>
                                :
                                <Image
                                    source={
                                        type == 'Sleeping' ? require('../../assets/img/sleeping.png') : null ||
                                            type == 'Broadcast' ? require('../../assets/img/broadcast.png') : null
                                    }
                                    width={wp(372)}
                                    height={hp(327)}
                                    style={{ width: wp(372), height: hp(327) }}
                                    PlaceholderContent={<ActivityIndicator size='small' color={colors.blue} />}
                                    placeholderStyle={{ backgroundColor: null }}
                                />
                        }

                        {
                            type === 'Arcade' ?
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
                                : null
                        }

                    </View>
                </ScrollView>
            </View>
            {type === 'Arcade' ?
                <SelectTimeComponent />
                :
                <View style={[{
                    backgroundColor: colors.white,
                    height: hp(250),
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    paddingTop: hp(20)
                }]}>
                    <View style={[styles.container, { alignItems: 'center' }]}>
                        <Text style={[fontStyles.Medium16, { color: colors.dark }]}>
                            สลีปปิ้งพอด
                        </Text>
                        <Text style={[fontStyles.Medium16, { color: colors.dark }]}>
                            ติดต่อแอดมิน
                        </Text>
                        <Button
                            containerStyle={{ width: wp(344) }}
                            buttonStyle={[{ width: '100%', marginBottom: hp(15), backgroundColor: colors.blue }]}
                            title='Email : admin@kingkaster.com'
                            titleStyle={[fontStyles.Medium18]}
                        />
                        <OpenURLButton
                            url={supportedURL}
                            containerStyle={{ width: wp(344) }}
                            buttonStyle={[{ width: '100%', marginBottom: hp(15), backgroundColor: '#3ac43f' }]}
                            title='Line@ : @kingkaster'
                            titleStyle={[fontStyles.Medium18]}
                        />
                    </View>
                </View>}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalShow}
            >
                <View style={[pageStyle.centeredView]}>
                    <View style={[pageStyle.modalView]}>
                        <TouchableOpacity onPress={() => { setModalShow(false) }} style={{ alignSelf: 'flex-end' }} >
                            <EvilIcons name='close' size={normalize(25)} />
                        </TouchableOpacity>
                        <IconApp name='success' width={wp(40)} height={wp(35)} />
                        <Text style={[fontStyles.Medium20, { color: '#002c56' }]}>
                            จองสำเร็จ
                        </Text>
                        <Text style={[fontStyles.Regular15, { color: '#002c56' }]}>
                            ไปสนุกกับเกมส์กันเถอะ
                        </Text>
                        <Text style={[fontStyles.Regular15, { color: '#002c56' }]}>
                            ลุยกันเลย !
                        </Text>
                    </View>
                </View>
            </Modal>

        </View>


    )
}
const pageStyle = StyleSheet.create({
    containerSelectDate: {
        backgroundColor: '#fff',
        marginTop: -hp(65),
        paddingTop: hp(55),
        borderBottomLeftRadius: 42,
        borderBottomRightRadius: 42,
        paddingHorizontal: wp(25)
    },
    containerFooter: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        marginBottom: -hp(45),
        paddingBottom: hp(69),
        paddingTop: wp(20),
        paddingHorizontal: wp(20)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: wp(335),
        padding: hp(20),

        backgroundColor: "white",
        borderRadius: 8,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

})
export default BookingArcade