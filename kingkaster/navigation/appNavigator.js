import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import indexScreen from '../screen/auth/indexScreen';
import homeScreen from '../screen/homeScreen';
import colors from '../styles/colors';
import fontStyles from '../styles/fontStyles';
import normalize from '../function/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image, Dimensions } from 'react-native';
import { hp, wp } from '../function/screen';

import registerScreen from '../screen/auth/registerScreen';
import newsScreen from '../screen/news/newsScreen';
import newsDetailScreen from '../screen/news/newsDetailScreen'
import InfluBookingScreen from '../screen/booking/influ/influBookingScreen';
import profileScreen from '../screen/profile/profileScreen'
import myProfileScreen from '../screen/profile/myProfileScreen'
import editProfileScreen from '../screen/profile/editProfileScreen'
import changePasswordScreen from '../screen/profile/changePasswordScreen'
import myOrderScreen from '../screen/profile/myOrderScreen'
import editLanguageScreen from '../screen/profile/editLanguage'
import bookingDetailScreen from '../screen/booking/bookingDetailScreen';
import StartScreen from '../screen/StartScreen';
import { useSelector } from 'react-redux';
import completeScreen from '../screen/auth/completeScreen';
import forgetScreen from '../screen/auth/forgetScreen';
import mapScreen from '../screen/booking/mapScreen';
import notificationScreen from '../screen/notificationScreen';
import couponScreen from '../screen/booking/couponScreen';
import successBookingScreen from '../screen/booking/successBookingScreen';
import SteamerBookingScreen from '../screen/booking/steamer/steamerBookingScreen'
import arcadeBookingScreen from '../screen/booking/arcade/arcadeBookingScreen';
import detailArcadeScreen from '../screen/booking/arcade/detailArcadeScreen';
import sleepingpodScreen from '../screen/booking/sleeping/sleepingpodScreen';
import broadcastScreen from '../screen/booking/broadcast/broadcastScreen';
import learningCenterScreen from '../screen/booking/learning/learningCenterScreen';
import learningBookingScreen from '../screen/booking/learning/learningBookingScreen';
import learningBookingDetailScreen from '../screen/booking/learning/learningBookingDetailScreen';
import myBookScreen from '../screen/mybook/myBookScreen';
import historyScreen from '../screen/mybook/historyScreen';
import giftScreen from '../screen/mybook/giftScreen';
import marketplaceScreen from '../screen/marketplace/marketplaceScreen';
import productDetailScreen from '../screen/marketplace/productDetailScreen';
import basketScreen from '../screen/marketplace/basketScreen';
import resetPasswordScreen from '../screen/auth/resetPassword';
import addCreditCardScreen from '../screen/profile/addCreditCardScreen';
import completeProfileScreen from '../screen/profile/completeScreen';
import addressIndex from '../screen/marketplace/addressIndexScreen';
import addAddress from '../screen/marketplace/addAddressScreen';
import editAddress from '../screen/marketplace/editAddressScreen';
import completeMarketScreen from '../screen/marketplace/completeScreen';
import privacy from '../screen/privacy';
const Navigator = () => {


  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  const options = {
    headerShown: false,

  }
  const AuthNavigator = () => {

    useEffect(() => {

    }, [])
    return (
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name="IndexScreen" component={indexScreen} />
        <Stack.Screen name="RegisterScreen" component={registerScreen} />
        <Stack.Screen name="CompleteScreen" component={completeScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ForgetScreen" component={forgetScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={resetPasswordScreen} />
        <Stack.Screen name="privacy" component={privacy}/>
        {/* 
        <Stack.Screen name="RegisterScreen" component={registerScreen} />
        <Stack.Screen name="PincodeScreen" component={pincodeScreen} /> */}
        <Stack.Screen name="HomeTab" component={TabNavigator} />
      </Stack.Navigator>
    )
  }
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#db3f52',
          inactiveTintColor: colors.gray4,
          labelStyle: fontStyles.Light12,
          showLabel: false,

          style: { height: hp(91), position: 'absolute', backgroundColor: colors.darkGreyBlue1, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderTopWidth: 0, }
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let stylesActive;
            if (route.name == 'Home') {
              focused ? iconName = require('../assets/icon/home_active.png') : iconName = require('../assets/icon/home.png')
              focused == true ? stylesActive = { backgroundColor: colors.darkGreyBlue2, padding: wp(2), borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center', justifyContent: 'center' } : { padding: 10, borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center' }
            } else if (route.name == 'MyBook') {
              focused ? iconName = require('../assets/icon/booking_active.png') : iconName = require('../assets/icon/booking.png')
              focused == true ? stylesActive = { backgroundColor: colors.darkGreyBlue2, padding: wp(2), borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center', justifyContent: 'center' } : { padding: 10, borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center' }
            } else if (route.name == 'Shop') {
              focused ? iconName = require('../assets/icon/shop_active.png') : iconName = require('../assets/icon/shop.png')
              focused == true ? stylesActive = { backgroundColor: colors.darkGreyBlue2, padding: wp(2), borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center', justifyContent: 'center' } : { padding: 10, borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center' }
            } else if (route.name == 'Profile') {
              focused ? iconName = require('../assets/icon/profile_active.png') : iconName = require('../assets/icon/profile.png')
              focused == true ? stylesActive = { backgroundColor: colors.darkGreyBlue2, padding: wp(2), borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center', justifyContent: 'center' } : { padding: 10, borderRadius: 25, width: wp(63), height: wp(50), alignItems: 'center' }
            }
            return (
              <View style={[stylesActive]}>
                <Image source={iconName} style={[{ width: wp(25.2), height: wp(25.2) }]} />
              </View>
            )

          },
        })}>
        <Tab.Screen name='Home' component={homeScreen} />
        <Tab.Screen name='MyBook' component={myBookScreen} />
        <Tab.Screen name='Shop' component={marketplaceScreen} />
        <Tab.Screen name='Profile' component={profileScreen} />
      </Tab.Navigator>
    )
  }

  const AppNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="MainTab" screenOptions={options}>
        <Stack.Screen name="MainTab" component={TabNavigator} />
        <Stack.Screen name="NewsScreen" component={newsScreen} />
        <Stack.Screen name="NewsDetailScreen" component={newsDetailScreen} />

        <Stack.Screen name="MyProfileScreen" component={myProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={editProfileScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={changePasswordScreen} />
        <Stack.Screen name="MyOrderScreen" component={myOrderScreen} />
        <Stack.Screen name="EditLanguageScreen" component={editLanguageScreen} />
        <Stack.Screen name="MapScreen" component={mapScreen} />
        <Stack.Screen name="NotificationScreen" component={notificationScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="CouponScreen" component={couponScreen} />
        <Stack.Screen name="AddCreditCardScreen" component={addCreditCardScreen} />
        <Stack.Screen name="completeProfileScreen" component={completeProfileScreen} options={{ gestureEnabled: false }} />

        <Stack.Screen name="BookingDetailScreen" component={bookingDetailScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ArcadeDetailScreen" component={detailArcadeScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="LearningBookingDetailScreen" component={learningBookingDetailScreen} options={{ gestureEnabled: false }} />

        <Stack.Screen name="InfluBookingScreen" component={InfluBookingScreen} />
        <Stack.Screen name="SuccessBooking" component={successBookingScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="SteamerBookingScreen" component={SteamerBookingScreen} />
        <Stack.Screen name="arcadeBookingScreen" component={arcadeBookingScreen} />
        <Stack.Screen name="sleepingBooking" component={sleepingpodScreen} />
        <Stack.Screen name="broadcastBooking" component={broadcastScreen} />
        <Stack.Screen name="learningCenter" component={learningCenterScreen} />
        <Stack.Screen name="learningBooking" component={learningBookingScreen} options={{ gestureEnabled: false }} />

        <Stack.Screen name="historyBook" component={historyScreen} />
        <Stack.Screen name="giftBook" component={giftScreen} />

        <Stack.Screen name="productDetail" component={productDetailScreen} />
        <Stack.Screen name="basket" component={basketScreen} />
        <Stack.Screen name="IndexAddress" component={addressIndex} />
        <Stack.Screen name="addAddress" component={addAddress}/>
        <Stack.Screen name="editAddress" component={editAddress} />
        <Stack.Screen name="completeMarket" component={completeMarketScreen} options={{ gestureEnabled: false }} />
        
        <Stack.Screen name="privacy" component={privacy}/>

      </Stack.Navigator>

    )
  }
  return (
    <NavigationContainer>
      {/* <AppNavigator /> */}
      {isAuth && <AppNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartScreen />}
    </NavigationContainer>
  )
}
export default Navigator