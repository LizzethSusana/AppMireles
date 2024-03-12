import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import FlatListRestaurants from './components/FlatListRestaurants';
import { collection,getFirestore,getDocs } from 'firebase/firestore';

export default function Home() {
  const [restaurants, setRestaurants] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    ( async()=>{
      const arrayRestaurants = [];
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      querySnapshot.forEach((doc) => {
       // console.log(`${doc.id} => ${doc.data()['title']}`);
       arrayRestaurants.push({
        id: doc.id,
        title: doc.data()["title"],
        description: doc.data()["description"],
        rating: doc.data()["rating"],
        image: doc.data()["image"],
       });
      });
      setRestaurants(arrayRestaurants);
    })()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) =>
          <FlatListRestaurants
            image={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating}
          />
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 16,

  },
});
