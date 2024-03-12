import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image, Input, Icon, Button } from "@rneui/base";
//import LogoCreateAccount from '../../../../../assets/logoCrearCuenta.png';
import LogoCreateAccount from '../../../../../assets/s1.jpeg';
import { isEmpty } from 'lodash';
import Loading from "../../../../kernel/components/Loading";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function CreateAccount(props) {
    const {navigation} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showMessage, setShowMessage] = useState({email:'',password:'',conPassword:''});
    const [visible, setVisible] = useState(false);


    const auth = getAuth();
/**
 *     const createAccount = async () => {
        if (!isEmpty(email) && !isEmpty(password) && !isEmpty(conPassword)) {
            if (!(password !== conPassword) && !(password.length<6)) {
                setVisible(true);
                try {
                    const response = await createUserWithEmailAndPassword(auth, email, password)
                    console.log(response.user);
                    navigation.navigate('Login');
                } catch (error) {
                    console.log(error);
                }finally{
                    setVisible(false)
                }
            } else {
                setShowMessage("las contraseñas no son iguales/menos de 6 caracteres");
            }
        } else {
            setShowMessage("Campo obligatorio");
        }
    }
 */
    const createAccount = async () => {
        if (!isEmpty(email) && !isEmpty(password) && !isEmpty(conPassword)) {
            if (!(password !== conPassword) && !(password.length<6)) {
                setVisible(true);
                try {
                    const response = await createUserWithEmailAndPassword(auth, email, password)
                    console.log(response.user);
                    navigation.navigate('Login');
                } catch (error) {
                    console.log(error);
                }finally{
                    setVisible(false)
                }
            } else {
                setShowMessage({email:"",password:"menos de 6 caracteres",conPassword:"menos de 6 caracteres"});
            }
        } else {
            setShowMessage({email:"Campos obligatorio",password:"Campos obligatorio",conPassword:"Campos obligatorio"});
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={LogoCreateAccount}
                style={styles.logo}
                resizeMode="contain"
            />
            <Input
                placeholder="Correo@ejem.com"
                label="Ingresa un correo electronico"
                onChange={({ nativeEvent: { text } }) => setEmail(text)}
                keyboardType="email-address"
                labelStyle={styles.label}
                containerStyle={styles.input}
                errorMessage={showMessage.email}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="email-outline"
                        color='tomato'
                    />
                }
            />
            <Input
                placeholder="**********"
                label="Contraseña"
                onChange={({ nativeEvent: { text } }) => setPassword(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                errorMessage={showMessage.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        color='tomato'
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="**********"
                label="Confirmar contraseña"
                onChange={({ nativeEvent: { text } }) => setConPassword(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                errorMessage={showMessage.conPassword}
            />
            <Button
                title='Crear cuenta'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: 'black' }}
                onPress={createAccount}
                type="clear"
                
            />
            <Loading
                visible={visible}
                title='Creando cuenta'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFF",
        justifyContent: "center",
        alignItems: "center",
        padding: 24
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 8
    },
    input: {
        paddingHorizontal: 16,
        marginVertical: 8,
    },
    label: {
        color: 'tomato'
    },
    btnContainer: {
        width: '80%'
    },
    btnStyle: {
        backgroundColor: '#fcd562',
    }
});
