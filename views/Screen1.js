import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { inputtextwallpaper } from '../atoms/wallpapertextinput';
import NavBar from './NavBar';

const Screen1 = ({ navigation }) => {
  const access_key = "aBSuGb6lo842uciA0mUe3F77nlKLVjQTbzYkVig1orA";
  const [searchvalue, setSearchValue] = useRecoilState(inputtextwallpaper);
  const [imagecollection, setImageCollection] = useState([]);

  useEffect(() => {
    const getImageCollection = async () => {
      let query = searchvalue || 'all';  // Set default to 'all' if searchvalue is empty

      let allData = [];

      // Fetch data from the first page
      let data1 = await fetch(`https://api.unsplash.com/search/collections?page=1&per_page=30&query=${query}&client_id=${access_key}`);
      let jsondata1 = await data1.json();
      allData = [...jsondata1.results];

      // Fetch data from the second page
      let data2 = await fetch(`https://api.unsplash.com/search/collections?page=2&per_page=30&query=${query}&client_id=${access_key}`);
      let jsondata2 = await data2.json();
      allData = [...allData, ...jsondata2.results];

      // Combine both pages' data and set it to state
      setImageCollection({ results: allData });
    };

    getImageCollection();
  }, [searchvalue]);

  const ShowWallpaper = (item) => {
    navigation.navigate('S2', { clickedimage: `${JSON.stringify(item)}` });
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <Text style={{ alignItems: "center", fontSize: 15 }}>
        Showing results for {searchvalue || 'all'}
      </Text>

      <FlatList
        numColumns={2}
        data={imagecollection.results}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => ShowWallpaper(item)}>
              <View style={styles.imagecontainer}>
                <Image source={{ uri: item.cover_photo.urls.regular }} style={styles.image} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    alignItems: 'center',
  },
  imagecontainer: {
    width: 180,
    height: 180,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
});

export default Screen1;
