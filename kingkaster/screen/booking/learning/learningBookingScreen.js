import React, { useEffect, useRef, useState } from 'react';
import { Animated, PixelRatio, SafeAreaView, View, TouchableOpacity, Text, ScrollView, Image, StyleSheet, FlatList } from 'react-native';
import Share from 'react-native-share';
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg';
import normalize from '../../../function/normalize';
import { hp, wp } from '../../../function/screen';
import fontStyles from '../../../styles/fontStyles';
import styles from '../../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../styles/colors';
import { Button, Divider, LinearProgress } from 'react-native-elements';
import { learningBooking } from '../../../store/actions/booking';
import { useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize'
import { Rating } from '../../../components';
import dummySocial from '../../../data/dummySocial'
const learningBookingScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [scroll, setScroll] = useState(0)
    const [showdetail, setshowdetail] = useState(false)
    const [showcourse, setshowcourse] = useState(false)

    const modalizeRef = useRef(null);
    useEffect(() => {
        fadeIn()
    }, [])
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true
        }).start();
    };

    const renderItem = (itemData) => {

        return (
            <View>
                <Icon name={'ellipse'} size={12} color={itemData.item.status == 1 ? '#FFF' : '#f5404b'} />

            </View>
        )
    }

    const renderItemSocial = (itemData) => {
        const shareOptions = itemData.item.type == 'whatsapp' ? {
            url: itemData.item.uri,
            social: Share.Social.WHATSAPP,
        } : null ||
            itemData.item.type == 'instagram' ? {
            url: itemData.item.uri,
            social: Share.Social.INSTAGRAM,
        } : null ||
            itemData.item.type == 'instagramstory' ? {
            method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
            backgroundImage: 'https://cms.dmpcdn.com/musicarticle/2021/03/09/23a72b60-8096-11eb-809e-cb42afe7ddd1_original.jpg',
            backgroundBottomColor: '#fefefe',
            backgroundTopColor: '#906df4',
            social: Share.Social.INSTAGRAM_STORIES
        } : null ||
            itemData.item.type == 'facebook' ? {
            url: itemData.item.uri,
            social: Share.Social.FACEBOOK,
        } : null ||
            itemData.item.type == 'facebook-messenger' ? {
            url: itemData.item.uri,
            social: Share.Social.MESSENGER,
        } : null

        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={
                    async () => {
                        await Share.shareSingle(shareOptions)
                            .then((res) => { console.log(res) })
                            .catch((err) => { err && console.log(err); });
                    }
                }
                    style={{ alignItems: 'center' }}
                >
                    <View style={[pageStyle.btnSocial, { backgroundColor: itemData.item.color, marginHorizontal: wp(18) }]}>
                        <Icon2 name={itemData.item.icon} size={normalize(22)} color={'#FFF'} />
                    </View>
                    <Text style={[fontStyles.Regular14, { color: colors.dark }]}>
                        {itemData.item.title}
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }
    return (
        <SafeAreaView style={[styles.screen]}>

            <ScrollView style={[{ flex: 1, marginTop: -hp(50), }]}
                onScroll={(event) => {
                    setScroll(event.nativeEvent.contentOffset.y)
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={hp(152)}
            >
                <View style={[{ position: 'relative', flex: 1, }]}>
                    <Svg height={hp(400)} width={'100%'} style={[{ position: 'absolute', zIndex: 3 }]}>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0%" stopColor="rgb(169,121,121)" stopOpacity="0" />
                            <Stop offset="92%" stopColor="#141622" stopOpacity="1" />
                        </LinearGradient>
                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                    </Svg>
                    <Image
                        source={require('../../../assets/img/learning.png')}
                        style={[{ width: '100%', height: hp(337), position: 'absolute', zIndex: 2 }]}
                        resizeMode='cover'
                    />
                    <View style={{ flex: 1, zIndex: 4, alignItems: 'flex-end', paddingRight: wp(14),paddingTop:hp(50) }}>
                        <View style={[styles.flexRow, { marginTop: hp(20), justifyContent: 'space-between' }]}>
                            <TouchableOpacity onPress={onOpen} style={{ borderRadius: 20, width: 30, height: 30, backgroundColor: '#246080', alignItems: 'center', justifyContent: 'center', marginRight: wp(8) }}>
                                <Icon name='share-social-outline' size={normalize(15)} color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.pop()} style={{ borderRadius: 20, width: 30, height: 30, backgroundColor: '#246080', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='close' size={normalize(15)} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={[{ marginTop: hp(210), flex: 1 }]}>
                    <View style={[styles.flexRow, { flex: 1, justifyContent: 'flex-start',zIndex:4 }]}>
                        <View style={[styles.flexRow, { flex: 1, marginLeft: wp(25), marginBottom: hp(12) }]}>
                            <Image
                                resizeMode='cover'
                                source={require('../../../assets/img/creator.png')}
                                style={{ width: wp(70), height: wp(70), zIndex: 1, marginRight: wp(10) }}
                            />
                            <Text style={[fontStyles.Medium16, { color: colors.white, textAlign: 'center' }]} numberOfLines={2}>
                                พี่เอก ฮาร์ทร็อกเกอร์
                            </Text>
                        </View>
                        <View style={[pageStyle.price]}>
                            <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                                ฿2,500
                            </Text>
                            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                                <Text style={[fontStyles.Regular10, { color: '#c4c4c4', textDecorationLine: 'line-through' }]}>
                                    ฿5,000
                                </Text>
                                <View style={{ backgroundColor: '#FFF', paddingHorizontal: wp(5) }}>
                                    <Text style={[fontStyles.Medium10, { color: colors.dark }]}>
                                        -50%
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={[styles.container]}>

                        <Text style={[fontStyles.Medium22, { color: '#FFF' }]}>
                            สอนวิธีแคสเกมด้วยมือถือ
                        </Text>
                        <Text style={[fontStyles.Regular18, { color: '#FFF', marginBottom: normalize(17) }]}>
                            <Text style={{ color: colors.success }}>199 </Text>จ่ายเงินแล้ว   | <Text style={{ color: colors.success }}>30 </Text>จองแล้ว | <Text style={{ color: colors.success }}>329 </Text>ชื่นชอบ
                        </Text>

                    </View>
                    <View style={[styles.container, styles.flexRow]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={1}>
                                <Icon name='calendar' size={normalize(16)} /> Apr 12,2021(09:00-18:00)
                            </Text>
                            <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={1}>
                                <Icon name='md-location-sharp' size={normalize(16)} /> สุขุมวิท, กรุงเทพมหานคร
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[fontStyles.Regular14, { color: '#FFF' }]}>
                                ระดับความยาก
                            </Text>
                            <Text style={[fontStyles.Regular14, { color: '#FFF' }]}>
                                <Rating count={5} rating={3} type='circle' size={9} countColor='#989898' ratingColor='#f5404b' ladderSize={true} />

                            </Text>
                        </View>

                    </View>
                    <View style={[styles.container, { marginTop: normalize(25) }]}>
                        <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                            <Text style={[fontStyles.Medium16, { color: colors.yellow }]}>
                                จำนวนที่นั่ง
                            </Text>
                            <Text style={[fontStyles.Medium12, { color: colors.white }]}>
                                80/100
                            </Text>
                        </View>

                        <LinearProgress color={colors.white} value={0.80} style={{height:hp(9),borderRadius:hp(6)}} variant="determinate" />
                    </View>
                    <View style={[styles.container, { marginTop: normalize(25) }]}>
                        <Text style={[fontStyles.Medium16, { color: colors.yellow }]}>
                            รายละเอียดคลาส
                        </Text>
                        <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={showdetail == false ? 12 : null}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                        </Text>
                        {
                            showdetail == false ?
                                <View style={[{ position: 'relative', flex: 1, top: -hp(75) }]}>
                                    <Svg height={hp(150)} width={'100%'} style={[{ position: 'absolute', zIndex: 3 }]}>
                                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <Stop offset="0%" stopColor="rgb(169,121,121)" stopOpacity="0" />
                                            <Stop offset="92%" stopColor="#131429" stopOpacity="1" />
                                        </LinearGradient>
                                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                                    </Svg>

                                    <View style={{ flex: 1, zIndex: 4, paddingRight: wp(14) }}>
                                        <View style={[{ marginTop: hp(80), alignItems: 'center' }]}>
                                            <TouchableOpacity onPress={() => setshowdetail(true)}>
                                                <Text style={[fontStyles.Medium15, { color: colors.blue, textDecorationLine: 'underline' }]}>
                                                    ดูเพิ่มเติม
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                </View>
                                : null
                        }


                    </View>
                    <View style={[styles.container, { marginTop: normalize(25) }]}>
                        <Text style={[fontStyles.Medium16, { color: colors.yellow }]}>
                            รายละเอียดบทเรียน
                        </Text>
                        <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={showcourse == false ? 12 : null}>
                            คอร์สเรียนนี้เหมาะกับใคร

                            ผู้เริ่มต้นใช้โปรแกรม After Effect ,
                            Youtuber ที่อยากทำโมชั่นทำกราฟฟิกช่องด้วยตัวเอง
                            โปรแกรมที่ต้องใช้

                            Adobe After Effect
                            Adobe Photoshop
                            Top Tools เครื่องมือที่ใช้บ่อยๆ

                            Description: อีกหนึ่งปัญหาของการเรียนรู้โปรแกรม Adobe After Effect คือ ความยุ่งยาก และซับซ้อนของเครื่องมือ ซึ่งใน Chapter ที่ 1 นี้ ผู้สอนจะพาทุกคนมารู้จักกับเครื่องมือทุกชนิด ที่ใช้บ่อย และจำเป็น สำหรับกลุ่มผู้เรียน เพื่อให้เข้าใจง่าย และสามารถต่อยอดการใช้โปรแกรมให้เชี่ยวชาญมากยิ่งขึ้นได้อย่างไม่มีอุปสรรค
                            บทที่ 2 : Key Frame

                            Description: หัวใจสำคัญของการทำ Motion Graphic ที่ทุกๆคนต้องทำความเข้าใจ หากเข้าใจเรื่องของ Key Frame แล้ว จะทำให้เพิ่มประสิทธิภาพและความเร็วในการผลิตชิ้นงานได้
                            บทที่ 3 :  การจัดเตรียมไฟล์สำหรับใช้งาน (เข้าไปใน photoshop ด้วย)

                            Description: อีกเรื่องที่สำคัญสำหรับการทำ Motion Graphic คือการจัดเตรียมไฟล์ให้พร้อมใช้ และมีคุณสมบัติตรงตามที่เราต้องการ ซึ่งหากทำได้อย่างรอบคอบ และใส่ใจในส่วนนี้ ก็จะทำให้ดำเนินงานง่ายขึ้น ทั้งตนเอง และผู้อื่นที่เข้ามาทำงานต่อจากเรา
                            บทที่ 4 :  Intro Motion

                            Description: ในการทำคลิปวิดิโอ Intro คือส่วนประกอบที่สำคัญมาก เพราะนั่นคือส่วนหนึ่งในการแนะนำตัวตนของเรา  ในบทนี้ เราจะสอนทำ Intro แบบง่ายๆ แต่สวยงามกันครับ

                            ทดลองทำ Intro แบบเต็มรูปแบบinvidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                        </Text>
                        {
                            showcourse == false ?
                                <View style={[{ position: 'relative', flex: 1, top: -hp(75) }]}>
                                    <Svg height={hp(150)} width={'100%'} style={[{ position: 'absolute', zIndex: 3 }]}>
                                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <Stop offset="0%" stopColor="rgb(169,121,121)" stopOpacity="0" />
                                            <Stop offset="92%" stopColor="#131429" stopOpacity="1" />
                                        </LinearGradient>
                                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                                    </Svg>

                                    <View style={{ flex: 1, zIndex: 4, paddingRight: wp(14) }}>
                                        <View style={[{ marginTop: hp(80), alignItems: 'center' }]}>
                                            <TouchableOpacity onPress={() => setshowcourse(true)}>
                                                <Text style={[fontStyles.Medium15, { color: colors.blue, textDecorationLine: 'underline' }]}>
                                                    ดูเพิ่มเติม
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                </View>
                                : null
                        }


                    </View>
                    <Button
                        title='จองเลย'
                        onPress={
                            async () => {
                                try {
                                    await dispatch(learningBooking({ image: '', cerator: 'พี่เอก ฮาร์ทร็อกเกอร์', titleCourse: 'สอนวิธีแคสเกมด้วยมือถือ', price: 2500 }))
                                    navigation.navigate('LearningBookingDetailScreen', { title: 'เลิร์นนิ่งเซ็นเตอร์', colorHeader: colors.success })
                                } catch (e) {
                                    console.log(e.message)
                                }


                            }
                        }
                        buttonStyle={{ backgroundColor: colors.blue }}
                        containerStyle={{ paddingHorizontal: wp(20), marginBottom: hp(40) }}
                        titleStyle={[fontStyles.Regular18]}
                    />
                </View>

            </ScrollView>

            <Modalize
                ref={modalizeRef}
                modalStyle={{ backgroundColor: '#f6f6f6', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                childrenStyle={{ marginTop: hp(18), flex: 1 }}
                closeOnOverlayTap={true} snapPoint={hp(200)}
                withOverlay={false} modalHeight={hp(200)}
                handleStyle={{ backgroundColor: '#FFF', width: wp(51), height: hp(7) }}
                scrollViewProps={{ scrollEnabled: false }}
            >
                <View style={[{ flex: 1 }]}>
                    <View style={[{ flex: 1 }]}>
                        <Text style={[fontStyles.Medium18, { color: colors.dark, alignSelf: 'center', marginBottom: hp(18) }]}>
                            แชร์ให้กับเพื่อนและครอบครัว
                        </Text>
                    </View>

                    <Divider style={{ height: 1, backgroundColor: '#d9d9d9' }} />
                    <View style={[{ flex: 1, justifyContent: 'center', marginTop: hp(15), marginLeft: wp(20) }]}>
                        <FlatList
                            horizontal={true}
                            data={dummySocial}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItemSocial}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modalize>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    price: { backgroundColor: colors.red, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(90), maxHeight: wp(50), paddingLeft: wp(10) },
    btnSocial: { width: wp(45), height: wp(45), justifyContent: 'center', alignItems: 'center', borderRadius: wp(23) }
})
export default learningBookingScreen