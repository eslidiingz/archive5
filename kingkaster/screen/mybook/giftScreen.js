import moment from 'moment';
import React from 'react';
import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Header } from '../../components';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons'
import normalize from '../../function/normalize';
import { Button } from 'react-native-elements';
const giftScreen = ({ navigation }) => {
    const dummydata = [{
        id: 1,
        title: 'สอนวิธีแคสเกมด้วยมือถือ',
        location: 'Sukhumvit, Bangkok',
        date: new Date(),
    }, {
        id: 2,
        title: 'Broardcast Studio',
        location: 'Sukhumvit, Bangkok',
        date: new Date(),
    }]
    const renderItem = (itemData) => {
        return (
            <View style={pageStyle.contentBox}>
                <View style={{ paddingTop: hp(16), paddingBottom: hp(25) }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                        <View style={{ marginRight: wp(20) }}>
                            <ImageBackground
                                source={require('../../assets/img/learning.png')}
                                imageStyle={{
                                    borderRadius: 12
                                }}
                                style={{
                                    height: hp(86),
                                    width: wp(120),
                                    resizeMode: "cover",
                                    borderRadius: 12
                                }}
                            >
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={[{ flex: 1, justifyContent: 'flex-end', marginBottom: hp(5), marginLeft: 12 }]}>
                                        <Image
                                            resizeMode='cover'
                                            source={require('../../assets/img/creator.png')}
                                            style={{ width: wp(21), height: wp(21), zIndex: 1 }}
                                        />
                                    </View>
                                    <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                                        <View style={[pageStyle.price, { marginTop: hp(25) }]}>
                                            <Text style={[fontStyles.Medium10, { color: colors.white }]}>
                                                FREE
                                                </Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[fontStyles.Medium20, { color: colors.white }]} numberOfLines={2}>{itemData.item.title}</Text>
                            <View style={[styles.flexRow]} >
                                <Icon name='calendar' size={normalize(12)} color={'#FFF'} />
                                <Text style={[fontStyles.Regular15, { color: colors.white, marginLeft: 5 }]}>{moment(itemData.item.date).format('DD MMM YYYY')}</Text>
                            </View>
                            <View style={[styles.flexRow]} >
                                <Icon name='md-location-sharp' size={normalize(12)} color={'#FFF'} />
                                <Text style={[fontStyles.Regular12, { color: colors.white, marginLeft: 5 }]}>{itemData.item.location}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Button
                            title={'รับตั๋ว'}
                            containerStyle={{ width: wp(200) }}
                            buttonStyle={{ backgroundColor: colors.success, borderRadius: 8 }}
                            titleStyle={[fontStyles.Medium18]}
                        />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.screen,]}>
            <Header
                onPress={() => navigation.navigate('MyBook')}
                title='ของขวัญจากเพื่อน'
                backgroundStyle={{ backgroundColor: colors.darkGreyBlue2, }}
            />
            <View style={[styles.container, { paddingVertical: 15, flex: 1 }]}>
                <FlatList
                    data={dummydata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    price: { backgroundColor: colors.red, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, maxHeight: wp(50), marginTop: hp(65), paddingHorizontal: wp(5), right: 0 },
    contentBox: {
        backgroundColor: colors.darkGreyBlue1,
        borderRadius: 8,
        paddingHorizontal: wp(20),
        marginBottom: hp(15),
        borderWidth: 2,
        borderColor: '#252949',
    }
});
export default giftScreen