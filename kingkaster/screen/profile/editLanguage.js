import React, { useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import styles from '../../styles/styles'
import colors from '../../styles/colors'
import fontStyles from '../../styles/fontStyles'

import { Header } from '../../components'
import { hp, wp } from '../../function/screen'
import { Card, CheckBox } from 'react-native-elements'
import IconAnt from 'react-native-vector-icons/AntDesign'
import normalize from '../../function/normalize'
const EditLanguageScreen = ({ navigation }) => {
    const dummyAddress = [
        {
            id: 1,
            language: 'ไทย',
          
        },
        {
            id: 2,
            language: 'English',
           
        },

    ]
    const [checked, setChecked] = useState({ address_id: 1, checked: true })

    const renderItem = (itemData) => {

        return (
            <Card
                containerStyle={[
                    { borderRadius: 8, marginHorizontal: 0, backgroundColor: colors.darkGreyBlue1, borderColor: colors.borderInput },
                    checked.address_id === itemData.item.id ? { borderColor: colors.blue} : { borderColor: colors.borderInput}
                ]}
            >
                <TouchableOpacity onPress={() => { setChecked({ address_id: itemData.item.id, checked: true }) }} >
                    <View style={[styles.flexRow]}>

                        <View style={[{ flex: 1 }]}>
                            <View style={[styles.flexRow]}>
                                <Text style={[fontStyles.Medium18, { color: colors.white, fontWeight: '500', marginRight: wp(15) }]}>
                                   {itemData.item.language}
                                </Text>

                            </View>
                        </View>
                        <View >
                            {
                                 checked.address_id === itemData.item.id ?  <IconAnt name='checkcircle' size={normalize(23)} color={colors.blue} /> : null
                            }
                          
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
    return (
        <SafeAreaView style={styles.screen}>
            <Header
                onPress={() => navigation.pop()}
                title='ตั่งค่าภาษา'
            />
            <View style={[styles.container, { marginTop: hp(20), flex: 1 }]}>
                <FlatList
                    data={dummyAddress}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />

            </View>
        </SafeAreaView>
    )
}

export default EditLanguageScreen