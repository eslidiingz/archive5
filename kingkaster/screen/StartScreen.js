import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as Keychain from 'react-native-keychain';
import colors from '../styles/colors';
const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            setTimeout(async() => {
                try {
                    const credentials = await Keychain.getGenericPassword();
                    if (credentials) {
                        console.log(credentials.username, credentials.password)
                        await dispatch(authActions.authenticate(credentials.username, credentials.password));
                    } else {
                        await dispatch(authActions.setDidTryAL());
                    }
                } catch (error) {
                    console.log("Keychain couldn't be accessed!", error.message);
                }
            }, 10000);
           
        }
        tryLogin()
    }, [dispatch]);
    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={colors.blue} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
