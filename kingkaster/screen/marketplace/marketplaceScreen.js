import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { Header, IconApp, Rating } from '../../components';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import fontStyles from '../../styles/fontStyles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux'
import { favorite_cart } from '../../store/actions/marketplace'
import normalize from '../../function/normalize';
import dummyProduct from '../../data/dummyProduct'
import AsyncStorage from '@react-native-async-storage/async-storage';
const marketplaceScreen = ({ navigation }) => {

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

    const Content = () => {
        const [activeSlide, setActiveSlide] = useState(0)
        const [ratingCount] = useState(5)
        const [startValue] = useState(4)
        const dispatch = useDispatch()
        const favoriteList = useSelector(state => state.marketplace.favoriteProduct)
        const favoriteListDetail = useSelector(state => state.marketplace.favList)
        const storeFavorite = async () => {
            await AsyncStorage.setItem('storeFavoriteProduct', JSON.stringify(favoriteListDetail))
            try {
                const value = await AsyncStorage.getItem('storeFavoriteProduct')

            } catch (e) {
                // error reading value
            }
        }
        useEffect(() => {
            storeFavorite()
        }, [dispatch, favoriteList])
        const PaginationDot = () => {
            return (
                <Pagination
                    dotsLength={dummyData.length}
                    activeDotIndex={activeSlide}
                    dotStyle={{
                        width: wp(20),
                        height: wp(6),
                        borderRadius: 6,
                        marginHorizontal: -wp(15),
                        backgroundColor: colors.white
                    }}
                    inactiveDotStyle={{
                        width: wp(15),
                        height: wp(6),
                        borderRadius: 6,
                        marginHorizontal: -wp(15),
                        backgroundColor: '#989898'
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            );
        }
        const renderItem = (itemData) => {
            return (
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <Image
                        source={require('../../assets/img/market.png')}
                        style={{ height: hp(180), maxHeight: hp(180), maxWidth: wp(414), resizeMode: 'cover'}}
                    />
                </TouchableOpacity>
            )
        }
        const renderInterest = (itemData) => {

            const fav = favoriteList.find(state => state.favorite_id == itemData.item.id)
            return (
                <TouchableOpacity onPress={() => navigation.navigate('productDetail', { product_id: itemData.item.id })}>
                    <View style={[pageStyle.containercard]}>
                        <View style={[pageStyle.containerimg, {}]}>
                            <View style={[{ alignSelf: 'flex-end' }]}>
                                <TouchableOpacity onPress={
                                    async () => {
                                        try {
                                            await dispatch(favorite_cart(itemData.item.id))

                                        } catch (e) {
                                            console.log(e.message)
                                        }
                                    }
                                }
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {
                                        fav == undefined ?
                                            <View style={[pageStyle.buttonFav, { borderColor: colors.white }]}>
                                                <IconMaterial name='favorite-outline' size={wp(17)} color={colors.white} />
                                            </View>
                                            :
                                            <View style={[pageStyle.buttonFav, { borderColor: colors.red }]}>
                                                <IconMaterial name='favorite' size={wp(17)} color={colors.red} />
                                            </View>
                                    }
                                </TouchableOpacity>

                            </View>
                            <Image
                                source={require('../../assets/img/t-shirt.png')}
                                style={{
                                    marginTop: -hp(30),
                                    maxWidth: hp(110),
                                    maxHeight: hp(140),
                                    resizeMode: 'cover'
                                }}
                            />
                        </View>
                        <View style={[{ marginTop: hp(10), marginBottom: hp(20), paddingHorizontal: wp(20) }]}>
                            <Text style={[fontStyles.Medium12, { color: colors.white }]} numberOfLines={2}>
                                {itemData.item.title}
                            </Text>
                            <Text style={[fontStyles.Medium16, { color: colors.success, marginBottom: hp(5) }]} numberOfLines={1}>
                                {itemData.item.real_price} KK
                            </Text>
                            <Rating count={5} rating={itemData.item.rating} />
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View
                style={[styles.container, { marginTop: hp(20), paddingBottom: hp(100), flex: 1 }]}
            >
                <View >
                    <Input
                        placeholder='ค้นหาสินค้า'
                        containerStyle={{ paddingHorizontal: 0 }}
                        inputContainerStyle={[{ borderRadius: 12, height: hp(60),  paddingRight: 0,backgroundColor: '#FFF', paddingLeft: wp(17) }]}
                        inputStyle={[fontStyles.Regular16, { paddingLeft: wp(15), height: hp(60), marginRight: 0 }]}
                        placeholderTextColor='#24284b'
                        rightIconContainerStyle={{paddingRight:0,}}
                        leftIcon={<Icon name='search' size={wp(25)} color={'#24284b'} />}
                        rightIcon={
                            <Button
                                title='ค้นหา'

                                containerStyle={{ borderRadius: 12, width: wp(70), height: hp(60), marginRight: 0, paddingRight: 0 }}
                                
                                buttonStyle={{ borderRadius: 12, backgroundColor: colors.blue, height: '100%',margin: 0 }}

                            />
                        }
                    />
                </View>
                <View style={[{ flex: 1, alignItems: 'center' }]}>
                    <Carousel
                        activeSlideAlignment='center'
                        data={dummyData}
                        renderItem={renderItem}
                        sliderWidth={wp(414)}
                        itemWidth={wp(414)}
                        inactiveSlideScale={1}
                        onSnapToItem={(index) => setActiveSlide(index)}
                    />

                </View>
                <View style={{ flex: 1,zIndex:5,marginTop:-hp(55) }}>
                    <PaginationDot />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[fontStyles.Medium18, { color: colors.white, marginBottom: hp(20) }]}>
                        สินค้าแนะนำ
                    </Text>
                    <FlatList
                        data={dummyProduct}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        renderItem={renderInterest}
                        showsHorizontalScrollIndicator={false}
                    />
                    <Text style={[fontStyles.Medium18, { color: colors.white, marginBottom: hp(20) }]}>
                        สินค้า
                    </Text>
                    <FlatList
                        data={dummyProduct}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        renderItem={renderInterest}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                title='มาร์เก็ตเพลส'
                leftShow={false}
                rightShow={true}
                right={
                    <IconApp name='waiting' width={wp(25)} height={wp(25)} />
                }
            />
            <FlatList
                data={[]}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={
                    Content
                }
            />
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    price: { backgroundColor: colors.red, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(90), maxHeight: wp(50), marginTop: hp(65), paddingLeft: wp(10) },
    containercard: { width: hp(172), backgroundColor: '#202433', marginHorizontal: 10, alignItems: 'center', borderRadius: 15 },
    containerimg: { width: hp(164), height: hp(164), paddingHorizontal: 5, marginHorizontal: 5, alignItems: 'center', marginTop: hp(4), borderRadius: 15, backgroundColor: '#575e80', justifyContent: 'center' },
    buttonFav: { width: wp(24), height: wp(24), borderWidth: 1, borderRadius: wp(12), borderColor: colors.white, alignItems: 'center', justifyContent: 'center' }
})
export default marketplaceScreen