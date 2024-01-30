
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_LOGIN = 'SET_LOGIN'
export const LOGOUT = 'LOGOUT';
import { authenticateJWT,URLregister } from '../../function/api'
import * as Keychain from 'react-native-keychain';

export const authenticate = (username, password, token) => {
    return {
        type: AUTHENTICATE,
        username: username,
        password: password,
        token: token,
    }

}

export const login = (username, password) => {
    return async (dispatch) => {
        await fetch(authenticateJWT(), {
            method: 'POST', // or ‘PUT’
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(async (res) => {
            const resData = await res.json();
            console.log(res.status)
            if (res.status === 200) {
                await Keychain.setGenericPassword(username,  resData.token, [{ service: resData.token }])
                    .then((val) => {
                        dispatch(authenticate(username, password, val.service))
                    })
                    .catch((e) => console.log(e.message))
            }else if(res.status === 400) {
                throw new Error('ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง')
            } else {
                throw new Error(resData)
            }
        }).catch((err) => {
            throw new Error(err.message);
        })
    };
};

export const register = (name, email, phone, date, password, CFPassword) => {
    return async () => {
        console.log('test, register')
        await fetch(URLregister(), {
            method: 'POST', // or ‘PUT’
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                email: email,
                full_name: name,
                tel: phone,
                birth_date: date,
                password: password,
                password_confirmation: CFPassword
            })
        }).then(async (res) => {
            const resData = await res.json();
            if (res.status === 201) {
                console.log('pass', resData, res.status)
            } else {
                throw new Error(resData)
            }
        }).catch((err) => {
            throw new Error(`${err.message}tes`);
        })
    }
}

export const setDidTryAL = () => {
    return { type: SET_LOGIN };
};

export const logout = () => {
    return async (dispatch) => {
        await Keychain.resetGenericPassword();
        dispatch({ type: LOGOUT })
    }


}

