import React from 'react'
import { View } from 'react-native'
import Calendar from '../assets/icon/calendar.svg'
import Success from '../assets/icon/success.svg'
import Language from '../assets/icon/language.svg'
import Bell from '../assets/icon/bell.svg'
import CashCoin from '../assets/icon/cash-icon.svg'
import Point from '../assets/icon/point-icon.svg'
import Wallet from '../assets/icon/wallet-icon.svg'
import History from '../assets/icon/history.svg'
import Waiting from '../assets/icon/waiting.svg'
import Favorite from '../assets/icon/favorite.svg'
interface IconProps {
    name: string;
    width: number;
    height: number;
}

const IconApp = ({ name, width, height }: IconProps) => {
    const ShowIcon = () => {
        if(name === 'calendar'){
            return <Calendar width={width} height={height} />
        }else if(name === 'success'){
            return <Success width={width} height={height} />
        }else if(name === 'language'){
            return <Language width={width} height={height} />
        }else if(name === 'bell'){
            return <Bell width={width} height={height} />
        }else if(name === 'cash-coin'){
            return <CashCoin width={width} height={height} />
        }else if(name === 'point'){
            return <Point width={width} height={height} />
        }else if(name === 'wallet'){
            return <Wallet width={width} height={height} />
        }else if(name === 'history'){
            return <History width={width} height={height} />
        }else if(name === 'waiting'){
            return <Waiting width={width} height={height} />
        }else if(name === 'favorite'){
            return <Favorite width={width} height={height} />
        }else{
            return null
        }

    }
   
    return (
        <View>
           <ShowIcon/>
        </View>
    )
}
export default IconApp