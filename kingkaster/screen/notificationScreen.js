import React, { useState } from 'react';
import { Modal, PixelRatio, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions, StyleSheet, FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { hp, wp } from '../function/screen';
import fontStyles from '../styles/fontStyles';
import styles from '../styles/styles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import { Header } from '../components';
const notificationScreen = ({ navigation }) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'ทั้งหมด' },
        { key: 'second', title: 'การเงิน' },
        { key: 'third', title: 'ข่าวสาร' },
        { key: 'fourth', title: 'สินค้า' },
    ]);

    const FirstRoute = () => {
        const dummydata = [{
            id: 1,
            title: 'สอนวิธีแคสเกมด้วยมือถือ',
            type: 'Learing',
            press: 'learningBooking',
            timestamp: new Date()
        }, {
            id: 2,
            title: 'เจ้าหน้าที่ได้ยืนยันการเติมเงินของคุณแล้ว',
            type: 'ยืนยันการเติมเงิน',
            press: 'basket',
            timestamp: new Date()
        }, {
            id: 3,
            title: 'กรุณาชำระเงิน เหลือเวลาอีก 1 ชม.',
            type: 'รอการชำระเงิน',
            press: 'basket',
            timestamp: new Date()
        }, {
            id: 4,
            title: 'New!  เปิดแล้ว สตรีมมิ่งเกมส์แบบใหม่ล่าสุด เต..',
            type: 'ข่าวสาร',
            press: 'NewsDetailScreen',
            timestamp: new Date()
        }, {
            id: 5,
            title: 'สินค้ามาใหม่ เสื้อยืดลิมิตเต็ด สามารถสั่งซื้อได้แ....',
            type: 'สินค้า',
            press: 'basket',
            timestamp: new Date()
        }, {
            id: 6,
            title: 'กรุณาชำระเงิน เหลือเวลาอีก 1 ชม.',
            type: 'รอการชำระเงิน',
            press: 'basket',
            timestamp: new Date()
        }]
        const renderItem = (itemData) => {
            return (
                <View>
                    <Text style={[fontStyles.Regular15, { color: '#868686' }]}>
                        {
                            moment(itemData.item.timestamp).format('DD/MM/YYYY HH:mm')
                        }
                    </Text>
                    <TouchableOpacity onPress={()=>  navigation.navigate(itemData.item.press, itemData.item.press == 'basket' ? { from: 'navigate',tab:'basket' } : null || itemData.item.press == 'NewsDetailScreen' ? { id: 1 } : null)} style={pageStyle.contentBox}>
                        <View style={{ paddingTop: hp(16) }}>
                            <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[fontStyles.Regular17, { color: colors.white }]}>{itemData.item.title}</Text>
                                    <View >
                                        <Text style={[fontStyles.Regular17, { color: '#fff395' }]}>{itemData.item.type}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            )
        }
        return (
            <View style={[styles.container, { paddingVertical: 15 }]}>
                <FlatList
                    data={dummydata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        )
    }
    const SecondRoute = () => {
        return (
            <View>
                <Text>
                    1
                </Text>
            </View>
        )
    }
    const ThirdRoute = () => {
        return (
            <View>
                <Text>
                    1
                </Text>
            </View>
        )
    }
    const FourthRoute = () => {
        return (
            <View>
                <Text>
                    1
                </Text>
            </View>
        )
    }
    const renderTabBar = props => (
        <TabBar
            {...props}
            tabStyle={{ width: wp(120) }}
            indicatorStyle={{ backgroundColor: colors.yellow }}
            style={{ backgroundColor: colors.darkGreyBlue2, }}
            activeColor={colors.yellow}
            labelStyle={[fontStyles.Regular18]}
            scrollEnabled={true}
        />
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
    });
    return (
        <SafeAreaView style={[styles.screen,]}>
            <Header
                onPress={() => navigation.pop()}
                title='แจ้งเตือน'
                backgroundStyle={{ backgroundColor: colors.darkGreyBlue2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            />
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width, }}
            />

        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    contentBox: {
        backgroundColor: colors.darkGreyBlue1,
        borderRadius: 8,
        paddingLeft: wp(20),
        marginBottom: hp(15)
    }
});
export default notificationScreen