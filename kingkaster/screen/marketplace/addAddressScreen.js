import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Platform } from 'react-native'
import { Input, Switch, Button, Divider } from 'react-native-elements';
import { Header } from '../../components';
import normalize from '../../function/normalize';
import { hp, wp } from '../../function/screen';
import fontStyles from '../../styles/fontStyles';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../../styles/colors';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const addAddress = ({ navigation }) => {
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
        name: null,
        phone: null,
        postcode: null,
        province: null,
        district: null,
        subDistrict: null,
        address: null
    })
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [postcode, setPostcode] = useState('')
    const [province, setProvince] = useState(null)
    const [district, setDistrict] = useState(null)
    const [subdistrict, setSubdistrict] = useState(null)
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [gender, setgender] = useState('')
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
                            />
                        </View>

                        <View style={[{ flex: 1, paddingLeft: 7.5 }]}>
                            <Text style={[fontStyles.Medium18, pageStyle.label, { color: '#FFF', }]}>
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
                                            }}>
                                            {
                                                districtArray.map((item) => (
                                                    <Picker.Item label={item.label} value={item.value} />
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
                                                subdistrictArray.map((item) => (
                                                    <Picker.Item label={item.label} value={item.value} />
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
                    />

                    <View style={[styles.flexRow, { marginTop: hp(50), marginBottom: hp(15) }]}>

                        <View style={[{ flex: 1 }]}>
                            <Button
                                disabled={value.name != null && value.phone != null && value.postcode != null && value.province != null && value.district != null && value.subDistrict != null && value.address != null ? false : true}
                                title='บันทึก'
                                disabledTitleStyle={[{ color: '#FFF' }]}
                                disabledStyle={[{ backgroundColor: '#5d628e' }]}
                                onPress={() => navigation.navigate('completeMarket', { title: 'เพิ่มที่อยู่', type: 'add', from: 'market' })}
                                buttonStyle={[{ backgroundColor: colors.blue, borderRadius: 8 }]}
                                titleStyle={[fontStyles.Regular16]}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>
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
    containerInput: { borderWidth: 1, borderColor: '#2d325a', backgroundColor: '#24284b', borderRadius: 6, paddingLeft: 20, marginTop: 10, }
})

export default addAddress