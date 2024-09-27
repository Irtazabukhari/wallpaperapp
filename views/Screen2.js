import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { inputtextwallpaper } from '../atoms/wallpapertextinput';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const Screen2 = ({ route }) => {
  const { clickedimage } = route.params;
  const [searchvalue, setSearchValue] = useRecoilState(inputtextwallpaper);
  const [imagedata, setImageData] = useState('');

  useEffect(() => {
    const imageUrl = JSON.parse(clickedimage)?.cover_photo.urls.regular;
    if (imageUrl) {
      setImageData(imageUrl);
    }
  }, [clickedimage]);

  const showNextImage = async () => {
    if (!searchvalue) return;
  
    try {
      // Replace YOUR_ACCESS_KEY with your actual Unsplash API key
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${searchvalue}&client_id=aBSuGb6lo842uciA0mUe3F77nlKLVjQTbzYkVig1orA`);
      const data = await response.json();
      
      if (data && data.urls && data.urls.regular) {
        setImageData(data.urls.regular); // Set the new image URL
        console.log('Next image URL:', data.urls.regular);
      } else {
        Alert.alert('Error', 'Could not load the next image. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching the next image:', error);
      Alert.alert('Error', 'Could not load the next image. Please try again.');
    }
  };
  

  const downloadImage = async () => {
    if (!imagedata) return;

    // Request permissions for media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to enable permissions to save images.');
      return;
    }

    try {
      // Download the image to a temporary location
      const fileUri = FileSystem.documentDirectory + 'downloaded_image.jpg';
      const response = await FileSystem.downloadAsync(imagedata, fileUri);

      // Check if the response is valid
      if (response.uri) {
        // Save the image to the gallery
        await MediaLibrary.createAssetAsync(response.uri);
        Alert.alert('Download Success', 'Image saved to gallery!');
        console.log('Image saved to gallery:', response.uri);
      } else {
        throw new Error('Invalid response from download');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Download Failed', error.message || 'Could not download the image.');
    }
  };

  return (
    <View style={styles.imagecontainer}>
      {imagedata && <Image source={{ uri: imagedata }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.downloadbutton} onPress={downloadImage}>
          <Text style={styles.downloadtext}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={showNextImage}>
          <Text style={styles.nexttext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons side by side
    position: 'absolute',
    bottom: 10,
    width: '100%', // Take the full width of the screen
    justifyContent: 'space-between', // Spread buttons equally
    paddingHorizontal: 20, // Add padding to left and right sides
  },
  downloadbutton: {
    flex: 1, // Both buttons will take equal space
    backgroundColor: '#333333',
    paddingVertical: 10,
    marginHorizontal: 10, // Space between buttons
    borderRadius: 10,
    elevation: 10,
  },
  downloadtext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:"#333333"
  },
  nextbutton: {
    flex: 1, // Both buttons will take equal space
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    marginHorizontal: 10, // Space between buttons
    borderRadius: 10,
    elevation: 10,
  },
  nexttext: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
     backgroundColor:"#F5F5F5"
  },
});

export default Screen2;
