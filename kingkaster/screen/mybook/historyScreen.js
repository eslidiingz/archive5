import moment from 'moment';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Header } from '../../components';
import { hp, wp } from '../../function/screen';
import colors from '../../styles/colors';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';

const historyScreen = ({ navigation }) => {
    const dummydata = [{
        id: 1,
        title: 'Learning Center',
        description: 'สอนวิธีแคสเกมด้วยมือถือ',
        timestamp: new Date(),
        status: {
            type: 1,
            title: 'สำเร็จ'
        }
    }, {
        id: 2,
        title: 'Broardcast Studio',
        description: 'สอนวิธีแคสเกมด้วยมือถือ',
        timestamp: new Date(),
        status: {
            type: 2,
            title: 'ส่งให้เพื่อน'
        }
    }, {
        id: 3,
        title: 'Learning Center',
        description: 'สอนวิธีแคสเกมด้วยมือถือ',
        timestamp: new Date(),
        status: {
            type: 1,
            title: 'สำเร็จ'
        }
    }, {
        id: 4,
        title: 'Broardcast Studio',
        description: 'สอนวิธีแคสเกมด้วยมือถือ',
        timestamp: new Date(),
        status: {
            type: 0,
            title: 'ยกเลิก'
        }
    }, {
        id: 5,
        title: 'Learning Center',
        description: 'สอนวิธีแคสเกมด้วยมือถือ',
        timestamp: new Date(),
        status: {
            type: 1,
            title: 'สำเร็จ'
        }
    }, {
        id: 6,
        title: 'Broardcast Studio',
        description: 'สอนวิธีแคสเกมด้วยมือถือ',
        timestamp: new Date(),
        status: {
            type: 0,
            title: 'ยกเลิก'
        }
    }]
    const renderItem = (itemData) => {
        const statusColor =
            itemData.item.status.type == 1 ? colors.success : null ||
                itemData.item.status.type == 2 ? colors.blue : null ||
                    itemData.item.status.type == 0 ? colors.red : null
        return (
            <View style={pageStyle.contentBox}>
                <View style={{ paddingTop: hp(16) }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 15, justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[fontStyles.Medium17, { color: colors.white }]}>{itemData.item.title}</Text>
                            <View >
                                <Text style={[fontStyles.Regular17, { color: colors.white }]}>{itemData.item.description}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[fontStyles.Regular15, { color: colors.gray }]}>{moment(itemData.item.timestamp).format('DD/MM/YYYY')}</Text>
                            <View >
                                <Text style={[fontStyles.Regular17, { color: statusColor }]}>{itemData.item.status.title}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.screen,]}>
            <Header
                onPress={() => navigation.navigate('MyBook')}
                title='ประวัติการจอง'
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
    contentBox: {
        backgroundColor: colors.dark,
        borderRadius: 8,
        paddingHorizontal: wp(20),
        marginBottom: hp(15),
        borderWidth: 2,
        borderColor: '#252949',
    }
});
export default historyScreen