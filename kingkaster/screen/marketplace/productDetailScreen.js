import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Animated, StyleSheet, FlatList } from 'react-native'
import Share from 'react-native-share';
import normalize from '../../function/normalize'
import { hp, wp } from '../../function/screen'
import styles from '../../styles/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '../../styles/colors'
import Carousel from 'react-native-snap-carousel';
import { Pagination, Rating } from '../../components';
import fontStyles from '../../styles/fontStyles';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { Modalize } from 'react-native-modalize'
import { Button, Divider } from 'react-native-elements';
import dummySocial from '../../data/dummySocial'
import { useDispatch, useSelector } from 'react-redux'
import { add_cart } from '../../store/actions/marketplace';
const productDetailScreen = ({ navigation, route }) => {
    const { product_id } = route.params
    const dispatch = useDispatch()
    const dummyData = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
    ]

    const dummyColor = [{ color_id: 1, color_title: 'ฺBlack' }, { color_id: 2, color_title: 'White' }, { color_id: 3, color_title: 'green' }, { color_id: 4, color_title: 'red' }]
    const dummySize = [{ size_id: 1, size_title: 'S' }, { size_id: 2, size_title: 'M' }, { size_id: 3, size_title: 'L' }]
    const modalizeShare = useRef(null);
    const modalizeDetail = useRef(null)
    const HEADER_MAX_HEIGHT = hp(336);
    const HEADER_MIN_HEIGHT = hp(100);
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
    const [activeSlide, setActiveSlide] = useState(0)
    const [scroll, setScroll] = useState(0)
    const [selectColor, setSelectColor] = useState({ color_id: null, selected: false })
    const [selectSize, setSelectSize] = useState({ size_id: null, selected: false })
    const [count, setCount] = useState(1)
    const findProduct = useSelector(state => state.marketplace.product.find(product => product.id == product_id))

    useEffect(() => {

    }, [dispatch])
    const onOpenShare = () => {

        modalizeShare.current?.open();

    };
    const onOpenDetail = () => {

        modalizeDetail.current?.open();
    }
    const scrollY = useRef(new Animated.Value(0)).current;

    const opacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',

    });
    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });
    const headerHeight = scrollY.interpolate({
        inputRange: [hp(100), hp(100)],
        outputRange: [hp(100), hp(100)],
        extrapolate: 'clamp',
    });
    const PaginationDot = () => {
        return (
            <Pagination
                length={dummyData.length}
                activeIndex={activeSlide}
            />
        );
    }
    const renderItem = (itemData) => {
        return (
            <View
                style={[{ alignSelf: 'center', paddingTop: hp(50) }]}
            >
                <Image
                    source={require('../../assets/img/t-shirt.png')}
                    style={{ height: hp(275), width: hp(220) }}
                />
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
        <View style={[styles.screen]}>
            <Animated.View
                style={[
                    pageStyle.headerFirst, { opacity: opacity, height: headerHeight }
                ]}
            />
            <Animated.View
                style={[
                    pageStyle.headerHide
                ]}
            />
            <View style={[pageStyle.containerButtonHeader]}>
                <View style={{ alignItems: 'flex-start', paddingLeft: wp(14), flex: 1 }}>
                    <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                        <TouchableOpacity onPress={() => { navigation.pop() }} style={[pageStyle.buttonHeader]}>
                            <IconFontAwesome name='angle-left' size={hp(25)} color={colors.white} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', paddingRight: wp(14), flex: 1 }}>
                    <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                        <TouchableOpacity onPress={onOpenShare} style={[pageStyle.buttonHeader]}>
                            <Icon name='share-social-outline' size={hp(20)} color={colors.white} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('basket', { from: 'navigate',tab:'basket' })} style={[pageStyle.buttonHeader, { marginRight: 0 }]}>
                            <Icon name='cart-outline' size={hp(20)} color={colors.white} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[{ flex: 1, }]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false }
                )}
                scrollEventThrottle={hp(152)}
            >
                <View style={[{ flex: 1, backgroundColor: '#FFF', }]}>
                    <View style={[{ flex: 1, alignItems: 'center', backgroundColor: '#FFF' }]}>
                        <View style={[{ alignItems: 'center' }]}>
                            <Carousel
                                activeSlideAlignment='center'
                                data={dummyData}
                                renderItem={renderItem}
                                sliderWidth={wp(414)}
                                sliderHeight={hp(336)}
                                itemWidth={hp(414)}
                                inactiveSlideScale={0.3}
                                inactiveSlideOpacity={0.6}
                                onSnapToItem={(index) => setActiveSlide(index)}
                            />
                            <PaginationDot />
                        </View>
                    </View>
                </View>
                <View style={[{ flex: 1,marginBottom:hp(20) }]}>
                    <View style={[pageStyle.containerDetail]}>
                        <Text style={[fontStyles.Medium18, { color: colors.white }]} numberOfLines={2}>
                            {findProduct.title}
                        </Text>
                        <Text style={[fontStyles.Bold28, { color: colors.success }]}>
                            {findProduct.real_price} KK
                        </Text>
                        <View style={[styles.flexRow, { marginBottom: hp(15) }]}>
                            <Text style={[fontStyles.Regular16, { color: '#b1b7bc', textDecorationLine: 'line-through' }]}>
                                {findProduct.old_price} KK
                            </Text>
                            <View style={[pageStyle.containerDiscount]}>
                                <Text style={[fontStyles.Regular14, { color: colors.white }]}>
                                    {findProduct.discount_p}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text style={[fontStyles.Medium20, { color: colors.yellow, marginRight: wp(6) }]}>{findProduct.rating}</Text>
                            <Rating count={5} rating={findProduct.rating} size={normalize(15)} />
                            <Text style={[fontStyles.Light20, { color: '#b1b7bc', marginHorizontal: wp(15) }]}>|</Text>
                            <Text style={[fontStyles.Medium16, { color: colors.white }]}>{findProduct.total_sell}</Text>
                            <Text style={[fontStyles.Regular16, { color: '#b1b7bc', marginHorizontal: wp(15) }]}>ขายแล้ว</Text>
                            <View style={[pageStyle.buttonFav, { borderColor: colors.white }]}>
                                <IconMaterial name='favorite-outline' size={wp(17)} color={colors.white} />
                            </View>
                            <Text style={[fontStyles.Regular16, { color: colors.white, marginLeft: wp(7) }]}>
                                {findProduct.favorite}
                            </Text>
                        </View>
                    </View>
                    <View style={[pageStyle.containerDetail, { marginTop: hp(10) }]}>
                        <View style={[styles.flexRow]}>
                            <Text style={[fontStyles.Bold18, { color: colors.white }]}>
                                ส่งจาก :
                            </Text>
                            <Text style={[fontStyles.Regular16, { color: colors.white, marginLeft: wp(10) }]} numberOfLines={1}>
                                เขตลาดพร้าว จังหวัดกรุงเทพมหานคร
                            </Text>
                            <TouchableOpacity style={{ alignItems: 'center', marginLeft: wp(7) }}>
                                <IconFontAwesome name='angle-down' size={normalize(15)} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text style={[fontStyles.Bold18, { color: colors.white }]}>
                                ค่าส่ง :
                            </Text>
                            <Text style={[fontStyles.Regular16, { color: colors.white, marginLeft: wp(10) }]} numberOfLines={1}>
                                {findProduct.shipping} บาท
                            </Text>
                            <TouchableOpacity style={{ alignItems: 'center', marginLeft: wp(7) }}>
                                <IconFontAwesome name='angle-down' size={normalize(15)} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[pageStyle.containerDetail, { marginTop: hp(10) }]}>
                        <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                            <Text style={[fontStyles.Bold18, { color: colors.white }]}>
                                ลักษณะตัวเลือกสินค้า
                            </Text>
                            <Text style={[fontStyles.Regular16, { color: colors.white, marginLeft: wp(10) }]} numberOfLines={1}>
                                ( {findProduct.color.length} สี , {findProduct.size.length} ขนาด)
                            </Text>
                            <TouchableOpacity onPress={onOpenDetail} style={{ alignItems: 'center', marginLeft: wp(7) }}>
                                <IconFontAwesome name='angle-right' size={normalize(25)} color={colors.white} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <Modalize
                withHandle={false}
                ref={modalizeShare}
                modalStyle={{ backgroundColor: '#f6f6f6', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                childrenStyle={{ marginTop: hp(18), flex: 1 }}
                closeOnOverlayTap={true} snapPoint={hp(200)}
                withOverlay={false} modalHeight={hp(200)}
                handleStyle={{ backgroundColor: '#FFF', width: wp(51), height: hp(7) }}
                scrollViewProps={{ scrollEnabled: false }}
            >
                <View style={[{ flex: 1 }]}>
                    <View style={[styles.flexRow, { flex: 1, justifyContent: 'center', marginBottom: hp(18) }]}>
                        <View style={{ flex: 1, flexGrow: 0.2 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={[fontStyles.Medium18, { color: colors.dark, alignSelf: 'center' }]}>
                                แชร์ให้กับเพื่อนและครอบครัว
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 0.2 }}>
                            <TouchableOpacity onPress={() => modalizeShare.current?.close()}>
                                <IconMaterial name='close' size={normalize(22)} color='#979797' style={{ right: 0 }} />
                            </TouchableOpacity>

                        </View>

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
            <Modalize
                withHandle={false}
                ref={modalizeDetail}
                modalStyle={{ backgroundColor: '#f6f6f6', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                childrenStyle={{ marginTop: hp(18), flex: 1 }}
                closeOnOverlayTap={true} snapPoint={hp(652)}
                withOverlay={false} modalHeight={hp(652)}
                handleStyle={{ backgroundColor: '#FFF', width: wp(51), height: hp(7) }}
                scrollViewProps={{ scrollEnabled: false }}
            >
                <View style={[{ flex: 1 }]}>
                    <View style={[styles.flexRow, { flex: 1, justifyContent: 'center', marginBottom: hp(18) }]}>
                        <View style={{ flex: 1, flexGrow: 0.2 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={[fontStyles.Medium18, { color: colors.dark, alignSelf: 'center' }]}>
                                ลักษณะตัวเลือกสินค้า
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 0.2 }}>
                            <TouchableOpacity onPress={() => modalizeDetail.current?.close()}>
                                <IconMaterial name='close' size={normalize(22)} color='#979797' style={{ right: 0 }} />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <Divider style={{ height: 1, backgroundColor: '#d9d9d9' }} />
                    <View style={[{ flex: 1, justifyContent: 'center', marginTop: hp(15), marginLeft: wp(20) }]}>
                        <View style={[styles.flexRow, { marginBottom: hp(10) }]}>
                            <View style={[{ width: hp(78), height: hp(78), backgroundColor: '#575e80', borderRadius: hp(15), justifyContent: 'center', alignItems: 'center' }]}>
                                <Image
                                    source={require('../../assets/img/t-shirt.png')}
                                    style={{ height: hp(60), width: hp(40), resizeMode: 'cover' }}
                                />
                            </View>
                            <View style={[{ marginLeft: wp(15) }]}>
                                <Text style={[fontStyles.Bold24, { color: colors.success, marginBottom: -hp(5) }]}>
                                    {findProduct.real_price} KK
                                </Text>
                                <Text style={[fontStyles.Regular16, { color: '#b1b7bc', textDecorationLine: 'line-through' }]}>
                                    {findProduct.old_price} KK
                                </Text>
                                <Text style={[fontStyles.Regular16, { color: colors.dark }]}>
                                    มีสินค้าทั้งหมด {findProduct.all_item}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.flexRow]}>
                            <View style={[{ flex: 1, flexGrow: 0.3 }]}>
                                <Text style={[fontStyles.Medium15, { color: colors.dark }]}>
                                    สี :
                                </Text>
                            </View>
                            <View style={[styles.flexRow, { flex: 1, flexWrap: 'wrap' }]}>
                                {
                                    findProduct.color.map((item) => {
                                        return (
                                            <Button
                                                onPress={() => {
                                                    setSelectColor({ color_id: item.color_id, selected: true })
                                                }}
                                                key={item.color_id}
                                                title={item.color_title}
                                                titleStyle={[fontStyles.Regular15, { color: '#2a3046', marginHorizontal: wp(10) }]}
                                                buttonStyle={[selectColor.selected == true && item.color_id == selectColor.color_id ? pageStyle.btnSelectDetail : pageStyle.btnNotSelectDetail, { marginRight: wp(8), marginBottom: hp(8) }]}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[styles.flexRow]}>
                            <View style={[{ flex: 1, flexGrow: 0.3 }]}>
                                <Text style={[fontStyles.Medium15, { color: colors.dark }]}>
                                    ขนาด :
                                </Text>
                            </View>
                            <View style={[styles.flexRow, { flex: 1, flexWrap: 'wrap' }]}>
                                {
                                    findProduct.size.map((item) => {
                                        return (
                                            <Button
                                                onPress={() => {
                                                    setSelectSize({ size_id: item.size_id, selected: true })
                                                }}
                                                key={item.size_id}
                                                title={item.size_title}
                                                titleStyle={[fontStyles.Regular15, { color: '#2a3046' }]}
                                                buttonStyle={[selectSize.selected == true && item.size_id == selectSize.size_id ? pageStyle.btnSelectDetail : pageStyle.btnNotSelectDetail, { marginRight: wp(8), width: wp(60), marginBottom: hp(8) }]}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <Divider style={{ height: 1, backgroundColor: '#d9d9d9' }} />
                    <View style={[styles.container, styles.flexRow, { paddingVertical: hp(20) }]}>
                        <View style={[{ flex: 1, flexGrow: 0.3 }]}>
                            <Text style={[fontStyles.Medium15, { color: colors.dark }]}>
                                จำนวน
                            </Text>
                        </View>
                        <View style={[styles.flexRow, { flex: 1, justifyContent: 'space-around' }]}>
                            {
                                count > 0 ?
                                    <TouchableOpacity onPress={() => { setCount(count - 1) }}>
                                        <View style={{ width: hp(35), height: hp(35), backgroundColor: '#b1b7bc', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[fontStyles.Medium16]}>
                                                -
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ width: hp(35), height: hp(35), backgroundColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[fontStyles.Medium16, { color: colors.gray }]}>
                                            -
                                        </Text>
                                    </View>
                            }

                            <Text style={[fontStyles.Medium24]}>
                                {count}
                            </Text>
                            {
                                count < findProduct.all_item ?
                                    <TouchableOpacity onPress={() => setCount(count + 1)}>
                                        <View style={{ width: hp(35), height: hp(35), backgroundColor: '#b1b7bc', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[fontStyles.Medium16]}>
                                                +
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ width: hp(35), height: hp(35), backgroundColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[fontStyles.Medium16, { color: colors.gray }]}>
                                            +
                                        </Text>
                                    </View>
                            }

                        </View>
                    </View>
                    <View>
                        <Button
                            onPress={async () => {
                                try {
                                    await dispatch(add_cart(product_id, selectColor.color_id, selectSize.size_id, count))
                                    navigation.navigate('basket', { from: "add_cart",tab:'basket' })
                                } catch (e) {
                                    console.log(e.message)
                                }
                            }}
                            title='ซื้อเลย'
                            titleStyle={[fontStyles.Regular16, { color: colors.blue }]}
                            buttonStyle={[pageStyle.btnBuy]}
                        />
                    </View>
                </View>
            </Modalize>
        </View >
    )
}
const pageStyle = StyleSheet.create({
    headerFirst: { width: wp(414), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', position: 'absolute', zIndex: 2 },
    headerHide: { width: wp(414), paddingTop: hp(50), paddingBottom: hp(5), backgroundColor: colors.darkGreyBlue2, flexDirection: 'row', alignItems: 'center', height: hp(100), borderBottomWidth: 2, borderBottomColor: colors.GreyBlue },
    containerButtonHeader: { position: 'absolute', zIndex: 3, flexDirection: 'row', alignItems: 'center', marginTop: hp(50) },
    buttonHeader: { borderRadius: hp(20), width: hp(30), height: hp(30), backgroundColor: 'rgba(0,0,0, 0.4)', alignItems: 'center', justifyContent: 'center', marginRight: wp(8) },
    containerDetail: { backgroundColor: colors.darkGreyBlue1, padding: hp(25) },
    containerDiscount: { backgroundColor: '#c40000', borderRadius: 8, marginLeft: wp(18), alignItems: 'center', justifyContent: 'center', padding: 3 },
    buttonFav: { width: wp(25), height: wp(25), borderWidth: 1, borderRadius: wp(12), borderColor: colors.white, alignItems: 'center', justifyContent: 'center' },
    btnSocial: { width: wp(45), height: wp(45), justifyContent: 'center', alignItems: 'center', borderRadius: wp(23) },
    btnSelectDetail: { backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: '#0f0f0f' },
    btnNotSelectDetail: { backgroundColor: '#d6d8e5', borderRadius: 10, borderWidth: 1, borderColor: '#585f7d' },
    btnBuy: { backgroundColor: colors.white, borderRadius: 8, borderWidth: 1, borderColor: colors.blue, marginHorizontal: wp(28) }
})
export default productDetailScreen