import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '../function/screen';
import colors from '../styles/colors';
import styles from '../styles/styles';

interface RatingProps {

    /** ค่าเริ่มต้น 5 */
    count: number

    /** ค่าเริ่มต้น 4 */
    rating: number

    countColor: string

    ratingColor: string

    /** อ้างอิงชื่อ FontAwesome จาก react native vector icons ค่าเริ่มต้น star */
    type: string

    /** ปรับขนาดของ rating ค่าเริ่มต้น 12 */
    size: number

    ladderSize: boolean

}

const Rating = ({ type, count, rating, countColor, ratingColor, size, ladderSize }: RatingProps) => {
    const baseCount = count != null ? count : 5
    const baseRating = rating != null ? rating : 4
    const baseCountColor = countColor != null ? countColor : '#989898'
    const baseRatingColor = ratingColor != null ? ratingColor : colors.yellow
    const baseType = type != null ? type : 'star'
    const baseSize = size != null ? size : normalize(12)
    const [row, setRow] = useState([])
    useEffect(() => {
        createrow()
        return () => {
            setRow([])
        }
    }, [])
    const createrow = () => {
        let x = baseSize
        for (let i = 1; i <= baseCount; i++) {
            
            console.log('test', x)
            if (baseRating >= i) {
                setRow((row: any) => [...row, { num: i, status: 1, ladder: ladderSize == true ? x += 1.5 : baseSize }])
            } else {
                setRow((row: any) => [...row, { num: i, status: 0, ladder: ladderSize == true ? x += 1.5 : baseSize }])
            }
        }
    }
    return (
        <View
            style={[styles.flexRow,ladderSize == true ?{alignItems:'flex-end'} : null]}
        >
            {
                row.map((item) => {
                    console.log(item.ladder)
                    return (
                        <Icon key={item.num} name={baseType} size={ladderSize == true ? item.ladder : baseSize} style={[{ marginHorizontal: wp(1) }]} color={item.status == 1 ? baseRatingColor : baseCountColor} />
                    )
                })
            }
        </View>

    )
}
export default Rating