import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from '../../styles/styles';
import { Header, TabButtonbar } from '../../components';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import { Card, Image } from 'react-native-elements';
import normalize from '../../function/normalize';
import Icon from 'react-native-vector-icons/Ionicons'
import { hp, widthPercent, wp } from '../../function/screen';
import Carousel from 'react-native-snap-carousel';
import dummyNews from '../../data/dummyNews'
import moment from 'moment';
const newsScreen = ({ navigation }) => {
    useEffect(() => {

    }, [widthPercent])
    const [selected, setSelected] = useState()
    const selectedHandle = (index) => {
        setSelected(index)
    }
    const value = [
        'ทั้งหมด', 'เกมส์', 'ดนตรี', 'ROV', 'Point Bank'
    ]
    const testvalue = ['test1', 'test2', 'test2', 'test2', 'test2', 'test2']
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
                            วันที่โพสต์ { moment(itemdata.item.create).format('D MMM YYYY')}
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
    const Content = () => {
        return (
            <View>
                <TabButtonbar
                    value={value.map((item) => item)}
                    containerStyle={[{ marginVertical: hp(25), paddingHorizontal: wp(20), flex: 1 }]}
                    activeTextStyles={[{ color: '#FFF', }]}
                    textStyles={[{ color: '#FFF' }]}
                    selectedIndex={selected}
                    onTabPress={selectedHandle} />
                <View style={[styles.container, { marginTop: 20, flex: 1 }]}>
                    <View style={{ flex: 1 }} >
                        <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                            <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>
                                ข่าวที่น่าสนใจ
                            </Text>
                            <Text style={[fontStyles.Medium17, { color: colors.yellow, textDecorationLine: 'underline' }]}>
                                ดูทั้งหมด
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
                    <View>
                        <View style={[styles.flexRow, { justifyContent: 'space-between', marginTop: 20 }]}>
                            <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>
                                อีเวนต์ที่น่าสนใจ
                            </Text>
                            <Text style={[fontStyles.Medium17, { color: colors.yellow, textDecorationLine: 'underline' }]}>
                                ดูทั้งหมด
                            </Text>
                        </View>
                        <Carousel

                            data={dummyNews.filter(state => state.type === 'event')}
                            renderItem={renderItem}
                            sliderWidth={widthPercent(1)}
                            itemWidth={wp(286)}
                            activeSlideAlignment='start'
                            slideStyle={[{ padding: 0 }]}
                        />
                    </View>
                    <View>
                        <View style={[styles.flexRow, { justifyContent: 'space-between', marginTop: 20 }]}>
                            <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>
                                อื่นๆ
                            </Text>

                        </View>
                        <FlatList
                            data={dummyNews}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}

                        />

                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                onPress={() => navigation.pop()}
                title='ข่าวและอีเวนต์'
                backgroundStyle={{ backgroundColor: colors.darkGreyBlue2 }}
            />

            <FlatList
                style={{ marginBottom: hp(30) }}
                ListHeaderComponent={Content}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
}
export default newsScreen;