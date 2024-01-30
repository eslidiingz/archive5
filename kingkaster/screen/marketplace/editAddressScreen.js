import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { Input, Switch, Button, Divider } from 'react-native-elements';
import { Header } from '../../components';
import normalize from '../../function/normalize';
import { hp, wp } from '../../function/screen';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../../styles/colors';
import RNPickerSelect from 'react-native-picker-select';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const editAddress = ({ navigation }) => {
    const provinceArray = [
        { label: 'จังหวัด', value: null },
        { label: 'กรุงเทพ', value: 'bkk' },
        { label: 'กระบี่', value: 'krb' },
        { label: 'นนทบุรี', value: 'non' },
    ]
    const districtArray = [
        { label: 'เขต/อำเภอ', value: null },
        { label: 'บางแค', value: 'bangkae' },
        { label: 'หนองแขม', value: 'nongkam' },
        { label: 'ลาดพร้าว', value: 'ladprao' },
    ]
    const subdistrictArray = [
        { label: 'แขวง/ตำบล', value: null },
        { label: 'ลาดพร้าว', value: 'LatPhrao' },
        { label: 'จรเข้บัว', value: 'ChorakheBua' },
    ]
    useEffect(() => {

    }, [])
    const modalizeRef = useRef(null);
    const modalizeRefDistrict = useRef(null)
    const modalizeRefSubDistrict = useRef(null)
    const showModalize = () => {
        modalizeRef.current?.open();

    }
    const showModalizeDistrict = () => {
        modalizeRefDistrict.current?.open()
    }
    const showModalizeSubDistrict = () => {
        modalizeRefSubDistrict.current?.open()
    }
    const [value, setValue] = useState({
        name: true,
        phone: true,
        postcode: true,
        province: true,
        district: true,
        subDistrict: true,
        address: true
    })
    const [name, setName] = useState('สมหญิง รักดี')
    const [phone, setPhone] = useState('080 081 8293')
    const [postcode, setPostcode] = useState('10230')
    const [province, setProvince] = useState('bkk')
    const [district, setDistrict] = useState('ladprao')
    const [subdistrict, setSubdistrict] = useState('ChorakheBua')
    const [address, setAddress] = useState('อารียาโมวา ลาดปลาเค้า')
    const [note, setNote] = useState('บ้านเราเอง')
    const [modalShow, setModalShow] = useState(false)
    const nameHandle = TextInput => {
        setName(TextInput)
        setValue({
            name: name != '' ? true : null,
            phone: value.phone,
            postcode: value.postcode,
            province: value.province,
            district: value.district,
            subDistrict: value.subDistrict,
            address: value.address
        })
    }
    const phoneHandle = TextInput => {
        setPhone(TextInput)
        setValue({
            name: value.name,
            phone: phone != '' ? true : null,
            postcode: value.postcode,
            province: value.province,
            district: value.district,
            subDistrict: value.subDistrict,
            address: value.address
        })
    }
    const postcodeHandle = TextInput => {
        setPostcode(TextInput)
        setValue({
            name: value.name,
            phone: value.phone,
            postcode: postcode != '' ? true : null,
            province: value.province,
            district: value.district,
            subDistrict: value.subDistrict,
            address: value.address
        })
    }
    const addressHandle = TextInput => {
        setAddress(TextInput)
        setValue({
            name: value.name,
            phone: value.phone,
            postcode: value.postcode,
            province: value.province,
            district: value.district,
            subDistrict: value.subDistrict,
            address: address != '' ? true : null
        })
    }
    const noteHandle = TextInput => {
        setNote(TextInput)
    }
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                onPress={() => navigation.pop()}
                title='เพิ่มที่อยู่'
                rightShow={true}
                right={
                    <TouchableOpacity onPress={() => setModalShow(true)}>
                        <Text style={[fontStyles.Regular18, { color: colors.yellow, textDecorationLine: 'underline' }]}>
                            ลบที่อยู่
                        </Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View style={[styles.container, { marginTop: hp(20) }]}>
                    <Input
                        placeholder='ชื่อ - นามสกุลผู้รับ'
                        label='ชื่อ - นามสกุลผู้รับ'
                        placeholderTextColor='#5d628e'
                        labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                        inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                        inputContainerStyle={pageStyle.containerInput}
                        containerStyle={{ paddingHorizontal: 0 }}
                        onChangeText={nameHandle}
                        value={name}
                    />
                    <Input
                        placeholder='เบอร์โทรศัพท์ผู้รับ'
                        label='เบอร์โทรศัพท์ผู้รับ'
                        keyboardType='number-pad'
                        placeholderTextColor='#5d628e'
                        labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                        inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                        inputContainerStyle={pageStyle.containerInput}
                        containerStyle={{ paddingHorizontal: 0 }}
                        onChangeText={phoneHandle}
                        value={phone}
                    />
                    <Divider style={[{ backgroundColor: '#4a6181', height: 1, marginVertical: hp(25) }]} />
                    <View style={[styles.flexRow]}>
                        <View style={[{ flex: 1, paddingRight: 7.5 }]}>
                            <Input
                                placeholder='รหัสไปรษณีย์'
                                label='รหัสไปรษณีย์'
                                keyboardType='number-pad'
                                placeholderTextColor='#5d628e'
                                labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                                inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                                inputContainerStyle={pageStyle.containerInput}
                                containerStyle={{ paddingHorizontal: 0 }}
                                onChangeText={postcodeHandle}
                                value={postcode}
                            />
                        </View>
                        <View style={[{ flex: 1, paddingLeft: 7.5 }]}>
                            <Text style={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}>
                                จังหวัด
                            </Text>
                            {
                                Platform.OS === 'ios' ?
                                    <TouchableWithoutFeedback onPress={showModalize}>
                                        <View pointerEvents="none">
                                            <Input
                                                placeholder='จังหวัด'
                                                labelStyle={[fontStyles.Medium18, { color: '#989898', fontWeight: 'normal' }]}
                                                inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                                                inputContainerStyle={pageStyle.containerInput}
                                                containerStyle={{ paddingHorizontal: 0 }}
                                                placeholderTextColor='#5d628e'
                                                value={province != null ? provinceArray.find(state => state.value === province).label : null}
                                            /></View>
                                    </TouchableWithoutFeedback>
                                    :
                                    <View style={{ borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, marginBottom: 30 }}>
                                        <Picker
                                            itemStyle={[fontStyles.Regular17]}
                                            selectedValue={province}

                                            style={[fontStyles.Regular17, { color: province == null ? '#5d628e' : '#fff' }]}
                                            onValueChange={(valueSelected) => {
                                                setProvince(valueSelected)
                                                setValue({
                                                    name: value.name,
                                                    phone: value.phone,
                                                    postcode: value.postcode,
                                                    province: valueSelected != null ? true : null,
                                                    district: value.district,
                                                    subDistrict: value.subDistrict,
                                                    address: value.address
                                                })
                                            }}>
                                            {
                                                provinceArray.map((item, index) => (
                                                    <Picker.Item key={index} label={item.label} value={item.value} />
                                                ))
                                            }

                                        </Picker>
                                    </View>
                            }
                        </View>
                    </View>
                    <View style={[styles.flexRow]}>
                        <View style={[{ flex: 1, paddingRight: 7.5 }]}>
                            <Text style={[fontStyles.Medium18, pageStyle.label, { color: '#FFF', marginTop: -hp(20), marginBottom: hp(10) }]}>
                                เขต/อำเภอ
                            </Text>
                            {
                                Platform.OS === 'ios' ?
                                    <TouchableWithoutFeedback onPress={showModalizeDistrict}>
                                        <View pointerEvents="none">
                                            <Input
                                                placeholder='เขต/อำเภอ'
                                                labelStyle={[fontStyles.Medium18, { color: '#989898', fontWeight: 'normal' }]}
                                                inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                                                inputContainerStyle={pageStyle.containerInput}
                                                containerStyle={{ paddingHorizontal: 0 }}
                                                placeholderTextColor='#5d628e'
                                                value={district != null ? districtArray.find(state => state.value === district).label : null}
                                            /></View>
                                    </TouchableWithoutFeedback>
                                    :
                                    <View style={{ borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, marginBottom: 30 }}>
                                        <Picker
                                            itemStyle={[fontStyles.Regular17]}
                                            selectedValue={district}
                                            style={[fontStyles.Regular17, { color: district == null ? '#5d628e' : '#fff' }]}
                                            onValueChange={(valueSelected) => {
                                                setDistrict(valueSelected)
                                                setValue({
                                                    name: value.name,
                                                    phone: value.phone,
                                                    postcode: value.postcode,
                                                    province: value.province,
                                                    district: valueSelected != null ? true : null,
                                                    subDistrict: value.subDistrict,
                                                    address: value.address
                                                })
                                            }}>
                                            {
                                                districtArray.map((item, index) => (
                                                    <Picker.Item key={index} label={item.label} value={item.value} />
                                                ))
                                            }

                                        </Picker>
                                    </View>
                            }
                        </View>

                        <View style={[{ flex: 1, paddingLeft: 7.5 }]}>
                            <Text style={[fontStyles.Medium18, pageStyle.label, { color: '#FFF', marginTop: -normalize(20), marginBottom: hp(10) }]}>
                                แขวง/ตำบล
                            </Text>
                            {
                                Platform.OS === 'ios' ?
                                    <TouchableWithoutFeedback onPress={showModalizeSubDistrict}>
                                        <View pointerEvents="none">
                                            <Input
                                                placeholder='เขต/อำเภอ'
                                                labelStyle={[fontStyles.Medium18, { color: '#989898', fontWeight: 'normal' }]}
                                                inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                                                inputContainerStyle={pageStyle.containerInput}
                                                containerStyle={{ paddingHorizontal: 0 }}
                                                placeholderTextColor='#5d628e'
                                                value={subdistrict != null ? subdistrictArray.find(state => state.value === subdistrict).label : null}
                                            /></View>
                                    </TouchableWithoutFeedback>
                                    :
                                    <View style={{ borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, marginBottom: 30 }}>
                                        <Picker
                                            itemStyle={[fontStyles.Regular17]}
                                            selectedValue={subdistrict}
                                            style={[fontStyles.Regular17, { color: subdistrict == null ? '#5d628e' : '#fff' }]}
                                            onValueChange={(valueSelected) => {
                                                setSubdistrict(valueSelected)
                                                setValue({
                                                    name: value.name,
                                                    phone: value.phone,
                                                    postcode: value.postcode,
                                                    province: value.province,
                                                    district: value.district,
                                                    subDistrict: valueSelected != null ? true : null,
                                                    address: value.address
                                                })
                                            }}>
                                            {
                                                subdistrictArray.map((item, index) => (
                                                    <Picker.Item key={index} label={item.label} value={item.value} />
                                                ))
                                            }

                                        </Picker>
                                    </View>
                            }

                        </View>
                    </View>
                    <Input
                        placeholder='บ้านเลขที่ ซอย อาคาร หมู่บ้าน'
                        label='บ้านเลขที่ ซอย อาคาร หมู่บ้าน'
                        placeholderTextColor='#5d628e'
                        labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                        inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                        inputContainerStyle={pageStyle.containerInput}
                        containerStyle={{ paddingHorizontal: 0, marginTop: hp(15) }}
                        onChangeText={addressHandle}
                        value={address}
                    />
                    <Input
                        placeholder='โน็ต'
                        label='โน็ต'
                        placeholderTextColor='#5d628e'
                        labelStyle={[fontStyles.Medium18, pageStyle.label, { color: '#FFF' }]}
                        inputStyle={[fontStyles.Regular17, { color: '#fff' }]}
                        inputContainerStyle={pageStyle.containerInput}
                        containerStyle={{ paddingHorizontal: 0 }}
                        onChangeText={noteHandle}
                        value={note}
                    />

                    <View style={[styles.flexRow, { marginTop: hp(50), marginBottom: hp(15) }]}>

                        <View style={[{ flex: 1 }]}>
                            <Button
                                disabled={value.name != null && value.phone != null && value.postcode != null && value.province != null && value.district != null && value.subDistrict != null && value.address != null ? false : true}
                                title='บันทึก'
                                disabledTitleStyle={[{ color: '#FFF' }]}
                                disabledStyle={[{ backgroundColor: '#5d628e' }]}
                                onPress={() => navigation.navigate('completeMarket', { title: 'แก้ไขที่อยู่', type: 'edit', from: 'market' })}
                                buttonStyle={[{ backgroundColor: colors.blue, borderRadius: 8 }]}
                                titleStyle={[fontStyles.Regular16]}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalShow}
            >
                <View style={[pageStyle.centeredView]}>
                    <View style={[pageStyle.modalView]}>
                        <TouchableOpacity onPress={() => { setModalShow(false) }} style={{ alignSelf: 'flex-end' }} >
                            <EvilIcons name='close' size={normalize(25)} />
                        </TouchableOpacity>
                        <Text style={[fontStyles.Medium16, { color: colors.dark, marginBottom: hp(30) }]}>
                            ลบที่อยู่
                        </Text>
                        <Text style={[fontStyles.Regular14, { color: colors.dark, marginBottom: hp(30) }]}>
                            คุณต้องการที่จะลบที่อยู่นี้ใช่หรือไม่?
                        </Text>
                        <View style={[styles.flexRow]}>
                            <Button
                                title='ยกเลิก'
                                onPress={() => setModalShow(false)}
                                titleStyle={[fontStyles.Medium15, { fontWeight: '500' }]}
                                containerStyle={[{ flex: 1, marginRight: wp(7.5) }]}
                                buttonStyle={[{ backgroundColor: '#b2b2b2' }]}
                            />
                            <Button
                                title='ลบ'
                                onPress={
                                    () => {
                                        setModalShow(false)
                                        navigation.navigate('completeMarket', { title: 'ลบที่อยู่', type: 'delete', from: 'market' })

                                    }
                                }
                                titleStyle={[fontStyles.Medium15, { fontWeight: '500' }]}
                                containerStyle={[{ flex: 1, marginLeft: wp(7.5) }]}
                                buttonStyle={[{ backgroundColor: colors.red }]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modalize
                ref={modalizeRef}
                modalStyle={{ backgroundColor: '#F8F8F8', borderTopColor: '#E5E5E5', borderTopWidth: 0, borderTopLeftRadius: 42, borderTopRightRadius: 42 }}

                closeOnOverlayTap={true} snapPoint={hp(300)}
                withOverlay={false} modalHeight={hp(300)}
                withHandle={false}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
            >
                <View style={{ height: hp(300), backgroundColor: '#d7d6dc' }}>
                    <Picker
                        itemStyle={[fontStyles.Regular17]}
                        selectedValue={province}

                        style={[fontStyles.Regular17, { color: province == null ? '#5d628e' : '#fff' }]}
                        onValueChange={(valueSelected) => {
                            setProvince(valueSelected)
                            setValue({
                                name: value.name,
                                phone: value.phone,
                                postcode: value.postcode,
                                province: valueSelected != null ? true : null,
                                district: value.district,
                                subDistrict: value.subDistrict,
                                address: value.address
                            })
                            modalizeRef.current?.close()
                        }}>
                        {
                            provinceArray.map((item) => (
                                <Picker.Item label={item.label} value={item.value} />
                            ))
                        }

                    </Picker>
                </View>
            </Modalize>
            <Modalize
                ref={modalizeRefDistrict}
                modalStyle={{ backgroundColor: '#F8F8F8', borderTopColor: '#E5E5E5', borderTopWidth: 0, borderTopLeftRadius: 42, borderTopRightRadius: 42 }}

                closeOnOverlayTap={true} snapPoint={hp(300)}
                withOverlay={false} modalHeight={hp(300)}
                withHandle={false}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
            >
                <View style={{ height: hp(300), backgroundColor: '#d7d6dc' }}>
                    <Picker
                        itemStyle={[fontStyles.Regular17, { color: district == null ? '#5d628e' : '#fff' }]}
                        selectedValue={district}
                        style={[fontStyles.Regular17, { color: district == null ? '#5d628e' : '#fff' }]}
                        onValueChange={(valueSelected) => {
                            setDistrict(valueSelected)
                            setValue({
                                name: value.name,
                                phone: value.phone,
                                postcode: value.postcode,
                                province: value.province,
                                district: valueSelected != null ? true : null,
                                subDistrict: value.subDistrict,
                                address: value.address
                            })
                            modalizeRefDistrict.current?.close()
                        }}>
                        {
                            districtArray.map((item) => (
                                <Picker.Item label={item.label} value={item.value} />
                            ))
                        }

                    </Picker>
                </View>
            </Modalize>
            <Modalize
                ref={modalizeRefSubDistrict}
                modalStyle={{ backgroundColor: '#F8F8F8', borderTopColor: '#E5E5E5', borderTopWidth: 0, borderTopLeftRadius: 42, borderTopRightRadius: 42 }}

                closeOnOverlayTap={true} snapPoint={hp(300)}
                withOverlay={false} modalHeight={hp(300)}
                withHandle={false}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
            >
                <View style={{ height: hp(300), backgroundColor: '#d7d6dc' }}>
                    <Picker
                        itemStyle={[fontStyles.Regular17]}
                        selectedValue={subdistrict}
                        style={[fontStyles.Regular17, { color: subdistrict == null ? '#5d628e' : '#fff' }]}
                        onValueChange={(valueSelected) => {
                            setSubdistrict(valueSelected)
                            setValue({
                                name: value.name,
                                phone: value.phone,
                                postcode: value.postcode,
                                province: value.province,
                                district: value.district,
                                subDistrict: valueSelected != null ? true : null,
                                address: value.address
                            })
                            modalizeRefSubDistrict.current?.close()
                        }}>
                        {
                            subdistrictArray.map((item) => (
                                <Picker.Item label={item.label} value={item.value} />
                            ))
                        }

                    </Picker>
                </View>
            </Modalize>
        </SafeAreaView>
    )
}
const pageStyle = StyleSheet.create({
    label: { color: '#989898', fontWeight: 'normal' },
    containerInput: { borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: wp(335),
        padding: hp(20),

        backgroundColor: "white",
        borderRadius: 8,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
const pickerSelectStyles = StyleSheet.create({
    // inputIOS: {
    //   fontSize: normalize(17),
    //   paddingVertical: 9,
    //   paddingHorizontal: 10,
    //   paddingLeft: 20, marginTop: 15,
    //   borderRadius: 6,
    //   color: '#fff',
    //   backgroundColor:'#24284b',

    // },
    // inputAndroid: {
    //     fontSize: normalize(17),
    //     paddingVertical: 9,
    //     paddingHorizontal: 10,
    //     paddingLeft: 20, marginTop: 15,
    //     borderRadius: 6,
    //     color: '#fff',
    //     backgroundColor:'#24284b',
    // },
    inputIOS: {
        fontSize: normalize(17),
        fontSize: normalize(17),
        fontFamily: 'Kanit-Regular',
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingLeft: 20,

        color: '#fff',
        backgroundColor: '#24284b',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: normalize(17),
        fontSize: normalize(17),
        fontFamily: 'Kanit-Regular',
        paddingHorizontal: 10,
        paddingVertical: 9,
        paddingLeft: 20,

        borderRadius: 8,
        color: '#fff',
        backgroundColor: '#24284b',
        paddingRight: 30, // to ensure the text is never behind the icon
    },

});
export default editAddress