import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, PixelRatio, Animated, FlatList, StyleSheet } from 'react-native';
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg';
import { Card } from 'react-native-elements'
import { Header } from '../../components';
import { hp, widthPercent, wp } from '../../function/screen';
import styles from '../../styles/styles';
import fontStyles from '../../styles/fontStyles';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import normalize from '../../function/normalize';
import { Modalize } from 'react-native-modalize'
import dummySocial from '../../data/dummySocial'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Share from 'react-native-share';
import dummyNews from '../../data/dummyNews'
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
const newsDetailScreen = ({ navigation, route }) => {
    const { id } = route.params
    const newsFind = dummyNews.find(state => state.id == id)
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        fadeIn()
    }, [])
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const modalizeRef = useRef(null);
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true
        }).start();
    };
    const onOpen = () => {
        modalizeRef.current?.open();
    };
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
    const renderItem = (itemdata) => {
        return (
            <Card
                containerStyle={[{ backgroundColor: colors.darkGreyBlue2, borderRadius: 12, borderWidth: 0, padding: 0, marginHorizontal: 0, maxHeight: hp(110) }]}
            >
                <TouchableOpacity onPress={() => navigation.navigate('NewsDetailScreen', { id: itemdata.item.id })} >
                    <View style={[styles.flexRow,]}>
                        <View style={[{ paddingLeft: wp(25), flex: 1 }]}>
                            <Text style={[fontStyles.Regular15, { color: '#fff' }]} numberOfLines={1}>
                                {itemdata.item.title}
                            </Text>
                            {
                                itemdata.item.type === 'event' ?
                                    <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={1}>
                                        <Icon name='calendar' size={normalize(14)} />   {moment(itemdata.item.event_start).format('MMM DD, YYYY')}
                                    </Text>
                                    :
                                    <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={1}>
                                        <Text style={[{ color: colors.success }]}>
                                            {itemdata.item.seen + ' '}
                                        </Text>
                                            ดูแล้ว |
                                            <Text style={[{ color: colors.success }]}>
                                            {' ' + itemdata.item.share + ' '}
                                        </Text>
                                                แชร์
                                            </Text>
                            }
                            {
                                itemdata.item.type === 'event' ?
                                    <Text style={[fontStyles.Regular14, { color: '#FFF' }]} numberOfLines={1}>
                                        <Icon name='md-location-sharp' size={normalize(14)} /> สุขุมวิท, กรุงเทพมหานคร
                              </Text>
                                    :
                                    null
                            }
                            <Text style={[fontStyles.Regular14, { color: '#b1b1b1' }]} numberOfLines={1}>
                                วันที่โพสต์ {itemdata.item.create}
                            </Text>
                        </View>
                        <View style={[{ alignItems: 'flex-end', flex: 1 }]}>
                            <Image
                                source={require('../../assets/img/news.png')}
                                style={[{ width: wp(111), height: hp(110), borderBottomRightRadius: 12, borderTopRightRadius: 12 }]}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>

        )
    }
    return (
        <View style={[styles.screen]}>
            <Animated.View
                style={[scroll < hp(152) ?
                    {
                        height: hp(131), paddingTop: hp(45),
                        marginTop: -hp(45), paddingHorizontal: wp(20), backgroundColor: null, position: 'absolute', zIndex: 9, width: wp(414), marginTop: 0
                    }
                    :
                    {
                        backgroundColor: fadeAnim.interpolate(
                            {
                                inputRange: [0, 1],
                                outputRange: [
                                    'rgba(35, 36, 65, 0.9)',
                                    'rgba(0, 255, 0, 1)'
                                ]
                            }),
                        height: hp(131), paddingTop: hp(45),
                        marginTop: -hp(45), paddingHorizontal: wp(20), backgroundColor: 'rgba(35, 36, 65, 0.9)', position: 'absolute', zIndex: 9, width: wp(414), height: hp(100), borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 0
                    },
                { width: wp(414) }
                ]}
            >
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <TouchableOpacity onPress={() => { navigation.pop() }}>
                        <View style={[styles.flexRow]}>
                            <Icon2 name='arrow-left' size={PixelRatio.roundToNearestPixel(19)} color='#FFF' />
                            <Text style={[fontStyles.Regular20, { color: '#FFF', marginLeft: normalize(15) }]}>
                                กลับ
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={onOpen} style={{ borderRadius: 20, width: 30, height: 30, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center', marginRight: wp(8) }}>
                            <Icon name='share-social-outline' size={normalize(15)} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>
            <ScrollView style={[{ flex: 1 }]}
                onScroll={(event) => {
                    setScroll(event.nativeEvent.contentOffset.y)
                }}
                scrollEventThrottle={hp(152)}
            >
                <View style={[{ position: 'relative', flex: 1 }]}>
                    <Svg height={hp(400)} width={'100%'} style={[{ position: 'absolute', zIndex: 3 }]}>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0%" stopColor="rgb(169,121,121)" stopOpacity="0" />
                            <Stop offset="92%" stopColor="#141622" stopOpacity="1" />
                        </LinearGradient>
                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                    </Svg>
                    <Image
                        source={require('../../assets/img/bgNews.png')}
                        style={[{ width: '100%', height: hp(337), position: 'absolute', zIndex: 2 }]}
                        resizeMode='cover'
                    />
                </View>
                <View style={[styles.container, { marginTop: hp(210), flex: 1,zIndex:4 }]}>
                    <View>
                        <Text style={[fontStyles.Medium22, { color: '#FFF' }]}>
                            {newsFind.title}
                        </Text>
                        <Text style={[fontStyles.Regular14, { color: '#FFF' }]}>
                            วันที่โพสต์ {moment(newsFind.create).format('D MMM YYYY')}
                        </Text>
                        <Text style={[fontStyles.Regular18, { color: '#FFF', marginBottom: normalize(17) }]}>
                            <Text style={{ color: colors.success }}>{newsFind.seen} </Text>ดูแล้ว | <Text style={{ color: colors.success }}>{newsFind.share} </Text>แชร์
                        </Text>
                        {
                            newsFind.type === 'event' ?
                                <View>

                                    <Text style={[fontStyles.Regular16, { color: '#FFF' }]}>
                                        <Icon name='calendar' size={normalize(16)} />{moment(newsFind.event_start).format('MMM DD, YYYY')}
                                    </Text>
                                    <Text style={[fontStyles.Regular16, { color: '#FFF' }]}>
                                        <Icon name='md-location-sharp' size={normalize(16)} /> สุขุมวิท, กรุงเทพมหานคร
                                    </Text>
                                </View>
                                :
                                null
                        }

                    </View>
                    <View style={[{ marginTop: normalize(25) }]}>
                        <Text style={[fontStyles.Medium16, { color: colors.yellow }]}>
                            รายละเอียด
                        </Text>
                        <Text style={[fontStyles.Regular14, { color: '#FFF' }]}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                        </Text>
                        <Text style={[fontStyles.Regular14, { color: '#FFF' }]}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                        </Text>
                    </View>

                </View>
                <View style={{ flex: 1,marginBottom:hp(30),paddingHorizontal:wp(20) }} >
                    <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                        <Text style={[fontStyles.Medium20, { color: colors.yellow }]}>
                            ข่าวที่น่าสนใจ
                            </Text>
                        
                    </View>
                    <Carousel
                        style={{ flex: 1 }}
                        data={dummyNews.filter(state => state.type === 'news')}
                        renderItem={renderItem}
                        sliderWidth={widthPercent(1)}
                        itemWidth={wp(286)}
                        activeSlideAlignment='start'
                        enableSnap={false}
                        slideStyle={[{ padding: 0 }]}
                        contentContainerStyle={{ flex: 1 }}
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
        </View>
    )
}
const pageStyle = StyleSheet.create({
    price: { backgroundColor: colors.red, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(90), maxHeight: wp(50), paddingLeft: wp(10) },
    btnSocial: { width: wp(45), height: wp(45), justifyContent: 'center', alignItems: 'center', borderRadius: wp(23) }
})
export default newsDetailScreen;