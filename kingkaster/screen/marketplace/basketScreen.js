import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useWindowDimensions, View, FlatList, Text, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../components'
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles'

const basketScreen = ({ navigation, route }) => {
    const { from,tab } = route.params
    console.log( route.params)
    const dispatch = useDispatch()
    const layout = useWindowDimensions();
    const cartList = useSelector(state => state.marketplace.cart)
    const [myCartShow, setMyCartShow] = useState([])
    const [index, setIndex] = useState(tab == 'basket' ? 0 : 1);
    const [routes] = useState([
        { key: 'first', title: 'ตะกร้าของคุณ' },
        { key: 'second', title: 'คุณชื่นชอบ' },

    ]);
    const storeCart = async () => {
        if (from === 'add_cart') {
            await AsyncStorage.setItem('storeCartProduct', JSON.stringify(cartList))
        }

        try {
            const value = await AsyncStorage.getItem('storeCartProduct')
            setMyCartShow(JSON.parse(value))
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {

        storeCart()
    }, [dispatch])

    const FirstRoute = () => {
        const dummydata = [{
            id: 1,
            title: 'สอนวิธีแคสเกมด้วยมือถือ',
            type: 'Learing',
            timestamp: new Date()
        }, {
            id: 2,
            title: 'เจ้าหน้าที่ได้ยืนยันการเติมเงินของคุณแล้ว',
            type: 'ยืนยันการเติมเงิน',
            timestamp: new Date()
        }, {
            id: 3,
            title: 'กรุณาชำระเงิน เหลือเวลาอีก 1 ชม.',
            type: 'รอการชำระเงิน',
            timestamp: new Date()
        }, {
            id: 4,
            title: 'New!  เปิดแล้ว สตรีมมิ่งเกมส์แบบใหม่ล่าสุด เต..',
            type: 'ข่าวสาร',
            timestamp: new Date()
        }, {
            id: 5,
            title: 'สินค้ามาใหม่ เสื้อยืดลิมิตเต็ด สามารถสั่งซื้อได้แ....',
            type: 'สินค้า',
            timestamp: new Date()
        }, {
            id: 6,
            title: 'กรุณาชำระเงิน เหลือเวลาอีก 1 ชม.',
            type: 'รอการชำระเงิน',
            timestamp: new Date()
        }]
        const renderItem = (itemData) => {
            return (
                <View>
                    <View style={pageStyle.contentBox}>
                        <View style={[styles.flexRow]}>
                            <View style={{ flex: 2 }} >
                                <View style={[{ borderRadius: 8, width: wp(88), height: wp(88), backgroundColor: '#575e80', justifyContent: 'center', alignItems: 'center' }]}>
                                    <View>
                                        <Image
                                            source={require('../../assets/img/t-shirt.png')}
                                            style={[{ width: wp(62), height: wp(75), resizeMode: 'cover'}]}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={[fontStyles.Regular17, { color: colors.white }]}>{itemData.item.detail.title}</Text>
                                <View >
                                    <Text style={[fontStyles.Regular17, { color: '#fff395' }]}>{itemData.item.type}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            )
        }
        return (
            <View style={[{ paddingVertical: 15 }]}>
                <FlatList
                    data={myCartShow}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
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
    const renderTabBar = props => (
        <TabBar
            {...props}
            tabStyle={{ width: wp(207) }}
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

    });
    return (
        <SafeAreaView style={[styles.screen]}>
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
        paddingHorizontal: wp(20),
        paddingTop: hp(15),
        marginBottom: hp(15)
    }
});
export default basketScreen