import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Button, Card, Divider, Image } from 'react-native-elements';
import { Header, IconApp } from '../../components';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import styles from '../../styles/styles';
import Line from '../../assets/icon/Line';
import Svg, { Circle } from 'react-native-svg';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import fontStyles from '../../styles/fontStyles';
import Icon from 'react-native-vector-icons/Ionicons'
import normalize from '../../function/normalize';
import StampUse from '../../assets/icon/stamp_use';
const myBookScreen = ({ navigation }) => {
    const dummyData = ['', '', '', '']
    const [activeSlide, setActiveSlide] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const TopComponent = () => {
        return (
            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                <View >
                    <Svg height={wp(50)} width={wp(40)} viewBox="50 50 100 100" >
                        <Circle
                            cx={50}
                            cy={50}
                            r={50}
                            fill={colors.background}
                            stroke='#ffd600'
                            strokeWidth="0.2"
                        />
                    </Svg>
                </View>
                <View >
                    <Svg height={wp(50)} width={wp(40)} viewBox="-50 50 100 100" >
                        <Circle
                            cx={50}
                            cy={50}
                            r={50}
                            fill={colors.background}
                            stroke='#ffd600'
                            strokeWidth="0.2"
                        />
                    </Svg>
                </View>
            </View>
        )
    }
    const LineComponent = () => {
        return (
            <View style={[styles.flexRow, { justifyContent: 'space-around' }]}>
                <View >
                    <Svg height={wp(50)} width={wp(40)} viewBox="50 0 100 100" >
                        <Circle
                            cx={50}
                            cy={50}
                            r={50}
                            fill={colors.background}
                            stroke='#ffd600'
                            strokeWidth="0.2"
                        />
                    </Svg>
                </View>
                <Line width={wp(280)} height={1} />
                <View >
                    <Svg height={wp(50)} width={wp(40)} viewBox="-50 0 100 100" >
                        <Circle
                            cx={50}
                            cy={50}
                            r={50}
                            fill={colors.background}
                            stroke='#ffd600'
                            strokeWidth="0.2"
                        />
                    </Svg>
                </View>
            </View>
        )
    }
    const renderItem = (itemData) => {
        return (
            <Card
                containerStyle={[
                    {
                        marginTop: hp(86),
                        borderWidth: 0,
                        borderColor: null,
                        padding: 0,
                        width: wp(328),
                        height: hp(530),
                        borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8,
                    }
                ]}
                wrapperStyle={{ flex: 1 }}
            >
                <TopComponent />
                <View style={{ alignItems: 'center', marginTop: -hp(120), borderRadius: 12 }}>
                    <ImageBackground
                        source={require('../../assets/img/learning.png')}
                        imageStyle={{
                            borderRadius: 12
                        }}
                        style={{

                            height: hp(200),
                            width: wp(275),
                            resizeMode: "cover",
                            borderRadius: 12

                        }}
                    >
                        {
                            itemData.index == 3 ?
                                <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.76)' }]}>
                                    <View style={{ position: 'absolute' }}>
                                        <StampUse
                                            width={wp(120)}
                                            height={hp(120)}
                                        />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={[{ flex: 1, justifyContent: 'flex-end', marginBottom: 12, marginLeft: 12, opacity: 0.6 }]}>
                                            <Image
                                                resizeMode='cover'
                                                source={require('../../assets/img/creator.png')}
                                                style={{ width: wp(50), height: wp(50) }}
                                            />
                                        </View>
                                        <View style={[{ flex: 1, alignItems: 'flex-end', opacity: 0.6 }]}>
                                            <View style={[pageStyle.price, { marginTop: hp(25) }]}>
                                                <Text style={[fontStyles.Medium20, { color: colors.white }]}>
                                                    FREE
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={[{ flex: 1, }]}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={[{ flex: 1, justifyContent: 'flex-end', marginBottom: 12, marginLeft: 12 }]}>
                                            <Image
                                                resizeMode='cover'
                                                source={require('../../assets/img/creator.png')}
                                                style={{ width: wp(50), height: wp(50), zIndex: 1 }}
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

                        }



                    </ImageBackground>

                </View>
                <View style={[{ flex: 1, paddingLeft: wp(30) }]}>
                    <Text style={[fontStyles.Medium17]} numberOfLines={1}>
                        สอนวิธีแคสเกมด้วยมือถือ
                    </Text>
                    <Text style={[fontStyles.Regular12, { color: colors.dark, marginBottom: hp(17) }]} numberOfLines={1}>
                        <Text style={{ color: colors.success }}>199 </Text>จ่ายเงินแล้ว   | <Text style={{ color: colors.success }}>30 </Text>จองแล้ว | <Text style={{ color: colors.success }}>329 </Text>ชื่นชอบ
                    </Text>
                    <Text style={[fontStyles.Regular12, { color: colors.dark }]}>
                        <Icon name='calendar' size={normalize(12)} /> Apr 12, 2021 (09:00-18:00)
                    </Text>
                    <Text style={[fontStyles.Regular12, { color: colors.dark }]}>
                        <Icon name='md-location-sharp' size={normalize(12)} /> สุขุมวิท, กรุงเทพมหานคร
                    </Text>
                </View>
                <LineComponent />

                <View style={[{ flex: 1, flexGrow: 0.9, alignItems: 'center', justifyContent: 'space-between', paddingBottom: hp(22), marginTop: -hp(20) }]}>
                    {
                        itemData.index == 0 ?
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Image
                                        source={require('../../assets/img/qrcode.png')}
                                        style={{ width: hp(85), height: hp(85) }}
                                    />
                                </TouchableOpacity>
                                <Button
                                    title='ส่งของขวัญให้เพื่อน'
                                    titleStyle={[fontStyles.Regular16, { color: colors.success }]}
                                    buttonStyle={{
                                        borderRadius: 8,
                                        backgroundColor: colors.white,
                                        width: wp(250),
                                        paddingVertical: hp(5),
                                        borderWidth: 1,
                                        borderColor: colors.success
                                    }}
                                />

                                <Text style={[fontStyles.Medium15, { color: colors.blue, textDecorationLine: 'underline' }]}>
                                    รายละเอียด
                                </Text>
                            </View>
                            : null ||
                                itemData.index == 1 ?
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Button
                                        title='รอชำระเงิน'
                                        titleStyle={[fontStyles.Regular16]}
                                        buttonStyle={{
                                            borderRadius: 8,
                                            backgroundColor: colors.yellow,
                                            width: wp(250),
                                            paddingVertical: hp(10)
                                        }}
                                    />
                                    <Text style={[fontStyles.Medium15, { color: colors.blue, textDecorationLine: 'underline' }]}>
                                        รายละเอียด
                                    </Text>
                                </View>
                                : null ||
                                    itemData.index == 2 ?
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                                        <Text style={[fontStyles.Regular18]}>
                                            คุณได้ส่งของขวัญให้เพื่อน
                                        </Text>
                                        <View style={[{ width: wp(328), height: hp(111), backgroundColor: '#ecfaf2', justifyContent: 'center', alignItems: 'center' }]}>
                                            <Image
                                                source={require('../../assets/img/ice.png')}
                                                style={{ width: hp(45), height: hp(45), borderRadius: hp(24) }}
                                            />
                                            <Text style={[fontStyles.Medium15]}>
                                                BabyIce Charee
                                            </Text>
                                            <Text style={[fontStyles.Regular10, { color: '#989898' }]}>
                                                12/01/2021 12:28
                                            </Text>
                                        </View>
                                    </View>
                                    : null ||
                                        itemData.index == 3 ?
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                                            <Image
                                                source={require('../../assets/img/qrcode.png')}
                                                style={{ width: hp(85), height: hp(85) }}
                                            />
                                            <Text style={[fontStyles.Medium15, { color: colors.blue, textDecorationLine: 'underline' }]}>
                                                รายละเอียด
                                            </Text>
                                        </View>
                                        : null
                    }


                </View>
            </Card>
        )
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
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                title='การจองของฉัน'
                rightShow={true}
                left={
                    <TouchableOpacity onPress={()=> navigation.navigate('giftBook')}>
                        <Icon name='gift-outline' size={wp(25)} color={'#FFF'} />
                    </TouchableOpacity>

                }
                right={
                    <TouchableOpacity onPress={() => navigation.navigate('historyBook')}>
                        <IconApp name='history' width={wp(25)} height={hp(25)} />
                    </TouchableOpacity>
                }
            />
            <View style={[{ alignItems: 'center', paddingBottom: hp(16) }]}>
                <Carousel
                    data={dummyData}
                    renderItem={renderItem}
                    sliderWidth={wp(414)}
                    itemWidth={wp(362)}
                    layout={'default'}
                    activeSlideAlignment='center'
                    inactiveSlideScale={1.1}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
                <PaginationDot />
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[pageStyle.centeredView]}>
                        <Image
                            source={require('../../assets/img/qrcode.png')}
                            style={{ width: wp(340), height: hp(375) }}
                            resizeMode='cover'
                        />
                    </View>
                </TouchableWithoutFeedback>


            </Modal>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    price: { backgroundColor: colors.red, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(90), maxHeight: wp(50), marginTop: hp(65), paddingLeft: wp(10) },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },

})
export default myBookScreen