import React, { FunctionComponent, Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PixelRatio, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { hp, wp } from '../function/screen';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import mainStyles from '../styles/styles';
import fontStyles from '../styles/fontStyles';
import normalize from '../function/normalize';

interface Prop {

   leftShow?: boolean | undefined
   rightShow: boolean
   left: React.ReactElement<{}> 
   right: React.ReactElement<{}>
   title: string
   backgroundStyle: StyleProp<ViewStyle>
   fontColor: string | null
   onPress: () => void;
}
const Header = ({ rightShow, right, left, title, leftShow, backgroundStyle, fontColor, onPress }: Prop) => {

   const styles = StyleSheet.flatten([[componentStyle.container], backgroundStyle])
   const colorFont = fontColor != null ? fontColor : colors.white
   return (
      <View style={[styles]}>
         <View style={[mainStyles.flexRow, { justifyContent: 'space-between' }]}>
            <View style={[{ flex: 1, flexGrow: 0.5 }]}>
               {
                  leftShow == true || leftShow == undefined ?
                     left == undefined ?
                        <TouchableOpacity onPress={onPress}>
                           <View style={[mainStyles.flexRow]}>
                              <Icon name='arrow-left' size={PixelRatio.roundToNearestPixel(19)} color={colorFont} />
                              <Text style={[fontStyles.Regular20, { color: colorFont, marginLeft: normalize(15) }]}>
                                 กลับ
                              </Text>
                           </View>
                        </TouchableOpacity>
                        : <View>{left}</View>
                     : null
               }
            </View>
            <View style={[{ flex: 1 }]}>
               <Text style={[fontStyles.Regular18, { color: colorFont, alignSelf: 'center' }]} numberOfLines={1}>
                  {title}
               </Text>
            </View>
            <View style={[{ flex: 1, alignItems: 'flex-end', flexGrow: 0.5 }]}>
               {
                  rightShow == true ?
                     <View>
                        {right}
                     </View>
                     : null
               }
            </View>
         </View>
      </View>
   )
}
const componentStyle = StyleSheet.create({
   container: {
      height: hp(131),
      borderBottomRightRadius: 42,
      borderBottomLeftRadius: 42,
      backgroundColor: colors.darkGreyBlue2,
      paddingHorizontal: wp(20),
      paddingTop: hp(55),
      marginTop: -hp(55),
      justifyContent: 'center'
   },
   text: {
      color: colors.white
   }
})
export default Header;