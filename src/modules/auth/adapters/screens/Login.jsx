import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Image, Icon } from '@rneui/base';
import Logo from '../../../../../assets/comida.png';
import { isEmpty } from 'lodash';
import Loading from "../../../../kernel/components/Loading";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//primer hooks - useState


export default function Login(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showMessage, setShowMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const auth = getAuth();

    const login = async () => {
        if (!isEmpty(email) && !isEmpty(password)) {
            //proceso de inicio de sesión
            setShowMessage('');
            setVisible(true);
            try {
                const response = await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate("UserLogged");
            } catch (error) {
                console.log('Error: ', error);
                setShowMessage("Usuario o contraseña incorrectos")
            } finally {
                setVisible(false);
            }
        } else {
            setShowMessage('Campo obligatorio')
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain"
            />
            <Input
                placeholder="ejemplo@ejem.com"
                label="correo electronico *"
                keyboardType="email-address"
                onChange={({ nativeEvent: { text } }) => setEmail(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                errorMessage={showMessage}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="email-outline"
                        color='tomato'
                    />
                }
            />
            <Input
                placeholder="******"
                label="Contraseña *"
                onChange={({ nativeEvent: { text } }) => setPassword(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        color='tomato'
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                errorMessage={showMessage}
            />
            <Button
                title='Iniciar Sesión'
                onPress={login}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: 'black' }}
            />
            <Loading
                visible={visible}
                title='Iniciando sesión'
            />
            <Button
                title="Registrate"
                type="clear"
                onPress={() => navigation.navigate('CreateAccount')}
            />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: '#FFFFss'
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