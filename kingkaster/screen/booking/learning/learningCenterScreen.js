import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, View, Image, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Header, TabButtonbar } from '../../../components';
import { hp, widthPercent, wp } from '../../../function/screen';
import colors from '../../../styles/colors';
import fontStyles from '../../../styles/fontStyles';
import styles from '../../../styles/styles';

const learningCenterScreen = ({ navigation }) => {
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
    const value = [
        'ทั้งหมด', 'เกมส์', 'ดนตรี', 'ROV', 'Point Bank'
    ]


    const ContentThatGoesAboveTheFlatList = () => {
        const [selected, setSelected] = useState()
        const [activeSlide, setActiveSlide] = useState(0)
        const selectedHandle = (index) => {
            setSelected(index)
        }
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
                        backgroundColor: colors.red
                    }}
                    inactiveDotStyle={{
                        width: wp(15),
                        height: wp(6),
                        borderRadius: 6,
                        marginHorizontal: -wp(15),
                        backgroundColor: '#e5e5e5'
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            );
        }
        const renderItem = (itemData) => {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('learningBooking')}
                >
                    <ImageBackground
                        source={require('../../../assets/img/learning.png')}
                        style={{
                            height: hp(300),
                            maxHeight: hp(300),
                            flex: 1,
                            resizeMode: "cover",
                        }}
                    >
                        <View style={[{ flex: 1, flexDirection: 'row' }]}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: wp(20), marginBottom: hp(12) }}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../../../assets/img/creator.png')}
                                    style={{ width: wp(70), height: wp(70), zIndex: 1 }}
                                />
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

                    </ImageBackground>
                </TouchableOpacity>



            )
        }
        const renderItemCoach = (itemData) => {
            return (
                <View style={[{
                    marginHorizontal: wp(4),
                    alignItems: 'center',
                    top: -hp(50)
                }]}>
                    <Image
                        resizeMode='cover'
                        source={require('../../../assets/img/creator.png')}
                        style={{ width: wp(70), height: wp(70), zIndex: 1, top: hp(50) }}
                    />
                    <View style={[
                        {
                            width: wp(140),
                            height: wp(105),
                            borderRadius: 18,
                            backgroundColor: colors.darkGreyBlue1,
                            paddingTop: hp(50),
                            alignItems: 'center'
                        }
                    ]}>
                        <Text style={[fontStyles.Medium16, { color: colors.white, textAlign: 'center' }]} numberOfLines={2}>
                            พี่เอก {'\n'}ฮาร์ทร็อกเกอร์
                        </Text>
                    </View>
                </View>
            )
        }
        const renderItemRecommend = (itemData) => {
            return (
                <View style={[
                    {
                        width: wp(330),
                        height: hp(280),
                        borderRadius: 12,
                        marginHorizontal: wp(8)
                    }
                ]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('learningBooking')}
                        style={{ flex: 1 }}
                    >
                        <View style={[
                            {
                                zIndex: 2,
                                flex: 1,
                                borderTopLeftRadius: 12, paddingTop: 5
                            }
                        ]}>
                            <ImageBackground
                                source={require('../../../assets/img/learning.png')}
                                imageStyle={{
                                    borderRadius: 12
                                }}
                                style={{
                                    height: hp(180),
                                    maxHeight: hp(180),

                                    resizeMode: "cover",

                                }}
                                resizeMode='cover'
                            >
                                <View style={[{ flex: 1 }]}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch' }}>
                                        <View style={[{ flex: 1, justifyContent: 'flex-end', marginBottom: 12, marginLeft: 12 }]}>
                                            <Image
                                                resizeMode='cover'
                                                source={require('../../../assets/img/creator.png')}
                                                style={{ width: wp(70), height: wp(70), zIndex: 1 }}
                                            />
                                        </View>
                                        <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                                            <View style={[pageStyle.price, { marginTop: hp(25) }]}>
                                                <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                                                    FREE
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={[{
                            zIndex: 1,
                            backgroundColor: '#FFF',
                            width: wp(330),
                            height: hp(140),

                            borderBottomRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            justifyContent: 'flex-end',
                            paddingLeft: wp(20)
                        }]}>
                            <Text style={[fontStyles.Medium16, { color: colors.dark, }]}>
                                Game Caster สร้างรายได้จำนวน...
                            </Text>
                            <Text style={[fontStyles.Regular16, { color: '#989898', marginBottom: hp(13) }]}>
                                <Text style={[fontStyles.Regular16, { color: colors.success }]}>6,333</Text> เข้าร่วม
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        const renderItemOther = (itemData) => {
            return (
                <View style={[
                    {
                        width: wp(177),
                        height: hp(213),
                        borderRadius: 12,
                        marginHorizontal: wp(8)
                    }
                ]}>
                    <View style={[
                        {
                            zIndex: 2,
                            flex: 1,
                            borderTopLeftRadius: 12, paddingTop: 5
                        }
                    ]}>
                        <ImageBackground
                            source={require('../../../assets/img/learning.png')}
                            imageStyle={{
                                borderRadius: 12
                            }}
                            style={{
                                height: hp(200),
                                maxHeight: hp(200),

                                resizeMode: "cover",

                            }}
                        >
                            <View style={[{ flex: 1, }]}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={[{ flex: 1, justifyContent: 'flex-end', marginBottom: 12, marginLeft: 12 }]}>
                                        <Image
                                            resizeMode='cover'
                                            source={require('../../../assets/img/creator.png')}
                                            style={{ width: wp(70), height: wp(70), zIndex: 1 }}
                                        />
                                    </View>
                                    <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                                        <View style={[pageStyle.price, { marginTop: hp(25) }]}>
                                            <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                                                FREE
                                                </Text>


                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>


                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <Carousel
                    containerCustomStyle={{ flex: 1, marginBottom: -wp(25) }}
                    activeSlideAlignment='center'
                    data={dummyData}
                    renderItem={renderItem}
                    sliderWidth={wp(414)}
                    sliderHeight={hp(300)}
                    itemWidth={wp(414)}
                    itemHeight={hp(300)}
                    inactiveSlideScale={1}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
                <PaginationDot />
                <View style={[styles.container]} >
                    <View>
                        <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                            โค้ชที่แนะนำ
                        </Text>
                        <FlatList
                            data={dummyData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItemCoach}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View>
                        <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                            แนะนำ
                        </Text>
                        <FlatList
                            data={dummyData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItemRecommend}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <TabButtonbar
                        value={value.map((item) => item)}
                        containerStyle={[{ marginVertical: hp(25), paddingHorizontal: wp(20), flex: 1 }]}
                        activeTextStyles={[{ color: '#FFF', }]}
                        textStyles={[{ color: '#FFF' }]}
                        selectedIndex={selected}
                        onTabPress={selectedHandle} />
                    <FlatList
                        numColumns={2}

                        data={dummyData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItemOther}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header title='เลิร์นนิ่งเซ็นเตอร์' backgroundStyle={[{ backgroundColor: colors.success, zIndex: 2 }]} onPress={() => navigation.pop()} />
            <FlatList
                data={[]}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, zIndex: 1, marginTop: -hp(55), }}
                ListHeaderComponent={ContentThatGoesAboveTheFlatList}
            />
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    price: { backgroundColor: colors.red, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(90), maxHeight: wp(50), marginTop: hp(65), paddingLeft: wp(10) }
})
export default learningCenterScreen;