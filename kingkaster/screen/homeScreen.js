import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert, FlatList } from 'react-native';
import { Image, Card } from 'react-native-elements'
import styles from '../styles/styles';
import normalize from '../function/normalize';
import { hp, wp } from '../function/screen';
import fontStyles from '../styles/fontStyles';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { IconApp, Wallet } from '../components'
import 'moment/locale/th'
import { useDispatch } from 'react-redux';
import { createMonth } from '../store/actions/booking';
import dummyNews from '../data/dummyNews'

moment.locale('th')

const homeScreen = ({ navigation }) => {
   const dispatch = useDispatch()
   const [month, setMonth] = useState(moment().format('YYYY-MM-DD'))
   const [day, setDay] = useState([])
   const showDay = () => {
      if (month != null) {
         for (var i = 1; i <= moment(moment(month).format('YYYY-MM')).daysInMonth(); i++) {
            let firstday = moment(moment(month).startOf('month')).format('YYYY-MM-DD')
            let dayToAdd = moment([moment(month).format('YYYY'), 0, i]).month(parseInt(moment(month).format('M')) - 1).format("YYYY-MM-DD")
            setDay(day => [...day, dayToAdd])
         }
      }
   }
   useEffect(() => {
      showDay()
   }, [])
   const OpenURL = ({ url, title, containerStyle, buttonStyle, titleStyle }) => {
      const handlePress = useCallback(async () => {
         // Checking if the link is supported for links with custom URL scheme.
         const supported = await Linking.canOpenURL(url);

         if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
         } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
         }
      }, [url]);

      return (
         <TouchableOpacity onPress={handlePress} >
            <Image source={require('../assets/img/GTA.png')} style={[{ width: '100%', height: hp(210), borderRadius: 19 }]} PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />} placeholderStyle={{ backgroundColor: null }} />
         </TouchableOpacity>
      )
   };

   const Content = () => {
      const renderNews = (itemdata) => {
         return (
            <Card
               containerStyle={[{ backgroundColor: colors.darkGreyBlue2, borderRadius: 12, borderWidth: 0, padding: 0, marginHorizontal: 0, maxHeight: hp(120) }]}
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
                                    {' '+itemdata.item.share + ' '}
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
                           source={require('../assets/img/news.png')}
                           style={[{ width: wp(111), height: hp(120), borderBottomRightRadius: 12, borderTopRightRadius: 12 }]}
                        />
                     </View>
                  </View>
               </TouchableOpacity>
            </Card>
         )
      }
      return (
         <View style={{ marginBottom: wp(70), paddingTop: hp(15) }}>
            <View style={[styles.container, { alignItems: 'center', marginTop: normalize(11) }]}>
               <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                  <View style={[{ flex: 1 }]}>
                  </View>
                  <View style={[{ flex: 1, alignItems: 'center' }]}>
                     <Image
                        source={require('../assets/icon/logoColor.png')}
                        style={[{ width: normalize(100), height: normalize(52) }]}
                        PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                        placeholderStyle={{ backgroundColor: null }}
                     />
                  </View>
                  <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                     <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                        <IconApp name='bell' width={wp(24)} height={wp(24)} />
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
            <View style={styles.container}><Wallet /></View>
            <View style={styles.container}>
               <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                  <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>
                     การจอง
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
                     <Text style={[fontStyles.Medium17, { color: colors.yellow }]}>
                        ดูแผนที่
                     </Text>
                  </TouchableOpacity>
               </View>
               <View style={[{ marginTop: normalize(12) }]}>
                  <View style={[{ flex: 1, flexDirection: 'row' }]}>
                     <TouchableOpacity onPress={async () => {
                        try {
                           await dispatch(createMonth(day))
                        } catch (e) {
                           console.log(e.message)
                        }
                        navigation.navigate('InfluBookingScreen')
                     }
                     } style={[pageStyle.containerCardLeft, { backgroundColor: '#801fff' }]}>
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>อินฟลูเอนเซอร์</Text>
                        <View style={{ position: 'absolute', right: wp(-5), bottom: hp(-15) }}>
                           <Image
                              source={require('../assets/icon/Infu.png')}
                              style={{ width: 95, height: 105 }}
                              resizeMode="contain"
                              PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                              placeholderStyle={{ backgroundColor: null }}
                           />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={async () => {
                        try {
                           await dispatch(createMonth(day))
                        } catch (e) {
                           console.log(e.message)
                        }
                        navigation.navigate('SteamerBookingScreen')
                     }
                     } style={[pageStyle.containerCardRight, { backgroundColor: colors.blue }]}>

                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>สตรีมเมอร์</Text>
                        <Text style={[fontStyles.Medium20, { color: '#FFF', marginTop: normalize(-3) }]}>บ็อกซ์</Text>
                        <View style={{ position: 'absolute', bottom: normalize(0), right: -normalize(3) }}>
                           <Image
                              source={require('../assets/icon/streamer-box.png')}
                              style={{ width: normalize(95), height: normalize(85) }}
                              resizeMode="contain" PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                              placeholderStyle={{ backgroundColor: null }}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View

                     style={[{ flex: 1, flexDirection: 'row' }]}>
                     <TouchableOpacity onPress={async () => {
                        navigation.navigate('learningCenter', { status: false })
                     }} style={[pageStyle.containerCardLeft, { backgroundColor: '#39c379' }]}>
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>เลิร์นนิ่ง</Text>
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>เซ็นเตอร์</Text>
                        <View style={{ position: 'absolute', right: normalize(-3), bottom: normalize(-3) }}>
                           <Image
                              source={require('../assets/icon/center.png')}
                              style={{ width: wp(105), height: wp(105) }}
                              resizeMode="contain" PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                              placeholderStyle={{ backgroundColor: null }}
                           />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={async () => {
                        navigation.navigate('arcadeBookingScreen', { status: false })
                     }
                     } style={[pageStyle.containerCardRight, { backgroundColor: '#fdce00' }]}>

                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>คอนโซลและ</Text>
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>อาร์เคด</Text>
                        <View style={{ position: 'absolute', bottom: normalize(-5), right: normalize(5) }}>
                           <Image
                              source={require('../assets/icon/console.png')}
                              style={{ width: normalize(110), height: normalize(100) }}
                              PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                              placeholderStyle={{ backgroundColor: null }}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={[{ flex: 1, flexDirection: 'row' }]}>
                     <TouchableOpacity
                        onPress={async () => {
                           navigation.navigate('sleepingBooking', { status: false })
                        }
                        }
                        style={[pageStyle.containerCardLeft, { backgroundColor: '#f05a24' }]}>
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>สลีปปิ้งพอด</Text>
                        <View style={{ position: 'absolute', right: -5, bottom: -5 }}>
                           <Image
                              source={require('../assets/icon/sleeping.png')}
                              style={{ width: wp(115), height: wp(110) }}
                              resizeMode="contain"
                              PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                              placeholderStyle={{ backgroundColor: null }}
                           />
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={
                           () => navigation.navigate('broadcastBooking', { status: false })
                        }
                        style={[pageStyle.containerCardRight, { backgroundColor: colors.red }]}
                     >
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>บรอดคาสท์สตูดิโอ</Text>
                        <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>และสเตจ</Text>
                        <View style={{ position: 'absolute', zIndex: 1, bottom: normalize(-5), right: normalize(-6) }}>
                           <Image
                              source={require('../assets/icon/broadcast.png')}
                              style={{ width: wp(91), height: wp(91) }}
                              resizeMode="contain"
                              PlaceholderContent={<ActivityIndicator size='small' color={colors.GreyBlue} />}
                              placeholderStyle={{ backgroundColor: null }}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
            <View style={styles.container}>
               <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                  <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>
                     ข่าวและอีเวนต์
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('NewsScreen')}>
                     <Text style={[fontStyles.Medium17, { color: colors.yellow }]}>
                        ดูเพิ่มเติม
                  </Text>
                  </TouchableOpacity>
               </View>
               <FlatList
                  data={dummyNews.slice(3)}
                  renderItem={renderNews}
                  keyExtractor={(item) => item.id.toString()}

               />


               <View style={[{ marginTop: hp(40) }]}>
                  <Text style={[fontStyles.Medium20, { color: '#FFF' }]}>
                     รับชมความบันเทิงต่อได้ที่ KING KASTER
                  </Text>
               </View>
               <View style={[{ marginBottom: hp(50) }]} >
                  <OpenURL
                     url={"https://google.com"}
                  />
               </View>
            </View>
         </View>
      )
   }
   return (
      <SafeAreaView style={[styles.screen]}>
         <FlatList
            ListHeaderComponent={Content}
            showsVerticalScrollIndicator={false}
         />

      </SafeAreaView>
   )
}
const pageStyle = StyleSheet.create({
   containerCardLeft: {
      margin: 0,
      marginLeft: 0,
      marginRight: normalize(12),
      marginBottom: normalize(15),
      borderRadius: 12,
      borderWidth: 0,
      height: normalize(130),
      padding: 0,
      paddingLeft: normalize(13),
      paddingTop: normalize(13),
      position: 'relative',
      flex: 1
   },
   containerCardRight: {
      margin: 0,
      marginLeft: normalize(5),
      marginRight: 0,
      marginBottom: normalize(15),
      borderRadius: 12,
      borderWidth: 0,
      height: normalize(130),
      padding: 0,
      paddingLeft: normalize(13),
      paddingTop: normalize(13),
      position: 'relative',
      flex: 1
   }
})
export default homeScreen;