import { StyleSheet } from 'react-native'
import { wp, hp } from '../function/screen'
import colors from './colors'
import normalize from '../function/normalize'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        paddingHorizontal: wp(20)
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        alignItems: 'center'
    },
    bottomPrimary: {
        backgroundColor: colors.primary,
    },
    bottomSecondary: {
        backgroundColor: colors.secondary,
    },
    bottomWithe: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray2
    },
    cardContainer: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        marginBottom: hp(23),
        padding: 0
    },
    //---------- chat screen -----------//
    containerInput: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerRow: {
        alignItems: 'flex-end'
    },
    containerChat: {
        flexDirection: 'row',
        padding: normalize(10),
        alignItems: 'center'
    },
    containerChatMe: {
        flexDirection: 'row',
        padding: normalize(5),
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#fff',
        padding: normalize(10),
        margin: normalize(10),
        borderRadius: normalize(15),
        maxWidth: '70%'
    },
    itemMe: {
        backgroundColor: colors.primary,
        padding: 5,
        margin: 10,
        borderRadius: 15,

    },
    itemMeImage: {
        padding: 5,
        borderRadius: 15,
        flexBasis: '59%'
    },
    time: {
        color: '#ccc',
        fontSize: normalize(13)
    },
    imageStyle: {
        width: wp(207),
        height: wp(207),
        margin: 1,
        borderRadius: 5,
    },
    imageStyleTwoOnOne: {
        width: wp(103.5),
        height: wp(103.5),
        margin: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    imageStyleTwoOnTwo: {
        width: wp(103.5),
        height: wp(103.5),
        margin: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    imageStyleMoreThree: {
        width: wp(207),
        height: wp(103.5),
        margin: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    imageStyleMoreFourOnOne: {
        width: wp(103.5),
        height: wp(103.5),
        margin: 1,
        borderTopLeftRadius: 5,
    },
    imageStyleMoreFourOnTwo: {
        width: wp(103.5),
        height: wp(103.5),
        margin: 1,
        borderTopRightRadius: 5,
    },
    imageStyleMoreFourOnThree: {
        width: wp(103.5),
        height: wp(103.5),
        margin: 1,
        borderBottomLeftRadius: 5,
    },
    imageStyleMoreFourOnFour: {
        width: wp(103.5),
        height: wp(103.5),
        margin: 1,
        borderBottomRightRadius: 5,
    },
    imagesCount: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 30,
    },
    moreImagesOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomEndRadius: 5,
        height: '99%',
        justifyContent: 'center',
        position: 'absolute',
        margin: 1,
        top: 0,
        width: '97%',
        zIndex: 2,
    },
    moreThanFourImagesInnerView: {
        flex: 1,
        flexDirection: 'row',
        height: '50%',
    },
    title: {
        fontFamily: 'Kanit-Regular',
    },
    time: {
        fontFamily: 'Kanit-Regular',
        fontSize: normalize(12),
        color: '#999'
    },
    containerTime: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    //------------ Register screen --------//
    registerBtn: {
        width: '100%',
        borderRadius: 12
    },
    registerInputContainer: {
        borderWidth: 1,
        borderColor: colors.borderInput,
        backgroundColor: colors.input,
        borderRadius: 6,
        height: 52
    },
    registerInputStyle: {
        color: colors.white, 
        paddingLeft: 20
    }
})
export default styles