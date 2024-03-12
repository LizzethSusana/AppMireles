import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@rneui/base'
import { getAuth } from "firebase/auth";
import InfoProfile from './components/InfoProfile';

export default function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const profile = auth.currentUser;
    if (profile !== null) {
      setUser(profile);
    }
  }, []);

  return (
    <View style={styles.container}>
      {
        user && (
          <InfoProfile
            infoUser={user}
          />
        )
      }
      <Button
        title='Cerrar Sesion'
        containerStyle={styles.container}
        buttonStyle={styles.btnStyle}
        titleStyle={{ color: 'black' }}
        onPress={() => { auth.signOut() }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  btnContainer: {
    width: '80%',
    borderRadius: 16
  },
  btnStyle: {
    backgroundColor: '#fcd562'

  },
  row: {
    flexDirection: 'row',
    padding: 16
  }
})