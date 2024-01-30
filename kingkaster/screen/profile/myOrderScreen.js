import React, { useState } from 'react'
import { Text, View, ScrollView, StyleSheet, useWindowDimensions, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import normalize from '../../function/normalize'
import styles from '../../styles/styles'
import colors from '../../styles/colors'
import fonts from '../../styles/fontStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import { Header } from '../../components'
import { hp, wp } from '../../function/screen';

const MyOrderScreen = ({ navigation }) => {

   const layout = useWindowDimensions();

   const [index, setIndex] = useState(0);
   const [routes] = useState([
      { key: 'first', title: 'ทั้งหมด' },
      { key: 'second', title: 'กำลังดำเนินการ' },
      { key: 'third', title: 'สำเร็จ' },
      { key: 'fourth', title: 'ยกเลิก' },
   ]);
   const dummydata = [{
      id: 1,
      status_title: 'กำลังดำเนินการ',
      status: 'procress'
   }, {
      id: 2,
      status_title: 'สำเร็จ',
      status: 'complete'
   }, {
      id: 3,
      status_title: 'สำเร็จ',
      status: 'complete'
   }, {
      id: 4,
      status_title: 'สำเร็จ',
      status: 'complete'
   }, {
      id: 5,
      status_title: 'กำลังดำเนินการ',
      status: 'procress'
   }, {
      id: 6,
      status_title: 'ยกเลิก',
      status: 'cancel'
   }]
   const FirstRoute = () => {

      const renderItem = (itemData) => {
         return (
            <View style={pageStyle.contentBox}>
               <Text style={[fonts.Regular15, { color: colors.white, marginBottom: 5 }]} numberOfLines={1}>
                  หมายเลขคำสั่งซื้อ 49039504950495 12/01/2021 19:19
               </Text>
               <Divider style={{ backgroundColor: '#3f4466', height: 1 }} />
               <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                     <Image
                        source={require('../../assets/img/product.png')}
                        style={{ width: normalize(70), height: normalize(70) }} />
                     <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={[fonts.Regular16, { color: colors.white }]}>KingCaster T-Shirt New Collection- 2020</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                           <Text style={[fonts.Regular16, { color: '#b1b7bc' }]}>สีดำ, S</Text>
                           <Text style={[fonts.Medium16, { color: colors.white }]}>350 KK</Text>
                        </View>
                     </View>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>ดูสินค้าอีก 1 รายการ</Text>
                  <MaterialIcons name='chevron-down' size={normalize(24)} style={{ color: '#b1b7bc' }} />
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>2 ชิ้น</Text>
                  <Text style={[fonts.Medium16, { color: '#39c379' }]}>700 KK</Text>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 0.5, borderTopColor: '#42476b', alignItems: 'center' }}>
                  <View
                     style={[
                        { alignItems: 'center', justifyContent: 'center', borderRadius: 11, paddingVertical: 3, paddingHorizontal: 10 },
                        itemData.item.status == 'procress' ? { backgroundColor: '#fff4d1' } : null ||
                           itemData.item.status == 'complete' ? { backgroundColor: '#dafcf3' } : null ||
                              itemData.item.status == 'cancel' ? { backgroundColor: '#ffd1d1' } : null
                     ]}>
                     <Text style={[
                        fonts.Medium12,
                        itemData.item.status == 'procress' ? { color: colors.yellow } : null ||
                           itemData.item.status == 'complete' ? { color: colors.success } : null ||
                              itemData.item.status == 'cancel' ? { color: colors.red } : null
                     ]}>
                        {itemData.item.status_title}
                     </Text>
                  </View>
                  <Button
                     title='ดูรายละเอียด'
                     titleStyle={fonts.Medium15}
                     buttonStyle={{ backgroundColor: colors.blue, height: 40, borderRadius: 8, paddingHorizontal: 15 }}
                  />
               </View>
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
      const renderItem = (itemData) => {
         return (
            <View style={pageStyle.contentBox}>
               <Text style={[fonts.Regular15, { color: colors.white, marginBottom: 5 }]} numberOfLines={1}>
                  หมายเลขคำสั่งซื้อ 49039504950495 12/01/2021 19:19
               </Text>
               <Divider style={{ backgroundColor: '#3f4466', height: 1 }} />
               <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                     <Image
                        source={require('../../assets/img/product.png')}
                        style={{ width: normalize(70), height: normalize(70) }} />
                     <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={[fonts.Regular16, { color: colors.white }]}>KingCaster T-Shirt New Collection- 2020</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                           <Text style={[fonts.Regular16, { color: '#b1b7bc' }]}>สีดำ, S</Text>
                           <Text style={[fonts.Medium16, { color: colors.white }]}>350 KK</Text>
                        </View>
                     </View>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>ดูสินค้าอีก 1 รายการ</Text>
                  <MaterialIcons name='chevron-down' size={normalize(24)} style={{ color: '#b1b7bc' }} />
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>2 ชิ้น</Text>
                  <Text style={[fonts.Medium16, { color: '#39c379' }]}>700 KK</Text>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 0.5, borderTopColor: '#42476b', alignItems: 'center' }}>
                  <View
                     style={[
                        { alignItems: 'center', justifyContent: 'center', borderRadius: 11, paddingVertical: 3, paddingHorizontal: 10 },
                        itemData.item.status == 'procress' ? { backgroundColor: '#fff4d1' } : null ||
                           itemData.item.status == 'complete' ? { backgroundColor: '#dafcf3' } : null ||
                              itemData.item.status == 'cancel' ? { backgroundColor: '#ffd1d1' } : null
                     ]}>
                     <Text style={[
                        fonts.Medium12,
                        itemData.item.status == 'procress' ? { color: colors.yellow } : null ||
                           itemData.item.status == 'complete' ? { color: colors.success } : null ||
                              itemData.item.status == 'cancel' ? { color: colors.red } : null
                     ]}>
                        {itemData.item.status_title}
                     </Text>
                  </View>
                  <Button
                     title='ดูรายละเอียด'
                     titleStyle={fonts.Medium15}
                     buttonStyle={{ backgroundColor: colors.blue, height: 40, borderRadius: 8, paddingHorizontal: 15 }}
                  />
               </View>
            </View>

         )
      }
      return (
         <View style={[styles.container, { paddingVertical: 15 }]}>
            <FlatList
               data={dummydata.filter(state => state.status == 'procress')}
               renderItem={renderItem}
               keyExtractor={(item) => item.id.toString()}
               showsVerticalScrollIndicator={false}
            />

         </View>
      )
   }
   const ThirdRoute = () => {
      const renderItem = (itemData) => {
         return (
            <View style={pageStyle.contentBox}>
               <Text style={[fonts.Regular15, { color: colors.white, marginBottom: 5 }]} numberOfLines={1}>
                  หมายเลขคำสั่งซื้อ 49039504950495 12/01/2021 19:19
               </Text>
               <Divider style={{ backgroundColor: '#3f4466', height: 1 }} />
               <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                     <Image
                        source={require('../../assets/img/product.png')}
                        style={{ width: normalize(70), height: normalize(70) }} />
                     <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={[fonts.Regular16, { color: colors.white }]}>KingCaster T-Shirt New Collection- 2020</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                           <Text style={[fonts.Regular16, { color: '#b1b7bc' }]}>สีดำ, S</Text>
                           <Text style={[fonts.Medium16, { color: colors.white }]}>350 KK</Text>
                        </View>
                     </View>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>ดูสินค้าอีก 1 รายการ</Text>
                  <MaterialIcons name='chevron-down' size={normalize(24)} style={{ color: '#b1b7bc' }} />
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>2 ชิ้น</Text>
                  <Text style={[fonts.Medium16, { color: '#39c379' }]}>700 KK</Text>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 0.5, borderTopColor: '#42476b', alignItems: 'center' }}>
                  <View
                     style={[
                        { alignItems: 'center', justifyContent: 'center', borderRadius: 11, paddingVertical: 3, paddingHorizontal: 10 },
                        itemData.item.status == 'procress' ? { backgroundColor: '#fff4d1' } : null ||
                           itemData.item.status == 'complete' ? { backgroundColor: '#dafcf3' } : null ||
                              itemData.item.status == 'cancel' ? { backgroundColor: '#ffd1d1' } : null
                     ]}>
                     <Text style={[
                        fonts.Medium12,
                        itemData.item.status == 'procress' ? { color: colors.yellow } : null ||
                           itemData.item.status == 'complete' ? { color: colors.success } : null ||
                              itemData.item.status == 'cancel' ? { color: colors.red } : null
                     ]}>
                        {itemData.item.status_title}
                     </Text>
                  </View>
                  <Button
                     title='ดูรายละเอียด'
                     titleStyle={fonts.Medium15}
                     buttonStyle={{ backgroundColor: colors.blue, height: 40, borderRadius: 8, paddingHorizontal: 15 }}
                  />
               </View>
            </View>

         )
      }
      return (
         <View style={[styles.container, { paddingVertical: 15 }]}>
            <FlatList
               data={dummydata.filter(state => state.status == 'complete')}
               renderItem={renderItem}
               keyExtractor={(item) => item.id.toString()}
               showsVerticalScrollIndicator={false}
            />

         </View>
      )
   }
   const FourthRoute = () => {
      const renderItem = (itemData) => {
         return (
            <View style={pageStyle.contentBox}>
               <Text style={[fonts.Regular15, { color: colors.white, marginBottom: 5 }]} numberOfLines={1}>
                  หมายเลขคำสั่งซื้อ 49039504950495 12/01/2021 19:19
               </Text>
               <Divider style={{ backgroundColor: '#3f4466', height: 1 }} />
               <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                     <Image
                        source={require('../../assets/img/product.png')}
                        style={{ width: normalize(70), height: normalize(70) }} />
                     <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={[fonts.Regular16, { color: colors.white }]}>KingCaster T-Shirt New Collection- 2020</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                           <Text style={[fonts.Regular16, { color: '#b1b7bc' }]}>สีดำ, S</Text>
                           <Text style={[fonts.Medium16, { color: colors.white }]}>350 KK</Text>
                        </View>
                     </View>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>ดูสินค้าอีก 1 รายการ</Text>
                  <MaterialIcons name='chevron-down' size={normalize(24)} style={{ color: '#b1b7bc' }} />
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#42476b' }}>
                  <Text style={[fonts.Regular16, { color: colors.white }]}>2 ชิ้น</Text>
                  <Text style={[fonts.Medium16, { color: '#39c379' }]}>700 KK</Text>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 0.5, borderTopColor: '#42476b', alignItems: 'center' }}>
                  <View
                     style={[
                        { alignItems: 'center', justifyContent: 'center', borderRadius: 11, paddingVertical: 3, paddingHorizontal: 10 },
                        itemData.item.status == 'procress' ? { backgroundColor: '#fff4d1' } : null ||
                           itemData.item.status == 'complete' ? { backgroundColor: '#dafcf3' } : null ||
                              itemData.item.status == 'cancel' ? { backgroundColor: '#ffd1d1' } : null
                     ]}>
                     <Text style={[
                        fonts.Medium12,
                        itemData.item.status == 'procress' ? { color: colors.yellow } : null ||
                           itemData.item.status == 'complete' ? { color: colors.success } : null ||
                              itemData.item.status == 'cancel' ? { color: colors.red } : null
                     ]}>
                        {itemData.item.status_title}
                     </Text>
                  </View>
                  <Button
                     title='ดูรายละเอียด'
                     titleStyle={fonts.Medium15}
                     buttonStyle={{ backgroundColor: colors.blue, height: 40, borderRadius: 8, paddingHorizontal: 15 }}
                  />
               </View>
            </View>

         )
      }
      return (
         <View style={[styles.container, { paddingVertical: 15 }]}>
            <FlatList
               data={dummydata.filter(state => state.status == 'cancel')}
               renderItem={renderItem}
               keyExtractor={(item) => item.id.toString()}
               showsVerticalScrollIndicator={false}
            />

         </View>
      )
   }
   const renderTabBar = props => (
      <TabBar
         {...props}
         tabStyle={{ width: wp(160) }}
         indicatorStyle={{ backgroundColor: colors.yellow }}
         style={{ backgroundColor: colors.darkGreyBlue2, }}
         activeColor={colors.yellow}
         scrollEnabled={true}
         renderLabel={({ route, focused, color }) => (
            <Text style={[fonts.Regular15, { color }]} numberOfLines={1}>
               {route.title + ' '}
               {
                  route.key == 'first' ? `(${dummydata.length})` : null ||
                     route.key == 'second' ? `(${dummydata.filter(state => state.status == 'procress').length})` : null ||
                        route.key == 'third' ? `(${dummydata.filter(state => state.status == 'complete').length})` : null ||
                           route.key == 'fourth' ? `(${dummydata.filter(state => state.status == 'cancel').length})` : null
               }
            </Text>
         )}

      />
   );
   const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute,
      fourth: FourthRoute,
   });
   return (
      <SafeAreaView style={styles.screen}>
         <Header
            onPress={() => navigation.pop()}
            title='การซื้อของฉัน'
            backgroundStyle={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
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
      padding: 12,
      marginBottom: 15
   }
});

export default MyOrderScreen