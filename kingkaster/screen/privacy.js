import React from 'react';
import { SafeAreaView, View, Text } from 'react-native'
import { ScrollView, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import { Header } from '../components';
import { hp } from '../function/screen';
import colors from '../styles/colors';
import fontStyles from '../styles/fontStyles';
import styles from '../styles/styles';

const privacy = ({ navigation }) => {

    const contentWidth = useWindowDimensions().width;
    return (
        <SafeAreaView style={[styles.screen]}>
            <Header
                title='ข้อกำหนดและนโยบายเงื่อนไข'
                onPress={() => navigation.pop()}
            />
            <View style={[styles.container, { flex: 1 }]}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Text style={[fontStyles.Regular17, { color: colors.white }]}>
                        ข้อกำหนดและเงื่อนไขการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน หรือข้อตกลงการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน เป็นสัญญาประเภทหนึ่งที่เจ้าของเว็บไซต์หรือแอปพลิเคชันกำหนดขึ้นเพื่อกำหนดและควบคุมเงื่อนไขลักษณะการใช้เว็บไซต์หรือแอปพลิเคชันของตนจากผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน เพื่อจุดประสงค์ต่างๆ เช่น

                    </Text>
                    <Text style={[fontStyles.Regular17, { color: colors.white,marginTop:hp(20) }]}>
                        ข้อกำหนดและเงื่อนไขการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน หรือข้อตกลงการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน เป็นสัญญาประเภทหนึ่งที่เจ้าของเว็บไซต์หรือแอปพลิเคชันกำหนดขึ้นเพื่อกำหนดและควบคุมเงื่อนไขลักษณะการใช้เว็บไซต์หรือแอปพลิเคชันของตนจากผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน เพื่อจุดประสงค์ต่างๆ เช่น

                        เพื่อให้เกิดประสิทธิภาพสูงสุดในการใช้งาน เช่น การแจ้งให้ผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน ทราบถึงจุดเด่น คุณลักษณะจำเพาะของเว็บไซต์หรือแอปพลิเคชัน หรือความต้องการขั้นต่ำของระบบ (Minimum System Requirements) ในการใช้เว็บไซต์หรือแอปพลิเคชันนั้นๆ
                        เพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับเว็บไซต์หรือแอปพลิเคชันจากการใช้งานไม่ถูกต้องหรือไม่ถูกวิธี เช่น การห้ามโพสข้อความรูปภาพในเว็บไซต์ที่มีขนาดใหญ่ของสมาชิกจนทำให้เว็บไซต์หรือแอปพลิเคชันทำงานช้ากว่าปกติและทำให้ระบบมีการใช้ทรัพยากรสูง (Server Load)
                        เพื่อป้องกันความเสี่ยงจากความรับผิดทางกฎหมายของผู้เป็นเจ้าของเว็บไซต์หรือแอปพลิเคชัน หากมีการใช้เว็บไซต์หรือแอปพลิเคชันดังกล่าวที่ผิดกฎหมายหรือละเมิดสิทธิของผู้อื่น โดยผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชันนั้นๆ ซึ่งเป็นที่สำคัญที่สุด เช่น การสงวนสิทธิตามกฎหมายของผลงาน ข้อมูล และการออกแบบที่เจ้าของเว็บไซต์หรือแอปพลิเคชันเผยแพร่บนเว็บไซต์หรือแอปพลิเคชัน การห้ามโพสข้อความในเว็บไซต์หรือแอปพลิเคชันที่เป็นการละเมิดลิขสิทธิ์ของผู้อื่น (Copyright Infringement) การห้ามใช้เว็บไซต์หรือแอปพลิเคชันเป็นช่องทางหรือเครื่องมือในการทำผิดกฎหมาย และ ข้อกำหนดและเงื่อนไขการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน หรือข้อตกลงการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน เป็นสัญญาประเภทหนึ่งที่เจ้าของเว็บไซต์หรือแอปพลิเคชันกำหนดขึ้นเพื่อกำหนดและควบคุมเงื่อนไขลักษณะการใช้เว็บไซต์หรือแอปพลิเคชันของตนจากผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน เพื่อจุดประสงค์ต่างๆ เช่น
                    </Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default privacy