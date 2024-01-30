import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, PixelRatio, Dimensions, StyleProp, ViewStyle, TextStyle } from 'react-native';
import mainStyles from '../styles/styles'
import colors from '../styles/colors';

interface tabbarProps {
    value: Array<any>;
    selectedIndex?: number | undefined;
    onTabPress?: ((index: number) => void) | undefined
    containerStyle: StyleProp<ViewStyle>;
    firstTabStyles: StyleProp<ViewStyle>;
    lastTabStyles: StyleProp<ViewStyle>;
    tabStyles: StyleProp<ViewStyle>;
    activeTabStyles: StyleProp<ViewStyle>;
    textStyles: StyleProp<TextStyle>;
    activeTextStyles: StyleProp<TextStyle>;

}

const TabButtonbar = ({ value, onTabPress, selectedIndex, containerStyle, firstTabStyles, lastTabStyles, tabStyles, activeTabStyles, textStyles, activeTextStyles }: tabbarProps) => {
    const newContainerStyle = StyleSheet.flatten([styles.containerTabStyles, containerStyle])
    const newtabStyles = StyleSheet.flatten([styles.tabStyles, tabStyles])
    const newActivetabStyles = StyleSheet.flatten([styles.activeTabStyles, activeTabStyles])
    const newTextStyles = StyleSheet.flatten([styles.textStyle, textStyles])
    const newActiveTextStyles = StyleSheet.flatten([styles.textActiveStyle, activeTextStyles])
    var firstItem = value.indexOf(value[0])
    var lastItem = value.length - 1

    return (
        <View style={newContainerStyle}>
            <ScrollView horizontal={true} scrollToOverflowEnabled={true} indicatorStyle='white' showsHorizontalScrollIndicator={false} scrollEnabled={value.length <= 4 ? false : true}  >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        value.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} onPress={() => onTabPress(i)} style={i % 2 == 0 ? {marginRight: 5} : {marginLeft: 5} || i % 2 == 1 ? {marginRight: 5} : {marginLeft: 5}}>
                                    {
                                        selectedIndex == i ?
                                            <View>
                                                <View style={newActivetabStyles}  >
                                                    <View style={[styles.containerText]} >
                                                        <Text numberOfLines={1} style={[newActiveTextStyles, { alignSelf: 'center' }]} >{item}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <View style={newtabStyles}  >
                                                    <View style={[styles.containerText,]} >
                                                        <Text numberOfLines={1} style={[newTextStyles, { alignSelf: 'center' }]} >{item}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    containerTabStyles: {
        width: '100%',
        marginBottom: 10,
    },
    firsttabStyles: {
        borderRightWidth: 0.5,
        borderRightColor: '#FFF',

    },
    activeTabStyles: {
        borderRadius: 23,
        marginVertical:5,
        backgroundColor:null,
        borderColor:colors.yellow,
        borderWidth:1,
        paddingVertical:6,
        paddingHorizontal:6,
    },
    tabStyles: {
        borderColor: '#E7E7E7',
        marginVertical:5,
        backgroundColor:null,
        borderWidth:1,
        paddingVertical:6,
        paddingHorizontal:6,
        borderRadius:23

    },
    lasttabStyles: {
        borderLeftWidth: 0.5,
        borderLeftColor: '#FFF',

    },
    containerText: {
        marginHorizontal: 10,
    },
    textStyle: {
        fontFamily: 'Kanit-Medium',
        fontSize: PixelRatio.roundToNearestPixel(16),
      
    },
    textActiveStyle: {
        fontFamily: 'Kanit-Medium',
        fontSize: PixelRatio.roundToNearestPixel(16),
    }

})
export default TabButtonbar;