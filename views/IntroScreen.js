import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo.png'; // Replace with your logo's path

const IntroScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('S1'); // Navigate to Screen1 after 3 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6f61', // Change this to any vibrant color you like
  },
  logo: {
    width: 300, // Adjust based on your logo size
    height: 300, // Adjust based on your logo size
    resizeMode: 'contain', // Adjust to fit your logo
  },
});

export default IntroScreen;
