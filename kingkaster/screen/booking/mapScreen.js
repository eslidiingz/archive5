import React from 'react';
import { Modal, PixelRatio, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header } from 'react-native-elements';
import { hp, wp } from '../../function/screen';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';
const mapScreen = ({ navigation }) => {
    const images = [{
        url: 'http://13.229.88.81:4000/storage/images/test/original/img-3bdf71072fcd494d46de4f23f9177339.jpg',
        props: {
        }
    }]
    return (
        <SafeAreaView style={[styles.screen,]}>
            <ImageViewer
                style={{ marginTop: -hp(50) }}
                backgroundColor={colors.background}
                renderIndicator={() => null}
                renderHeader={() => (
                    <View style={[{ flex: 1, zIndex: 5 }]}>
                        <Header
                            leftComponent={<TouchableOpacity onPress={() => navigation.pop()}>
                                <Icon name='arrow-left' size={PixelRatio.roundToNearestPixel(18)} color='#FFF' />
                            </TouchableOpacity>}
                            centerComponent={{ text: 'แผนที่', style: [fontStyles.Regular18, { color: '#fff' }] }}
                            containerStyle={{ height: hp(131), paddingTop: hp(20), backgroundColor: colors.darkGreyBlue2, borderBottomWidth: 0, paddingHorizontal: wp(20), borderBottomRightRadius: 42, borderBottomLeftRadius: 42 }}
                        />
                    </View>
                )}
                imageUrls={images}
            />
        </SafeAreaView>
    )
}
export default mapScreen