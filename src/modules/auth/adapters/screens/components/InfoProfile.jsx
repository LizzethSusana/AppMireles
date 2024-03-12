import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import UsuarioAvatar from '../../../../../../assets/infoProfile.png'
import * as ImagePicker from "expo-image-picker"
import * as Medialibrary from "expo-media-library"
import { updateProfile } from 'firebase/auth'
import { Avatar } from '@rneui/base';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, auth } from '../../../../../config/util/firebaseConnection';
import Loading from "../../../../../kernel/components/Loading";

export default function InfoProfile(props) {
    const {infoUser:{photoURL,displayName,email,uid}} = props;
    const [isVisible, setVisible] = useState(false);


    const uploadImage = async (uri) => {
        try{
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `avatar/${uid}`);
            return uploadBytes(storageRef, blob);
        }catch(error){
            console.log(error);
        }
      };
    
      const uploadPhotoUrl = async () => {
        getDownloadURL(ref(storage, `avatar/${uid}`)).then((url) => {
          updateProfile(auth.currentUser, { photoURL: url })
            .catch((error) => {
              console.log(error);
              alert("Error al actualizar la foto de perfil");
            })
            .finally(() => {
                setVisible(false);
            });
        });
      };
    
      const changeAvatar = async () => {
        const resultPermission = await Medialibrary.requestPermissionsAsync();
        if (resultPermission !== "denied") {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowEditing: true,
                aspect: [4, 3],
                quality: 1
            })
            if(result){
                setVisible(true);
                try{
                    await uploadImage(result.assets[0].uri);
                    await uploadPhotoUrl();
                    alert("Sí se cambió la foto");
                }catch(error){
                    alert("Error al subir la imagen");
                }finally{
                    setVisible(false);
                }
            }
        } else {
            alert("Es necesario aceptar los permisos de la galeria");
        }
      }
    return (
        <View style={styles.row}>
            <Avatar
                size={64}
                rounded
                 source={photoURL ? {uri:photoURL} : UsuarioAvatar}
                title="Bj"
                containerStyle={{ backgroundColor: 'grey' }}
            >
                <Avatar.Accessory size={23} onPress={changeAvatar} />
            </Avatar>
            <View style={{ flexDirection: 'column', marginLeft: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{displayName || 'Anonimo'}</Text>
                <Text style={{ fontSize: 12 }}>{email || "no hay correo electronico"}</Text>
            </View>
            <Loading visible={isVisible} title={"cambiando foto de perfil"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 16
      },
})