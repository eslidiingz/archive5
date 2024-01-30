import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import normalize from '../function/normalize'
import { hp, wp } from '../function/screen'
import colors from '../styles/colors'
import fontStyles from '../styles/fontStyles'

interface paginationProps {
    length: number
    activeIndex: number
}

const pagination = ({length,activeIndex}:paginationProps) => {

    useEffect(()=>{

    },[activeIndex])
    return(
        <View style={[{
            alignItems:'center',
            borderRadius:normalize(15),
            backgroundColor:'rgba(15,15,15, 0.5)',
            paddingHorizontal:wp(10),
            marginVertical:hp(10)
        }]}>
            <Text style={[fontStyles.Regular14,{color:colors.white}]}>
                {activeIndex + 1}/{ length }
            </Text>
        </View>
            
       
    )
}
export default pagination;